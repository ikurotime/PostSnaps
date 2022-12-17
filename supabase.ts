import { createClient, Provider } from "supabase";
import "https://deno.land/x/dotenv/load.ts";

export const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") as string,
  Deno.env.get("SUPABASE_KEY") as string,
);
