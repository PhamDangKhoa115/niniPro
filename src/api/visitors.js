import { supabase } from "../utils/supabase.js";

export async function fetchVisitors() {
  const { data, error } = await supabase.from("visitors").select("*");

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}
