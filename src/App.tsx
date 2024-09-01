import { VideostandEventResponse } from "@/shared/api";
import configuration from "@/shared/configuration";
import { ActiveEventScreen, Clock, CountdownEventScreen } from "@/widgets";
import { gql, useQuery } from "@apollo/client";

function App() {
  const { loading, error, data } = useQuery<VideostandEventResponse>(
    gql`
      query videostandEvents($videostand_id: ID!) {
        videostandEvents(videostand_id: $videostand_id) {
          current_and_upcoming {
            title
            is_main
            dt_start
            dt_end
            dt_create
          }
          finished {
            title
            is_main
            dt_start
            dt_end
            dt_create
          }
        }
      }
    `,
    {
      variables: { videostand_id: "6" },
      pollInterval: configuration.API_POLL_INTERVAL,
    }
  );

  /*   const data = testData; */

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  if (!data || data?.videostandEvents.current_and_upcoming.length === 0) {
    return <Clock />;
  }

  const currentDate = new Date();

  data.videostandEvents.current_and_upcoming.sort((event1, event2) => {
    return (
      new Date(event1.dt_start).getTime() - new Date(event2.dt_start).getTime()
    );
  });

  const currentEvent =
    data.videostandEvents.current_and_upcoming.find(
      (event) =>
        new Date(event.dt_start) <= currentDate &&
        new Date(event.dt_end) >= currentDate
    ) || null;

  const upcomingEvent =
    currentEvent ||
    data.videostandEvents.current_and_upcoming.find(
      (event) => new Date(event.dt_start) > currentDate
    );

  const nextEvent = upcomingEvent
    ? data.videostandEvents.current_and_upcoming.find(
        (event) => new Date(event.dt_start) > new Date(upcomingEvent.dt_start)
      )
    : null;

  if (currentEvent) {
    return <ActiveEventScreen event={currentEvent} nextEvent={nextEvent} />;
  }

  if (upcomingEvent) {
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
        is_main: false,
        dt_start: "2024-09-02T10:00:00+03:00",
        dt_end: "2024-09-03T23:59:00+03:00",
        dt_create: "2024-01-31T02:39:01+03:00",
      },
      /* {
        __typename: "VideostandEvent", // 1
        title: "Первенство Москвы",
        is_main: true,
        dt_start: "2024-08-30T10:00:00+03:00",
        dt_end: "2024-09-04T21:00:00+03:00",
        dt_create: "2024-01-24T05:56:29+03:00",
      }, */
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
