import { createClient } from '@supabase/supabase-js';

// ─── Supabase Configuration ──────────────────────────────────────────────────
// We use environment variables by default, but provide hardcoded fallbacks
// to ensure the app "always works" even if the dev server environment fails.

const SB_URL = process.env.REACT_APP_SUPABASE_URL || 'https://ladbgkrgibbdwltldtfb.supabase.co';
const SB_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxhZGJna3JnaWJiZHdsdGxkdGZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1MDM5MjQsImV4cCI6MjA5MzA3OTkyNH0.RdPpSbJ3wAdbpgLn4nPVJVPQ_L02OuOz37c1edpq970';

// ─── Initialize Client ───────────────────────────────────────────────────────
export const supabase = createClient(SB_URL, SB_KEY);

// ─── Helper: assertSupabase ──────────────────────────────────────────────────
// Returns the client or throws a descriptive error.
// Since we have fallbacks now, this should never throw unless the SDK fails.
export function assertSupabase() {
  if (!supabase) {
    throw new Error(
      'Supabase client failed to initialize. Please check your network connection and Supabase project status.'
    );
  }
  return supabase;
}

// Debug log for development
if (process.env.NODE_ENV === 'development') {
  console.log('🎀 Supabase initialized with URL:', SB_URL);
}
