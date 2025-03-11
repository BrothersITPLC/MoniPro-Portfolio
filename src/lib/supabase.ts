import { createClient } from '@supabase/supabase-js';

// Ensure environment variables are defined
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === 'your-project-url' || !supabaseAnonKey || supabaseAnonKey === 'your-anon-key') {
  throw new Error(
    'Please click the "Connect to Supabase" button in the top right to set up your Supabase project.'
  );
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    'Invalid Supabase URL. Please ensure you have clicked the "Connect to Supabase" button to set up your project correctly.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);