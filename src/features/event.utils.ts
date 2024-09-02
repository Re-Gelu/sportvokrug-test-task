import { VideostandEvent } from "@/shared/api";

// Утилиты для работы с событиями

export const sortEventsByStartDate = (events: VideostandEvent[]) =>
  events.sort(
    (event1, event2) =>
      new Date(event1.dt_start).getTime() - new Date(event2.dt_start).getTime()
  );

export const isEventActive = (event: VideostandEvent) => {
  const currentDate = new Date();
  return (
    new Date(event.dt_start) <= currentDate &&
    new Date(event.dt_end) >= currentDate
  );
};

export const findMainEvent = (events: VideostandEvent[]) =>
  events.find((event) => event.is_main);

export const findCurrentEvent = (events: VideostandEvent[]) =>
  events.find((event) => isEventActive(event));

export const findUpcomingEvent = (events: VideostandEvent[]) => {
  const currentDate = new Date();
  return events.find((event) => new Date(event.dt_start) > currentDate);
};

export const findNextEvent = (
  events: VideostandEvent[],
  currentEvent: VideostandEvent
) =>
  events.find(
    (event) => new Date(event.dt_start) > new Date(currentEvent.dt_start)
  );
