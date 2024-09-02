import { useCallback, useEffect, useState } from "react";

import { RingProgress } from "@/features/ring-progress";
import { Group, GroupProps } from "@mantine/core";

const defaultRingProgressProps = {
  size: 160,
  thickness: 14,
  roundCaps: true,
};

export type RingCountdownProps = {
  targetDate: Date;
} & GroupProps;

export function RingCountdown({ targetDate, ...props }: RingCountdownProps) {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date();
    const difference = new Date(targetDate).getTime() - now.getTime();

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, calculateTimeLeft]);

  const totalDays = Math.max(7, timeLeft.days || 0);
  const dayPercentage = ((timeLeft.days || 0) / totalDays) * 100;
  const hourPercentage = ((timeLeft.hours || 0) / 24) * 100;
  const minutePercentage = ((timeLeft.minutes || 0) / 60) * 100;
  const secondPercentage = ((timeLeft.seconds || 0) / 60) * 100;

  return (
    <Group justify="center" {...props}>
      <RingProgress
        value={dayPercentage}
        color="blue"
        label={`${timeLeft.days} дн.`}
        {...defaultRingProgressProps}
      />

      <RingProgress
        value={hourPercentage}
        color="orange"
        label={`${timeLeft.hours} ч.`}
        {...defaultRingProgressProps}
      />

      <RingProgress
        value={minutePercentage}
        color="yellow"
        label={`${timeLeft.minutes} мин.`}
        {...defaultRingProgressProps}
      />

      <RingProgress
        value={secondPercentage}
        color="cyan"
        label={`${timeLeft.seconds} сек.`}
        {...defaultRingProgressProps}
      />
    </Group>
  );
}
