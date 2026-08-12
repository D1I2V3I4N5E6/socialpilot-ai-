import { createClient } from '@supabase/supabase-js';

// Replace these placeholders with your actual Supabase project URL and Anon Public Key from your Supabase dashboard
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-supabase-anon-key-here';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);