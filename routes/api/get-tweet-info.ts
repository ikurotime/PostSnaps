import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  _req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const { statusID } = await _req.json();
  try {
    const response = await fetch(
      `https://api.twitter.com/2/tweets?ids=${statusID}&tweet.fields=created_at%2Cpublic_metrics%2Cattachments&expansions=attachments.media_keys%2Cauthor_id&media.fields=preview_image_url%2Curl&user.fields=created_at%2Cprofile_image_url`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer AAAAAAAAAAAAAAAAAAAAACGuaQEAAAAAn1YKFFsQgA29%2BbJ8AV5YUfuoyvw%3D7qy34nofvepWAhGZSBlFlZO5lny6lzVHcysa9dtapOTImZnVHX",
        },
      },
    );

    if (response.ok) {
      const result = await response.json();
      return new Response(
        JSON.stringify(result),
        { headers: { "Content-Type": "application/json" } },
      );
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response("Something went wrong");
};
