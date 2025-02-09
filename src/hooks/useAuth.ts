import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AuthStore {
  user: any | null;
  setUser: (user: any | null) => void;
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// Initialize auth state
supabase.auth.getSession().then(({ data: { session } }) => {
  useAuth.getState().setUser(session?.user ?? null);
});

// Listen for auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  useAuth.getState().setUser(session?.user ?? null);
}); 