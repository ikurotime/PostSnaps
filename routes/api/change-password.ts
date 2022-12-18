import { HandlerContext } from "$fresh/server.ts";
import { supabaseClient } from "./../../supabase.ts";
export const handler = async (
  req: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const formData = await req.json();
  const { data, error } = await supabaseClient.auth.admin.updateUserById(
    formData.user_id,
    {
      password: formData.password,
    },
  );
  if (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data }), {
    status: 200,
  });
};
