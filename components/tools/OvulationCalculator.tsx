"use client";

import { type FormEvent, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import {
  calculateOvulation,
  MAX_CYCLE,
  MIN_CYCLE,
  type OvulationCycle,
  parseDateInput,
  todayUtc,
} from "@/lib/calculators";
import { LastPeriodInput } from "@/components/tools/LastPeriodInput";

/** Ovulation and fertile days for the next 3 cycles. Runs in the browser; nothing is sent anywhere. */
export const OvulationCalculator = () => {
  const t = useTranslations("Tools");
  const format = useFormatter();
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("28");
  const [cycles, setCycles] = useState<OvulationCycle[] | null>(null);
  const [error, setError] = useState(false);

  const formatDate = (date: Date) =>
    format.dateTime(date, {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: "UTC",
    });

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const date = parseDateInput(lastPeriod);
    const length = Number(cycleLength);
    const valid =
      date && date <= todayUtc() && length >= MIN_CYCLE && length <= MAX_CYCLE;
    setCycles(valid ? calculateOvulation(date, length) : null);
    setError(!valid);
  };

  return (
    <div className="flex flex-col gap-6 rounded-card bg-surface p-6 shadow-soft sm:p-8">
      <form
        onSubmit={onSubmit}
        className="grid gap-4 sm:grid-cols-[auto_12rem_auto] sm:justify-start sm:items-end"
      >
        <LastPeriodInput
          label={t("lastPeriod")}
          value={lastPeriod}
          onChange={setLastPeriod}
        />
        <label className="flex flex-col gap-2 font-medium">
          {t("ovulation.cycleLength")}
          <input
            id="cycle-length"
            name="cycleLength"
            type="number"
            required
            min={MIN_CYCLE}
            max={MAX_CYCLE}
            value={cycleLength}
            onChange={(event) => setCycleLength(event.target.value)}
            className="rounded-xl border border-line bg-cream px-4 py-3 text-ink"
          />
        </label>
        <button
          type="submit"
          className="rounded-button bg-brand px-6 py-3 font-medium text-ink shadow-soft hover:opacity-90"
        >
          {t("calculate")}
        </button>
        <p className="text-sm text-ink-muted sm:col-span-3">
          {t("ovulation.cycleHint")}
        </p>
      </form>

      <div aria-live="polite">
        {error && <p className="text-brand-strong">{t("invalidDate")}</p>}
        {cycles && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">{t("ovulation.resultTitle")}</h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {cycles.map((cycle, index) => (
                <li
                  key={cycle.ovulation.toISOString()}
                  className="flex flex-col gap-3 rounded-card bg-peach p-5"
                >
                  <p className="font-bold">
                    {t("ovulation.cycle", { number: index + 1 })}
                  </p>
                  <div>
                    <p className="text-sm text-ink-muted">
                      {t("ovulation.ovulationDay")}
                    </p>
                    <p className="text-lg font-bold text-brand-strong">
                      {formatDate(cycle.ovulation)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-ink-muted">
                      {t("ovulation.fertileWindow")}
                    </p>
                    <p>
                      {formatDate(cycle.fertileStart)} –{" "}
                      {formatDate(cycle.fertileEnd)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-ink-muted">
                      {t("ovulation.nextPeriod")}
                    </p>
                    <p>{formatDate(cycle.nextPeriod)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
