import { HandlerContext } from "$fresh/server.ts";
import { setCookie } from "std/http/cookie.ts";
import { supabaseClient } from "./../../supabase.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const formData = await req.json();
  const headers = new Headers();
  const url = new URL(req.url);
  const { data, error } = await supabaseClient.auth.signUp({
    email: formData.email,
    password: formData.password,
  });
  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
  const { error: updateError } = await supabaseClient.from(
    "profiles",
  ).update({ username: formData.username }).eq("id", data.user?.id);
  if (updateError) {
    return new Response(JSON.stringify({ message: updateError.message }), {
      status: 500,
    });
  }

  setCookie(headers, {
    name: "ps.supabase.auth.token",
    value: data.session?.access_token as string,
    maxAge: data.session?.expires_in,
    httpOnly: true,
    sameSite: "Lax",
    domain: url.hostname,
    path: "/",
    secure: true,
  });
  headers.set("location", "/");
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers,
  });
};
