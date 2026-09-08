"use client";

import { useEffect, useRef, useState } from "react";

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
  const onExpireRef = useRef(onExpire);
  const hasExpiredRef = useRef(false);
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.floor((endsAt - Date.now()) / 1000)),
  );

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    if (hasExpiredRef.current) return;

    if (secondsLeft <= 0) {
      hasExpiredRef.current = true;
      onExpireRef.current();
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [secondsLeft]);

  return (
    <p className="text-sm font-medium text-muted-foreground">
      {t("timeLeft", { time: formatDuration(secondsLeft) })}
    </p>
  );
}
