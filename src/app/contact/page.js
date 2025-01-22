"use client"
import {useState, useEffect} from 'react'
import Link from 'next/link'
import 'C:/Users/Andrés/Documents/PROYECTOS-DI/fullstack-contact7/src/styles/estilosinicio.css'

export default function ListContact(){

    const [contacts, setContacts] = useState([])

    async function deleteContact(deleteId){
        
        if(window.confirm("Desea eliminarlo")){
        const response = await fetch("/api/contact", {
            method: 'DELETE',
            headers: {"Content-Type":"application-json"},
            body: JSON.stringify({id: deleteId})
        })

        fetchContacts()
        }
    }

    async function fetchContacts(){
        const response = await fetch("/api/contact")
        const body = await response.json()
        setContacts(body)
    }

    useEffect( () => {
        fetchContacts()
    }, [])

    return(
    <div>
        <h1>Lista de contactos: </h1>
        
        {contacts.map(contact => <p key={contact.id}><Link  href={"/contact/" + contact.id} >{contact.name} {contact.surnames}</Link><button onClick={() => deleteContact(contact.id)}>Eliminar</button></p>)}
        <Link href="/contact/create" >Agregar contacto</Link>
    </div>);
}