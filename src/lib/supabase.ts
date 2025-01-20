import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = "https://csjfsnydryvuuqmiawqy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzamZzbnlkcnl2dXVxbWlhd3F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczOTU1MzIsImV4cCI6MjA1Mjk3MTUzMn0.-y1EMy-fQwTDK1qKszfpEuJf4vDXU9DnjVLHv65zmVQ";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);