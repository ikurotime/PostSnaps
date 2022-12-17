import { HandlerContext } from "$fresh/server.ts";
import { deleteCookie } from "std/http/cookie.ts";
export const handler = (
  req: Request,
  _ctx: HandlerContext,
): Response => {
  const headers = new Headers();
  const url = new URL(req.url);
  deleteCookie(req.headers, "ps.supabase.auth.token", {
    path: "/",
    domain: url.hostname,
  });
  headers.set("location", "/");
  return new Response(JSON.stringify("Log Out"), {
    status: 200,
    headers,
  });
};
