import { createClient } from '@supabase/supabase-js';

// Используем REACT_APP_ префикс
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Создаем клиент
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
