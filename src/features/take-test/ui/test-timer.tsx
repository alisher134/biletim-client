"use client";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";

import { formatDuration } from "@/shared/lib/format-duration";

type TestTimerProps = {
  startedAt: string;
  timeLimit: number;
  onExpire: () => void;
};

export function TestTimer({ startedAt, timeLimit, onExpire }: TestTimerProps) {
  const t = useTranslations("takeTest");
  const endsAt = new Date(startedAt).getTime() + timeLimit * 1000;
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.floor((endsAt - Date.now()) / 1000)),
  );

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire();
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [secondsLeft, onExpire]);

  return (
    <p className="text-sm font-medium text-muted-foreground">
      {t("timeLeft", { time: formatDuration(secondsLeft) })}
    </p>
  );
}
