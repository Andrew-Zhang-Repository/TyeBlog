import { NextResponse } from 'next/server'
import { createServerClient } from '../Createserver'
import { PrismaClient } from '../../../generated/prisma/client'
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

export async function GET(request: Request) {
  const { searchParams} = new URL(request.url)
  const code = searchParams.get('code')

  const connectionString = process.env.DIRECT_URL
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({adapter})

  if (code) {
    const supabase = await createServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    

    
    if (!error) {

      const { data: { user } } = await supabase.auth.getUser()

      // Update postgres schema in supabase
      if (user?.email) {
        await prisma.user.upsert({
          where: { email: user.email },
          update: {
            name: user.user_metadata?.full_name,
            image: user.user_metadata?.avatar_url,
          },
          create: {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.full_name,
            image: user.user_metadata?.avatar_url,
          },
        });
      }

      return NextResponse.redirect(`http://localhost:3000/dashboard`)
    }
  }
  return NextResponse.redirect(`http://localhost:3000/error`)
}
