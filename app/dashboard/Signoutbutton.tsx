'use client'
import {createClient} from "../auth/Createclient"
import {redirect} from 'next/navigation'



export default function Signoutbutton() {

  const handleSignOut = async() =>{
    const supabase = createClient();
    const { error } = await supabase.auth.signOut()
    if (error) {
        console.error('Error signing out:', error.message)
    } else {
        redirect('http://localhost:3000')
    }
  };

  return (
    <button 
      onClick={handleSignOut}
      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
    >
      Sign Out
    </button>
  );

}