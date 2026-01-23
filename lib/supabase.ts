// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

// REPLACE THESE WITH YOUR KEYS FROM SUPABASE DASHBOARD
const supabaseUrl = 'https://gvdnndsiouizjpajgiwt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2ZG5uZHNpb3VpempwYWpnaXd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxOTQzNjgsImV4cCI6MjA4NDc3MDM2OH0.tyDTXoOh-VOmCcN610JmK7Uqevsyhd_6NpgsYludTSA';

export const supabase = createClient(supabaseUrl, supabaseKey);