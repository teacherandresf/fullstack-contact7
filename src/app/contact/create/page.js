"use client"
import {useState} from 'react'
import { redirect } from 'next/navigation'

export default function CreateContact(){

    const [name, setName] = useState("")
    const [surnames, setSurnames] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [birthdate, setBirthdate] = useState("")

    async function crearContacto(e){

       e.preventDefault()
        
        if( name!== "" && surnames !=="" && phone !== ""){

            const exp = new RegExp("[0-9]{9}")
          

            if(exp.test(phone)){

            const response = await fetch("/api/contact", {
            method: 'POST',
            headers: { "Content-Type": "application-json"},
            body: JSON.stringify({contact: {  
                name: name ,
                surnames: surnames,
                phone: phone,
                email: email,
                birthdate: birthdate

            }})
        })
       
    }else{
            window.alert("el campo no tiene 9 digitos")
        }
    } else {
        window.alert("Alguno de los campos está vacío")
    }

}
    return(
        <div>
            <h1>Añadir contacto</h1>
            <form onSubmit={crearContacto}>
                <label>Nombre:
                    <input type="text" onChange={(e) => setName(e.target.value)}  />
                </label>
                <br />
                <label>Apellidos:
                    <input type="text" onChange={(e) => setSurnames(e.target.value)} required />
                </label>
                <br />
                <label>Número de teléfono:
                    <input type="number" onChange={(e) => setPhone(e.target.value)} required  />
                </label>
                <br />
                <label>Correo electrónico:
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>Fecha de nacimiento:
                    <input type="date" onChange={(e) => setBirthdate(e.target.value)} />
                </label>
                <br />
                <input type="submit" value="Crear" />
            </form>
        </div>)
}