import { formatEventDate } from "@/features";
import { VideostandEvent } from "@/shared/api";
import { Stack, StackProps, Text, Title } from "@mantine/core";

export type NextEventInfoProps = {
  event: VideostandEvent;
} & StackProps;

export function NextEventInfo({ event, ...props }: NextEventInfoProps) {
  return (
    <Stack {...props}>
      <Text c="dimmed" ta="center">
        {formatEventDate(new Date(event.dt_start), new Date(event.dt_end))}
      </Text>

      <Title order={2} fz="h4" ta="center" lineClamp={1}>
        {event.title}
      </Title>
    </Stack>
  );
}
