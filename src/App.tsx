import {
  Clock,
  findCurrentEvent,
  findMainEvent,
  findNextEvent,
  findUpcomingEvent,
  isEventActive,
  sortEventsByStartDate,
} from "@/features";
import { VIDEOSTAND_EVENTS_QUERY, VideostandEventResponse } from "@/shared/api";
import configuration from "@/shared/configuration";
import { ActiveEventScreen, CountdownEventScreen } from "@/widgets";
import { useQuery } from "@apollo/client";
import { Loader } from "@mantine/core";

function App() {
  const { loading, error, data } = useQuery<VideostandEventResponse>(
    VIDEOSTAND_EVENTS_QUERY,
    {
      variables: { videostand_id: "6" },
      pollInterval: configuration.API_POLL_INTERVAL, // Обновление в “реальном времени”. Раз в N мс
    }
  );

  if (loading) return <Loader size={100} />;

  if (
    !data ||
    error ||
    data?.videostandEvents.current_and_upcoming.length === 0
  ) {
    return <Clock />;
  }

  const events = sortEventsByStartDate(
    data.videostandEvents.current_and_upcoming
  );

  // Находим ключевое событие (is_main)
  const mainEvent = findMainEvent(events);

  // Если ключевое событие активно, показываем его как текущее
  if (mainEvent) {
    const nextEvent = findNextEvent(events, mainEvent);

    if (isEventActive(mainEvent)) {
      return <ActiveEventScreen event={mainEvent} nextEvent={nextEvent} />;
    } else {
      return <CountdownEventScreen event={mainEvent} nextEvent={nextEvent} />;
    }
  }

  // Если ключевого события нет, работаем с обычными событиями
  const currentEvent = findCurrentEvent(events);
  const upcomingEvent = currentEvent
    ? findNextEvent(events, currentEvent)
    : findUpcomingEvent(events);

  if (currentEvent) {
    const nextEvent = findNextEvent(events, currentEvent);
    return <ActiveEventScreen event={currentEvent} nextEvent={nextEvent} />;
  }

  if (upcomingEvent) {
    const nextEvent = findNextEvent(events, upcomingEvent);
    return <CountdownEventScreen event={upcomingEvent} nextEvent={nextEvent} />;
  }

  return <Clock />;
}

export default App;

const testData = {
  videostandEvents: {
    current_and_upcoming: [
      {
        __typename: "VideostandEvent", // 2
        title: "Чемпионат Москвы",
        is_main: true,
        dt_start: "2024-09-04T10:00:00+03:00",
        dt_end: "2024-09-06T23:59:00+03:00",
        dt_create: "2024-01-31T02:39:01+03:00",
      },
      {
        __typename: "VideostandEvent", // 1
        title: "Первенство Москвы",
        is_main: false,
        dt_start: "2024-08-30T10:00:00+03:00",
        dt_end: "2024-09-04T21:00:00+03:00",
        dt_create: "2024-01-24T05:56:29+03:00",
      },
      {
        __typename: "VideostandEvent", // 3
        title:
          'Международные соревнования "Гран-при", Кубок чемпионок Газпром Алины Кабаевой "Газпром детям" среди клубов',
        is_main: false,
        dt_start: "2024-09-09T10:00:00+03:00",
        dt_end: "2024-09-15T23:59:00+03:00",
        dt_create: "2023-03-07T04:19:50+03:00",
      },
    ],
  },
};
