import { HandlerContext } from "$fresh/server.ts";
import { supabaseClient } from "../../supabase.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const headers = new Headers();

  const body = await req.json();

  //check if user has already liked the post, if not, insert into liked_posts table otherwise delete from liked_posts table
  const { data: likedData, error: likedError } = await supabaseClient
    .from("liked_posts")
    .select("*")
    .eq("user_id", body.user_id)
    .eq("post_id", body.tweet_id);
  if (likedError) {
    return new Response(JSON.stringify({ message: likedError.message }), {
      status: 500,
    });
  }
  if (likedData.length > 0) {
    const { data: deleteData, error: deleteError } = await supabaseClient
      .from("liked_posts")
      .delete()
      .eq("user_id", body.user_id)
      .eq("post_id", body.tweet_id);
    if (deleteError) {
      return new Response(JSON.stringify({ message: deleteError.message }), {
        status: 500,
      });
    }
    return new Response(JSON.stringify({ deleteData }), {
      status: 200,
      headers,
    });
  }

  const { data, error } = await supabaseClient.from("liked_posts").insert([{
    user_id: body.user_id,
    post_id: body.tweet_id,
    image: body.image,
    link: body.link,
  }]);
  await supabaseClient.from("posts").insert([{
    post_id: body.tweet_id,
    image: body.image,
    link: body.link,
  }]);

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers,
  });
};
