"use client";

import { type FormEvent, useState } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { calculateDueDate, type DueDateResult, parseDateInput } from "@/lib/calculators";

/** Due date from the first day of the last period. Runs in the browser; nothing is sent anywhere. */
export const DueDateCalculator = () => {
  const t = useTranslations("Tools");
  const format = useFormatter();
  const [lastPeriod, setLastPeriod] = useState("");
  const [result, setResult] = useState<DueDateResult | null>(null);
  const [error, setError] = useState(false);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const date = parseDateInput(lastPeriod);
    const calculated = date && calculateDueDate(date);
    setResult(calculated ?? null);
    setError(!calculated);
  };

  return (
    <div className="flex flex-col gap-6 rounded-card bg-surface p-6 shadow-soft sm:p-8">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col gap-2 font-medium">
          {t("lastPeriod")}
          <input
            type="date"
            required
            value={lastPeriod}
            onChange={(event) => setLastPeriod(event.target.value)}
            className="rounded-xl border border-line bg-cream px-4 py-3 text-ink"
          />
        </label>
        <button type="submit" className="rounded-button bg-brand-strong px-6 py-3 font-medium text-white shadow-soft hover:opacity-90">
          {t("calculate")}
        </button>
      </form>

      {/* aria-live: screen readers announce the result when it appears. */}
      <div aria-live="polite">
        {error && <p className="text-brand-strong">{t("invalidDate")}</p>}
        {result && (
          <div className="flex flex-col gap-2 rounded-card bg-peach p-6">
            <p className="text-ink-muted">{t("dueDate.resultTitle")}</p>
            <p className="text-2xl font-bold text-brand-strong sm:text-3xl">
              {format.dateTime(result.dueDate, { dateStyle: "full", timeZone: "UTC" })}
            </p>
            <p className="text-lg">{t("dueDate.age", { weeks: result.weeks, days: result.days })}</p>
            <p className="text-ink-muted">{t("dueDate.trimester", { trimester: String(result.trimester) })}</p>
          </div>
        )}
      </div>
    </div>
  );
};
