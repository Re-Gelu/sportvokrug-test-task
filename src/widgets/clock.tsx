import { useEffect, useState } from "react";

import { padTo2Digits } from "@/features";
import configuration from "@/shared/configuration";
import {
  Divider,
  Paper,
  PaperProps,
  Stack,
  StackProps,
  Text,
} from "@mantine/core";

export function Clock(props: PaperProps) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000 * 60); // 1 min

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Paper
      shadow="md"
      py="md"
      px="xl"
      radius="lg"
      bg="var(--mantine-primary-color-light)"
      {...props}
    >
      <Text fz={96} ta="center">
        {padTo2Digits(date.getHours())}
        {":"}
        {padTo2Digits(date.getMinutes())}
      </Text>

      <Divider size="md" mb="md" />

      <Text fz={38} ta="center">
        {date.toLocaleDateString(configuration.LOCALE, {
          month: "long",
          day: "numeric",
        })}
      </Text>

      <Text fz={38} ta="center" mb="md">
        {date.toLocaleString(configuration.LOCALE, { weekday: "long" })}
      </Text>
    </Paper>
  );
}

export function SmallClock(props: StackProps) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000 * 60); // 1 min

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Stack gap="xs" {...props}>
      <Text fz={96} ta="center">
        {padTo2Digits(date.getHours())}
        {":"}
        {padTo2Digits(date.getMinutes())}
      </Text>

      <Divider size="md" mb="md" />

      <Text fz={22} ta="center">
        {date.toLocaleDateString(configuration.LOCALE, {
          month: "long",
          day: "numeric",
        })}
        {" · "}
        {date.toLocaleString(configuration.LOCALE, { weekday: "long" })}
      </Text>
    </Stack>
  );
}
