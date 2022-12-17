// routes/_middleware.ts
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { supabaseClient } from "../supabase.ts";
import { getCookies } from "std/http/cookie.ts";
import { User } from "supabase";
export interface State {
  auth: {
    user: User;
  } | {
    user: null;
  };
}

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext<State>,
) {
  const url = new URL(req.url);
  if (["/", "/login", "/signup", "/explore"].includes(url.pathname)) {
    const url = new URL(req.url);
    const cookies = getCookies(req.headers);
    if (cookies["ps.supabase.auth.token"]) {
      const { data, error } = await supabaseClient.auth.getUser(
        cookies["ps.supabase.auth.token"],
      );
      if (error) {
        console.log(error);
      }
      if (data) {
        ctx.state.auth = data;
      }
      if (["/login", "/signup"].includes(url.pathname)) {
        return Response.redirect(url.origin + "/");
      }
    }
    return await ctx.next();
  } else {
    return await ctx.next();
  }
}
