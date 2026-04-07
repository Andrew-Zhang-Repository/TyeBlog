import { createClient } from './Createclient';

export async function signInWithGoogle() {
  const supabase = await createClient();
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options:{
      redirectTo: 'http://localhost:3000/auth/callback'
    }
  });
}