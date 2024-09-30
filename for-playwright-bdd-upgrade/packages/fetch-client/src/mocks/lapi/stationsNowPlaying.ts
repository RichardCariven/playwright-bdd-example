import { type components } from "../../schemas/lapi";

export const stationsNowPlaying: components["schemas"]["StationNowPlaying"][] =
  [
    {
      stationCode: "abr",
      stationNowPlaying: {
        nowPlayingTrackId: 12950,
        nowPlayingTrack: "Waterfall",
        nowPlayingArtist: "The Stone Roses",
        nowPlayingImage:
          "https://assets.planetradio.co.uk/artist/1-1/320x320/7112.jpg?ver=1465117870",
        nowPlayingSmallImage:
          "https://assets.planetradio.co.uk/artist/1-1/160x160/7112.jpg?ver=1465117870",
        nowPlayingTime: "2024-08-08 14:51:35",
        nowPlayingDuration: 202,
        nowPlayingAppleMusicUrl:
          "https://geo.itunes.apple.com/dk/album/323061008?i=323061015",
      },
      stationOnAir: {
        showId: 4563,
        episodeTitle: "The No Repeat Guarantee",
        episodeDescription:
          "Ben Burrell continues the No Repeat Guarantee. You won't hear the same song twice! And Ben searches for the best songs from different bands.",
        episodeStart: "2024-08-08 13:00:00",
        episodeDuration: 10800,
        episodeImageUrl:
          "https://media.bauerradio.com/image/upload/q_auto/v1705058081/shows/rysbxlw4lzwj5gd1gejg.png",
        episodeIsSkippable: true,
      },
    },
  ];
