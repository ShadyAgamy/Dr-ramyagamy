// Date math for the pregnancy and ovulation calculators. Standard textbook rules,
// shown to visitors as estimates only:
// - Due date (Naegele's rule): first day of the last period + 280 days (40 weeks).
// - Ovulation: about 14 days before the next period.
// - Fertile window: the 5 days before ovulation and the day after it.
// Dates are handled in UTC so the user's time zone never shifts a day.

const DAY = 24 * 60 * 60 * 1000;

/** "2026-10-01" (from <input type="date">) → a UTC date at midnight. */
export const parseDateInput = (value: string): Date | undefined => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return undefined;
  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
};

/** Today at UTC midnight, so it compares cleanly with parsed dates. */
export const todayUtc = () => {
  const now = new Date();
  return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
};

/** The same date as <input type="date"> expects, e.g. for the max attribute. */
export const toDateInput = (date: Date) => date.toISOString().slice(0, 10);

export const addDays = (date: Date, days: number) => new Date(date.getTime() + days * DAY);

const daysBetween = (from: Date, to: Date) => Math.round((to.getTime() - from.getTime()) / DAY);

export type DueDateResult = {
  dueDate: Date;
  /** How far along today: full weeks and extra days. */
  weeks: number;
  days: number;
  trimester: 1 | 2 | 3;
};

/** From the first day of the last period. Undefined if the date is in the future or too far back. */
export const calculateDueDate = (lastPeriod: Date, today = todayUtc()): DueDateResult | undefined => {
  const daysPregnant = daysBetween(lastPeriod, today);
  // Beyond 42 weeks the date is almost certainly a typo.
  if (daysPregnant < 0 || daysPregnant > 42 * 7) return undefined;

  const weeks = Math.floor(daysPregnant / 7);
  return {
    dueDate: addDays(lastPeriod, 280),
    weeks,
    days: daysPregnant % 7,
    trimester: weeks < 13 ? 1 : weeks < 27 ? 2 : 3,
  };
};

export type OvulationCycle = {
  ovulation: Date;
  fertileStart: Date;
  fertileEnd: Date;
  nextPeriod: Date;
};

/** The usual range for regular cycles. Outside it the estimate is not meaningful. */
export const MIN_CYCLE = 21;
export const MAX_CYCLE = 35;

/** The next `count` cycles, starting from the first day of the last period. */
export const calculateOvulation = (lastPeriod: Date, cycleLength: number, count = 3): OvulationCycle[] =>
  Array.from({ length: count }, (_, index) => {
    const periodStart = addDays(lastPeriod, index * cycleLength);
    const nextPeriod = addDays(periodStart, cycleLength);
    const ovulation = addDays(nextPeriod, -14);
    return {
      ovulation,
      fertileStart: addDays(ovulation, -5),
      fertileEnd: addDays(ovulation, 1),
      nextPeriod,
    };
  });
