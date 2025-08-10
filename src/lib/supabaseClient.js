import {
    createClient
} from '@supabase/supabase-js'

const supabaseUrl = 'https://gnklmtdfzpyrxgnxpduk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdua2xtdGRmenB5cnhnbnhwZHVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTk4MDksImV4cCI6MjA3MDI5NTgwOX0.0oRB97-KGU_59RWOke92xltGPE8Vvm2ZcsKEwyteelY"
                    
export const supabase = createClient(supabaseUrl, supabaseKey)