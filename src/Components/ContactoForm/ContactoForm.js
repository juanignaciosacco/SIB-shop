import './ContactoForm.css'
import { useEffect, useState } from "react";
import swal from "sweetalert";

const ContactoForm = () => {

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        email: '',
        asunto: '',
        mensaje: ''
    })

    const [mailState, setMailState] = useState({
        enviado: false,
        enviando: false
    })

    const { enviado, enviando } = mailState

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const enviarMail = (ev) => {
        ev.preventDefault();
        if (Object.keys(formData).length > 0) { 
            // fetch("https://backend.sib.com.uy/feedback", {
            setMailState({ enviado: false, enviando: true })
            fetch("http://localhost:8080/contacto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
                
            }).then((response) => {
                setMailState({ enviando: false, enviado: true })
                // swal('Email enviado exitosamente!!')
                console.log(response.json())
                return response.json()
            }).catch((error) => {
                swal('Hubo un error al enviar tu email, por favor intenta mas tarde!')
                console.error(error);
            })
        }
    }

    const resetForm = (ev) => {
        ev.preventDefault();
        setFormData({
            nombre: '',
            apellido: '',
            email: '',
            asunto: '',
            mensaje: ''
        })
    }

    useEffect(() => {
        if (enviado === true || enviando === true) {
            swal( enviado ? {text: 'Email enviado exitosamente!!', icon: 'success'} : {text:'Enviando email, aguarde por favor!', icon: 'warning'})
            .then(setFormData({
                nombre: '',
                apellido: '',
                email: '',
                asunto: '',
                mensaje: ''
            }))
        }
    }, [enviado, enviando])


    return (
        <div id="contactoForm">
            <form className="form" onSubmit={enviarMail}>
                <label htmlFor="nombre">Nombre</label>
                <input name="nombre" id="nombre" className='formInputs'
                    value={
                        formData.nombre
                    }
                    onChange={handleInputChange} />
                <label htmlFor="apellido">Apellido</label>
                <input name="apellido" id="apellido" className='formInputs'
                    value={
                        formData.apellido
                    }
                    onChange={handleInputChange} />
                <label htmlFor="email">Email</label>
                <input name="email" id="email" className='formInputs'
                    value={
                        formData.email
                    }
                    onChange={handleInputChange} />
                <label htmlFor="asunto">Asunto</label>
                <input type="text" name="asunto" id="asunto" className='formInputs'
                    value={
                        formData.asunto
                    }
                    onChange={handleInputChange} />
                <label htmlFor="mensaje">Mensaje</label>
                <textarea name="mensaje" id="mensaje" rows='10' cols='50' className='formInputs'
                    value={
                        formData.mensaje
                    }
                    onChange={handleInputChange} />
                <div className='btns'>
                    <button type='submit' className='btn'>Enviar</button>
                    <button className='btn' onClick={resetForm}>Resetear</button>
                </div>
            </form>
        </div>
    )
};

export default ContactoForm;
