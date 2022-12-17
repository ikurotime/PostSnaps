import { supabaseClient } from "./../../supabase.ts";
import { HandlerContext } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const formData = await req.json();
  const headers = new Headers();
  const url = new URL(req.url);
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  });
  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
  setCookie(headers, {
    name: "ps.supabase.auth.token",
    value: data.session?.access_token as string,
    maxAge: data.session?.expires_in,
    sameSite: "Lax",
    httpOnly: true,
    path: "/",
    secure: true,
  });
  headers.set("location", "/");
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers,
  });
};
