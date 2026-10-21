"use client";

import { useState } from "react";
import { addDays, toDateInput, todayUtc } from "@/lib/calculators";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

/** The "first day of the last period" date field shared by the calculators. */
export const LastPeriodInput = ({ label, value, onChange }: Props) => {
  // Limits are set when the field is focused, not during render: the page is built
  // ahead of time, so a date computed then would be stale. max also stops 6-digit years.
  const [limits, setLimits] = useState<{ min: string; max: string }>();
  const setLimitsFromToday = () => {
    const today = todayUtc();
    setLimits({ min: toDateInput(addDays(today, -365)), max: toDateInput(today) });
  };

  return (
    <label className="flex flex-col gap-2 font-medium">
      {label}
      {/* Fixed width: the browser opens the calendar at the field's start edge,
          so a narrow field keeps it under the calendar icon. */}
      <input
        id="last-period"
        name="lastPeriod"
        type="date"
        required
        min={limits?.min}
        max={limits?.max}
        value={value}
        onFocus={setLimitsFromToday}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-line bg-cream px-4 py-3 text-ink sm:w-60"
      />
    </label>
  );
};
