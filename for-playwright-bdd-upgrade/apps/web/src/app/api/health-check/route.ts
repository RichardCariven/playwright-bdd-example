export function GET() {
  return Response.json(
    { status: "healthy" },
    {
      status: 200,
      headers: { "cache-control": "max-age=60" },
    },
  );
}
