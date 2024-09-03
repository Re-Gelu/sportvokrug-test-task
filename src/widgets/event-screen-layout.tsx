import { NextEventInfo, SmallClock } from "@/features";
import { VideostandEvent } from "@/shared/api";
import { Paper, Stack } from "@mantine/core";

export type EventScreenLayoutProps = React.PropsWithChildren<{
  nextEvent?: VideostandEvent | null;
}>;

export function EventScreenLayout({
  children,
  nextEvent,
}: EventScreenLayoutProps) {
  return (
    <Stack h="100%" w="100%">
      <Paper h="25%" my="xl">
        <Stack h="100%" justify="center" align="center">
          <SmallClock />
        </Stack>
      </Paper>

      <Paper h="50%" bg="var(--mantine-primary-color-light)">
        {children}
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
