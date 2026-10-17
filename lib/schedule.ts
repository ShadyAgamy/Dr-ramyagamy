import type { useFormatter } from "next-intl";
import type { ScheduleEntry } from "@/lib/content";

/** next-intl's formatter (from useFormatter or getFormatter). */
type Formatter = ReturnType<typeof useFormatter>;

/** "17:00" → "5:00 PM" / "5:00 م". UTC on both sides so the time does not shift. */
export const formatTime = (format: Formatter, time: string) =>
  format.dateTime(new Date(`1970-01-01T${time}:00Z`), { hour: "numeric", minute: "2-digit", timeZone: "UTC" });

/**
 * Groups days that share the same hours, for short summaries on cards:
 * Monday 15:00–19:00 + Wednesday 15:00–19:00 → one row with both days.
 */
export const groupSchedule = (schedule: ScheduleEntry[]) => {
  const groups: { days: ScheduleEntry["day"][]; opens: string; closes: string }[] = [];
  for (const entry of schedule) {
    const group = groups.find((item) => item.opens === entry.opens && item.closes === entry.closes);
    if (group) group.days.push(entry.day);
    else groups.push({ days: [entry.day], opens: entry.opens, closes: entry.closes });
  }
  return groups;
};
