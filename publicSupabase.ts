import { createClient, Provider } from "supabase";

export const supabase = createClient(
  "https://nitjkhytnaowbkuggtwa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdGpraHl0bmFvd2JrdWdndHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2ODc0OTAsImV4cCI6MTk4NjI2MzQ5MH0.BZRNf7yQgX8xqsvfnNROSgh6wOsDMUvYeis2M6Kh0-g",
);
export const signInWith = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  });
  console.log(data, error);
  return { data, error };
};
