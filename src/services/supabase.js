import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hpululfofqdyayqrxrzd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwdWx1bGZvZnFkeWF5cXJ4cnpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2NzE1NzMsImV4cCI6MjAwMzI0NzU3M30.B3g5vwb11q2bwx8r3mOZX8f3M8m2OQujCmCx2jbl9W8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
