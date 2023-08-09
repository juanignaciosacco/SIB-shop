import './FormCompra.css'
import { useState, useEffect } from 'react'

const FormCompra = ({ onClickSiguiente, envio }) => {

    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [retiro, setRetiro] = useState('')
    const [infoUsuario, setInfoUsuario] = useState({})

    const setNombreForm = (ev) => {
        setNombre(ev.target.value)
    }

    const setApellidoForm = (ev) => {
        setApellido(ev.target.value)
    }

    const setEmailForm = (ev) => {
        setEmail(ev.target.value)
    }

    const setTelefonoForm = (ev) => {
        setTelefono(ev.target.value)
    }

    const retiroChangeHandler = (ev) => {
        setRetiro(ev.target.value)
        envio(ev.target.value)
    }

    const siguienteClickHandler = () => {
        !Object.values(infoUsuario).some((e) => e === undefined) && onClickSiguiente()
    }

    useEffect(() => {
        let nombreNormalizado = nombre.toString()
        nombreNormalizado = nombreNormalizado.toLowerCase()
        let apellidoNormalizado = apellido.toString()
        apellidoNormalizado = apellidoNormalizado.toLowerCase()
        let emailNormalizado = email.toString()
        emailNormalizado = emailNormalizado.toLowerCase()
        let telefonoNormalizado = telefono.toString()
        setInfoUsuario({
            nombre: nombreNormalizado,
            apellido: apellidoNormalizado,
            email: emailNormalizado,
            telefono: telefonoNormalizado,
            tipoDeEnvio: retiro

        })
    },[nombre, apellido, email, telefono, retiro])

    useEffect(() => {
        console.log(infoUsuario)
        localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario))
    }, [infoUsuario])

    return (
        <div className="formCompraUsu">
            <form>
                <label htmlFor="Nombre">Nombre</label>
                <input className='formInputs' type="text" id="Nombre" name="Nombre" required={true} onChange={setNombreForm}/>
                <label htmlFor="Apellido">Apellido</label>
                <input className='formInputs' type="text" id="Apellido" name="Apellido" required={true} onChange={setApellidoForm}/>
                <label htmlFor="Email">Email</label>
                <input className='formInputs' type="email" name="Email" id="Email" required={true} onChange={setEmailForm}/>
                <label htmlFor="Telefono">Telefono</label>
                <input className='formInputs' type="text" name="Telefono" id="Telefono" required={true} onChange={setTelefonoForm}/>
                <div className='radio'>
                    <input type='radio' value="Tienda" name='retiro' onChange={retiroChangeHandler}/> Retiro en tienda
                    <input type='radio' value="Domicilio" name='retiro' onChange={retiroChangeHandler}/> Retiro en domicilio
                </div>
                <div>
                    {retiro === "Tienda" && <p>Te avisaremos por mail cuando este pronta tu compra para que lo retires por nuestro local!</p>}
                </div>
                <button className='btn' onClick={siguienteClickHandler}>Siguiente</button>
            </form>
        </div>
    )
}

export default FormCompra;