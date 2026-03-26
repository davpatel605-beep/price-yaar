import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wolhksrjrossztdsuuly.supabase.co";
const supabaseKey = "sb_publishable_UltwN-C9DGrlNgiFzu1Auw_V5MY-Mos";

export const supabase = createClient(supabaseUrl, supabaseKey);
