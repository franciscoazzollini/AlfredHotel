import type { CleaningException, CleaningSchedule, Weekday } from "./types";

export const WEEKDAYS: Weekday[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

export function defaultCleaningSchedule(): CleaningSchedule {
  return {
    timezone: "America/Argentina/Buenos_Aires",
    weekly: {
      mon: { enabled: true, time: "10:00" },
      tue: { enabled: true, time: "10:00" },
      wed: { enabled: true, time: "10:00" },
      thu: { enabled: true, time: "10:00" },
      fri: { enabled: true, time: "10:00" },
      sat: { enabled: false, time: "11:00" },
      sun: { enabled: false, time: "11:00" },
    },
    exceptions: [],
  };
}

function weekdayFromDate(date: Date): Weekday {
  const map: Weekday[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return map[date.getDay()];
}

function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function getCleaningForDate(schedule: CleaningSchedule, date: Date) {
  const key = dateKey(date);
  const exception = schedule.exceptions.find((item) => item.date === key);

  if (exception?.type === "skip") {
    return { status: "skip" as const, time: exception.time, note: exception.note };
  }

  const weekday = weekdayFromDate(date);
  const rule = schedule.weekly[weekday];

  if (exception?.type === "extra") {
    return {
      status: "extra" as const,
      time: exception.time ?? rule.time,
      note: exception.note,
    };
  }

  if (!rule.enabled) {
    return { status: "off" as const, time: rule.time };
  }

  return { status: "regular" as const, time: rule.time };
}

export function mergeExceptions(
  base: CleaningException[],
  guest: CleaningException[],
): CleaningException[] {
  const byDate = new Map<string, CleaningException>();
  for (const item of base) {
    byDate.set(item.date, item);
  }
  for (const item of guest) {
    byDate.set(item.date, item);
  }
  return [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
}

export function loadGuestCleaningExceptions(room: string): CleaningException[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(`alfred-cleaning-${room}`);
    return raw ? (JSON.parse(raw) as CleaningException[]) : [];
  } catch {
    return [];
  }
}

export function saveGuestCleaningExceptions(room: string, exceptions: CleaningException[]) {
  localStorage.setItem(`alfred-cleaning-${room}`, JSON.stringify(exceptions));
}
