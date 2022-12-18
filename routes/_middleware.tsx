// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { getCookies } from "std/http/cookie.ts";
import { User } from "supabase";
import { supabaseClient } from "../supabase.ts";
export interface State {
  auth: {
    user: User;
  } | {
    user: null;
  };
  liked_post?: boolean;
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const url = new URL(req.url);
  if (
    ["/", "/login", "/signup", "/explore", "/favorites", "/change-password"]
      .includes(url.pathname)
  ) {
    const url = new URL(req.url);

    const tweetId = url.searchParams.get("tweetId");

    const cookies = getCookies(req.headers);
    if (cookies["ps.supabase.auth.token"]) {
      const { data, error } = await supabaseClient.auth.getUser(
        cookies["ps.supabase.auth.token"],
      );
      if (tweetId) {
        await supabaseClient.from("liked_posts").select("*").match({
          user_id: data?.user?.id,
          post_id: tweetId,
        }).then((res) => {
          if (res.data && res.data.length > 0) {
            ctx.state.liked_post = true;
          } else {
            ctx.state.liked_post = false;
          }
        });
      }
      if (error) {
        console.log(error);
      }
      if (data) {
        ctx.state.auth = data;
      }
      if (["/login", "/signup"].includes(url.pathname)) {
        return Response.redirect(url.origin + "/");
      }
      if (url.pathname == "/favorites" && !data?.user) {
        return Response.redirect(url.origin + "/login");
      }
    }

    return await ctx.next();
  } else {
    return await ctx.next();
  }
}
