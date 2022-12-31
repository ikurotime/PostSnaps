import { createClient } from "supabase";
//import "https://deno.land/x/dotenv/load.ts";

export const supabaseClient = createClient(
  "https://nitjkhytnaowbkuggtwa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdGpraHl0bmFvd2JrdWdndHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2ODc0OTAsImV4cCI6MTk4NjI2MzQ5MH0.BZRNf7yQgX8xqsvfnNROSgh6wOsDMUvYeis2M6Kh0-g",
);
