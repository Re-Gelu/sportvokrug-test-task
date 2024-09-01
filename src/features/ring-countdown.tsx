import { useCallback, useEffect, useState } from "react";

import { Group, GroupProps, RingProgress, Text } from "@mantine/core";

export type RingCountdownProps = {
  targetDate: Date;
} & GroupProps;

const defaultRingProgress = {
  size: 160,
  thickness: 14,
  roundCaps: true,
};

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
  }, [targetDate]);

  const totalDays = Math.max(7, timeLeft.days || 0);
  const dayPercentage = ((timeLeft.days || 0) / totalDays) * 100;
  const hourPercentage = ((timeLeft.hours || 0) / 24) * 100;
  const minutePercentage = ((timeLeft.minutes || 0) / 60) * 100;
  const secondPercentage = ((timeLeft.seconds || 0) / 60) * 100;

  return (
    <Group justify="center" {...props}>
      <RingProgress
        label={
          <Text size="xs" ta="center">
            {timeLeft.days} дн.
          </Text>
        }
        key={`${timeLeft.days} дн.`}
        sections={[{ value: dayPercentage, color: "blue" }]}
        {...defaultRingProgress}
      />

      <RingProgress
        label={
          <Text size="xs" ta="center">
            {timeLeft.hours} ч.
          </Text>
        }
        key={`${timeLeft.hours} ч.`}
        sections={[{ value: hourPercentage, color: "orange" }]}
        {...defaultRingProgress}
      />

      <RingProgress
        label={
          <Text size="xs" ta="center">
            {timeLeft.minutes} мин.
          </Text>
        }
        key={`${timeLeft.minutes} мин.`}
        sections={[{ value: minutePercentage, color: "yellow" }]}
        {...defaultRingProgress}
      />

      <RingProgress
        label={
          <Text size="xs" ta="center">
            {timeLeft.seconds} сек.
          </Text>
        }
        key={`${timeLeft.seconds} сек.`}
        sections={[{ value: secondPercentage, color: "cyan" }]}
        {...defaultRingProgress}
      />
    </Group>
  );
}
