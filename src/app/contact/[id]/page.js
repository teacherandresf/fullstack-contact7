"use client"
import {use, useState, useEffect} from 'react'

export default function Contact({params}){

    const {id} = use(params)
    const [contacto, setContacto] = useState()
    const [isEditing, setIsEditing] = useState(false)
    const [name, setName] = useState("")
    const [surnames, setSurnames] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [birthdate, setBirthdate] = useState("")

    async function actualizaContacto(e){
        e.preventDefault()

        const response = await fetch("/api/contact", {
            method: 'PUT',
            headers: {'Content-Type':'application-json'},
            body: JSON.stringify({
                id: id,
                update: {
                    name: name,
                    surnames: surnames,
                    email: email,
                    phone: phone,
                    birthdate: birthdate
                }
            })
        })
        setIsEditing(false)
        fetchContact()

    }
    async function fetchContact(){
        const url = "/api/contact/contactuser?id=" + id
        const response = await fetch(url)
        const cont = await response.json()
        setName(cont.name)
        setSurnames(cont.surnames)
        setEmail(cont.email)
        setPhone(cont.phone)
        setBirthdate(cont.birthdate)
        setContacto(cont)
    }

    useEffect( ()=>{
        fetchContact()
    }, [])

    if(contacto && !isEditing){
    
    return(
    <div>
        <h1>{contacto.name}</h1>
        <h2>{contacto.surnames}</h2>
        <p>{contacto.phone}</p>
        <p>{contacto.email}</p>
        <p>{contacto.birthdate}</p>
        <button onClick={() => setIsEditing(true)}>Editar</button>
    </div>
        
    )
}else if(contacto && isEditing){
    return(<div>
        <h1>Editando contacto</h1>
        <form onSubmit={actualizaContacto}>
            <label>Nombre:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}  />
            </label>
            <br />
            <label>Apellidos:
                <input type="text" value={surnames} onChange={(e) => setSurnames(e.target.value)} required />
            </label>
            <br />
            <label>Número de teléfono:
                <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} required  />
            </label>
            <br />
            <label>Correo electrónico:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <br />
            <label>Fecha de nacimiento:
                <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            </label>
            <br />
            <input type="submit" value="Crear" />
        </form>
    </div>)
}else{
    return (<h1>No encontrado</h1>)
}
}