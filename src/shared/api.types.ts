export type VideostandEvent = {
  title: string;
  is_main: boolean;
  dt_start: string;
  dt_end: string;
  dt_create: string;
};

export type VideostandEventResponse = {
  videostandEvents: {
    current_and_upcoming: VideostandEvent[];
    finished: VideostandEvent[];
  };
};
