import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://iipizibwknbrbbioxsqw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGl6aWJ3a25icmJiaW94c3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTYzNTUsImV4cCI6MjA1MjE3MjM1NX0.vLkyCfDgJjfHy4d5SIqTMU3xeU7NLRziftdbEHhZ4bk"
const supabase = createClient(supabaseUrl, supabaseKey)

// /api/contact/contactuser?id=1

export async function GET(request){

    const {searchParams} = new URL(request.url)
    const id = searchParams.get("id")


    const {data: contact, error} = await supabase.from("contact").select("*").eq("id", id).single()

    if(error){
        return new Response(JSON.stringify(error), {status: 404})
    }
    return new Response(JSON.stringify(contact), {status: 200})
}