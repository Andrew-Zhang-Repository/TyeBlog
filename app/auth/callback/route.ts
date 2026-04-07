import { NextResponse } from 'next/server'
import { createServerClient } from '../Createserver'

export async function GET(request: Request) {
  const { searchParams} = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createServerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`http://localhost:3000/dashboard`)
    }
  }
  return NextResponse.redirect(`http://localhost:3000/error`)
}