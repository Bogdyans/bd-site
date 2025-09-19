import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_BDSUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_BDSUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)