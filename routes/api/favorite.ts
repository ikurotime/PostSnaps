import { HandlerContext } from "$fresh/server.ts";
import { decode } from "base64-arraybuffer";
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
  //convert image from base64 to file png
  const image = body.image.replace(/^data:image\/\w+;base64,/, "");
  //upload image to storage
  await supabaseClient
    .storage
    .from("images")
    .upload(`images/${body.tweet_id}.png`, decode(image), {
      contentType: "image/png",
      cacheControl: "3600",
      upsert: false,
    });

  // get url from path
  const { data: urlData } = supabaseClient
    .storage
    .from("images")
    .getPublicUrl(`images/${body.tweet_id}.png`);

  //insert into posts table
  await supabaseClient.from("posts").insert([{
    post_id: body.tweet_id,
    image: urlData.publicUrl,
    link: body.link,
  }]);
  const { data, error } = await supabaseClient.from("liked_posts").insert([{
    user_id: body.user_id,
    post_id: body.tweet_id,
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
