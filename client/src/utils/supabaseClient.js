import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  // @supabase/supabase-js v2 requires a JWT anon key (starts with 'eyJ')
  // The newer 'sb_publishable_' format is only compatible with SDK v3+
  if (!supabaseAnonKey.startsWith('eyJ')) {
    console.error(
      '❌ Supabase key format mismatch!\n' +
      'Your REACT_APP_SUPABASE_ANON_KEY starts with "sb_publishable_" which is a Supabase v3 key format.\n' +
      'This project uses @supabase/supabase-js v2, which requires a JWT key (starts with "eyJ...").\n\n' +
      '👉 Fix: Go to supabase.com/dashboard → Your Project → Settings → API\n' +
      '   Copy the "anon / public" JWT key (the long eyJ... string) and update REACT_APP_SUPABASE_ANON_KEY in client/.env'
    );
  } else {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
} else {
  console.warn('⚠️ Supabase credentials missing in .env file — running without authentication');
}

export { supabase };
