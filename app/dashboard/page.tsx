
import { PrismaClient } from '../../generated/prisma/client';
import { createServerClient } from '../auth/Createserver';
import Signoutbutton from './Signoutbutton';
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { redirect } from 'next/navigation';




export default async function Dashboard() {
    const connectionString = process.env.DIRECT_URL
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({adapter})

    const supabase = await createServerClient()
    const { data:{user} } = await supabase.auth.getUser()

    if (!user){
        redirect("http://localhost:3000");
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
    });
   
  
  
 
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            
            {dbUser?.image ? (
              <img 
                src={dbUser.image} 
                alt={dbUser.name || 'User'} 
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-2xl text-indigo-600">
                  {dbUser?.name?.charAt(0) || user.email?.charAt(0)}
                </span>
              </div>
            )}
        
            
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {dbUser?.name || 'Welcome!'}
              </h1>
              <p className="text-gray-500">{user.email}</p>
            </div>
            

          </div>
          <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Create Post
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              View Posts
            </button>
            <Signoutbutton />
          </div>
        </div>
      </div>
    </div>
  );
}

