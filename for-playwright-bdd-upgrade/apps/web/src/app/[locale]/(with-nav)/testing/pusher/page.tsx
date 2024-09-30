import { NowPlayingTestWrapper } from "@web/components/NowPlayingTest/NowPlayingTest";

export default function Pusher() {
  return (
    <>
      <NowPlayingTestWrapper stationCode="abr" mounted />
      <NowPlayingTestWrapper stationCode="ki1" mounted />
      <NowPlayingTestWrapper stationCode="abr" />
    </>
  );
}
