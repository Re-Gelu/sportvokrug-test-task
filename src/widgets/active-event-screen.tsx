import { formatEventDate } from "@/features";
import { VideostandEvent } from "@/shared/api";
import { Button, Stack, Text, Title } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

import { EventScreenLayout } from "./event-screen-layout";

export type ActiveEventScreenProps = {
  event: VideostandEvent;
  nextEvent?: VideostandEvent | null;
};

export function ActiveEventScreen({
  event,
  nextEvent,
}: ActiveEventScreenProps) {
  return (
    <EventScreenLayout nextEvent={nextEvent}>
      <Stack h="100%" justify="center" align="center">
        <Text c="dimmed" fz="lg" ta="center">
          {formatEventDate(new Date(event.dt_start), new Date(event.dt_end))}
        </Text>

        <Title ta="center" lineClamp={2} maw="65%">
          {event.title}
        </Title>

        <Button
          color="teal"
          size="xl"
          mt="xl"
          rightSection={<IconClock size="1.5rem" stroke={2.5} />}
        >
          ИДЁТ СЕЙЧАС
        </Button>
      </Stack>
    </EventScreenLayout>
  );
}
