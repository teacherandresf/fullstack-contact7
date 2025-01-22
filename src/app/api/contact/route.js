import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://iipizibwknbrbbioxsqw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpcGl6aWJ3a25icmJiaW94c3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY1OTYzNTUsImV4cCI6MjA1MjE3MjM1NX0.vLkyCfDgJjfHy4d5SIqTMU3xeU7NLRziftdbEHhZ4bk"
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(){

    const {data: contacts, error} = await supabase.from("contact").select("*").order("name", {ascending: true})

    return new Response(JSON.stringify(contacts), {status: 200})
}


export async function DELETE(request) {

    const body = await request.json()
    const id = body.id

    const {data: deleteData, error} = await supabase.from("contact").delete().eq("id", id)

    if(error){
        return new Response(JSON.stringify(error), {status: 404})
    }
    return new Response( JSON.stringify({success: "eliminado con éxito"}), {status: 200})
}

export async function POST(request) {

    /**
     * {"contact": {
     *  "name": "sjahsjd",
     *  "apellidos": "jahsjdhas"
     *  }
     * }
     */
    const body = await request.json()

    const contacto = body.contact

    const {data: postData, error} = await supabase.from("contact").insert(contacto)

    if(!error){
    return new Response(JSON.stringify({success: "creado con éxito"}), {status:201})

    }
    return new Response(JSON.stringify(error), {status: 400})

}

export async function PUT(request){

    const body = await request.json()
    const id = body.id

    const {data: updateData, error} = await supabase.from("contact").update(body.update).eq("id", id)

    if(error){
        return new Response(JSON.stringify({error: error}), {status: 404})
    }

    return new Response(JSON.stringify({success: "actualizado"}), {status: 200}
    )
    

}