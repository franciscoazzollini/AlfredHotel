"use client";

import { useEffect, useMemo, useState } from "react";
import { AlarmClock, Ban, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { weekdayKeys } from "@/lib/i18n/config";
import { useI18n } from "@/lib/i18n/context";
import {
  getCleaningForDate,
  loadGuestCleaningExceptions,
  mergeExceptions,
  saveGuestCleaningExceptions,
} from "@/lib/hotel/cleaning-schedule";
import type { CleaningException, CleaningSchedule } from "@/lib/hotel/types";

type CleaningSchedulePanelProps = {
  room: string;
  schedule: CleaningSchedule;
};

export function CleaningSchedulePanel({ room, schedule }: CleaningSchedulePanelProps) {
  const { t } = useI18n();
  const [guestExceptions, setGuestExceptions] = useState<CleaningException[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [type, setType] = useState<"skip" | "extra">("skip");
  const [note, setNote] = useState("");

  const merged = useMemo(
    () => ({
      ...schedule,
      exceptions: mergeExceptions(schedule.exceptions, guestExceptions),
    }),
    [schedule, guestExceptions],
  );

  useEffect(() => {
    setGuestExceptions(loadGuestCleaningExceptions(room));
  }, [room]);

  const today = new Date();
  const todayInfo = getCleaningForDate(merged, today);

  function addException() {
    if (!date) return;
    const next: CleaningException = {
      id: `${date}-${type}`,
      date,
      type,
      time,
      note: note || undefined,
    };
    const updated = mergeExceptions(guestExceptions, [next]);
    setGuestExceptions(updated.filter((item) => !schedule.exceptions.some((b) => b.date === item.date && b.id === item.id)));
    saveGuestCleaningExceptions(
      room,
      updated.filter((item) => !schedule.exceptions.some((b) => b.date === item.date)),
    );
    setDate("");
    setNote("");
  }

  return (
    <div className="space-y-4">
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <AlarmClock className="size-4" />
            {t.cleaning.title}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{t.cleaning.subtitle}</p>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="font-medium">{t.cleaning.today}</p>
          <p>
            {todayInfo.status === "skip" && t.cleaning.skip}
            {todayInfo.status === "extra" && `${t.cleaning.extra} · ${todayInfo.time}`}
            {todayInfo.status === "regular" && `${t.cleaning.regular} · ${todayInfo.time}`}
            {todayInfo.status === "off" && t.cleaning.noService}
          </p>
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">{t.cleaning.weekly}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {weekdayKeys.map((day) => {
            const rule = schedule.weekly[day];
            return (
              <div
                key={day}
                className="flex items-center justify-between rounded-xl border border-border/60 px-3 py-2 text-sm"
              >
                <span>{t.weekdays[day]}</span>
                <span className={rule.enabled ? "font-medium" : "text-muted-foreground"}>
                  {rule.enabled ? rule.time : t.cleaning.off}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">{t.cleaning.exceptions}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {merged.exceptions.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t.cleaning.noService}</p>
          ) : (
            merged.exceptions.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-2 rounded-xl border border-border/60 p-3 text-sm"
              >
                {item.type === "skip" ? (
                  <Ban className="mt-0.5 size-4 text-destructive" />
                ) : (
                  <Plus className="icon-brand mt-0.5 size-4" />
                )}
                <div>
                  <p className="font-medium">
                    {item.date} · {item.type === "skip" ? t.cleaning.skip : t.cleaning.extra}
                  </p>
                  {item.time ? <p>{item.time}</p> : null}
                  {item.note ? <p className="text-muted-foreground">{item.note}</p> : null}
                </div>
              </div>
            ))
          )}

          <div className="space-y-2 rounded-xl border border-dashed border-border p-3">
            <p className="text-sm font-medium">{t.cleaning.addException}</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "skip" | "extra")}
              className="h-9 w-full rounded-lg border border-border/70 bg-background px-2 text-sm"
            >
              <option value="skip">{t.cleaning.skip}</option>
              <option value="extra">{t.cleaning.extra}</option>
            </select>
            <Input
              placeholder={t.cleaning.note}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button className="w-full" onClick={addException}>
              {t.common.add}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
