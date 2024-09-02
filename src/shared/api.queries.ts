import { gql } from "@apollo/client";

export const VIDEOSTAND_EVENTS_QUERY = gql`
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
`;
