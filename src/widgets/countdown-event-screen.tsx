import { formatEventDate } from "@/features";
import { VideostandEvent } from "@/shared/api";
import { Stack, Text, Title } from "@mantine/core";

import { EventScreenLayout } from "./event-screen-layout";
import { RingCountdown } from "./ring-countdown";

export type CountdownEventScreenProps = {
  event: VideostandEvent;
  nextEvent?: VideostandEvent | null;
};

export function CountdownEventScreen({
  event,
  nextEvent,
}: CountdownEventScreenProps) {
  return (
    <EventScreenLayout nextEvent={nextEvent}>
      <Stack h="100%" justify="center" align="center">
        <Text c="dimmed" fz="lg" ta="center">
          {formatEventDate(new Date(event.dt_start), new Date(event.dt_end))}
        </Text>

        <Title ta="center" lineClamp={2} maw="65%">
          {event.title}
        </Title>

        <RingCountdown targetDate={new Date(event.dt_start)} mt="xl" />
      </Stack>
    </EventScreenLayout>
  );
}
