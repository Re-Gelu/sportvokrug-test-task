import { formatEventDate, RingCountdown } from "@/features";
import { VideostandEvent } from "@/shared/api";
import { Paper, Stack, Text, Title } from "@mantine/core";

import { SmallClock } from "./clock";
import { NextEventInfo } from "./next-event-info";

export type CountdownEventScreenProps = {
  event: VideostandEvent;
  nextEvent?: VideostandEvent | null;
};

export function CountdownEventScreen({
  event,
  nextEvent,
}: CountdownEventScreenProps) {
  return (
    <Stack h="100%" w="100%">
      <Paper h="25%" my="xl">
        <Stack h="100%" justify="center" align="center">
          <SmallClock />
        </Stack>
      </Paper>

      <Paper h="50%" bg="var(--mantine-primary-color-light)">
        <Stack h="100%" justify="center" align="center">
          <Text c="dimmed" ta="center">
            {formatEventDate(new Date(event.dt_start), new Date(event.dt_end))}
          </Text>

          <Title ta="center" lineClamp={2} maw="65%">
            {event.title}
          </Title>

          <RingCountdown targetDate={new Date(event.dt_start)} mt="xl" />
        </Stack>
      </Paper>

      <Paper h="25%" my="xl">
        {nextEvent && (
          <Stack h="100%" justify="center" align="center">
            <NextEventInfo event={nextEvent} maw="65%" />
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}
