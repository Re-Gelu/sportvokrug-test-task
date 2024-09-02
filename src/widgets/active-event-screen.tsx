import { formatEventDate, NextEventInfo, SmallClock } from "@/features";
import { VideostandEvent } from "@/shared/api";
import { Button, Paper, Stack, Text, Title } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

export type ActiveEventScreenProps = {
  event: VideostandEvent;
  nextEvent?: VideostandEvent | null;
};

export function ActiveEventScreen({
  event,
  nextEvent,
}: ActiveEventScreenProps) {
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

          <Button
            color="teal"
            size="xl"
            mt="xl"
            rightSection={<IconClock size="1.5rem" stroke={2.5} />}
          >
            ИДЁТ СЕЙЧАС
          </Button>
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
