export default function Stations() {
  return <p className="text-white m-5 text-center">ALL STATIONS PAGE</p>;
}

// 1 minute page cache is for testing the CDN
// Should not use 1 minute when we go live
export const revalidate = 60;
