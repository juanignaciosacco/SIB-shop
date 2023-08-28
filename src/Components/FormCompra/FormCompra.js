import './FormCompra.css'
import { useState, useEffect } from 'react'
import swal from "sweetalert";

const FormCompra = ({ onClickSiguiente, envio }) => {

    const [nombre, setNombre] = useState()
    const [apellido, setApellido] = useState()
    const [email, setEmail] = useState()
    const [telefono, setTelefono] = useState()
    const [retiro, setRetiro] = useState()
    const [infoUsuario, setInfoUsuario] = useState({})

    useEffect(() => {
        // sessionStorage.setItem('infoUsuario', JSON.stringify(infoUsuario))
        if (sessionStorage.getItem('infoUsuario') === null) {
            sessionStorage.setItem('infoUsuario', JSON.stringify(infoUsuario))
        } else {
            if (Object.keys(JSON.parse(sessionStorage.getItem('infoUsuario'))).length === 5) {
                const datos = sessionStorage.getItem('infoUsuario')
                console.log(datos)
                setInfoUsuario({
                    nombre: datos.nombre,
                    apellido: datos.apellido,
                    email: datos.email,
                    telefono: datos.telefono,
                    tipoDeEnvio: datos.tipoDeEnvio
                })
            }
        }
    },[])

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

    const siguienteClickHandler = (ev) => {
        ev.preventDefault()
        !Object.values(infoUsuario).some((e) => e === "") ? onClickSiguiente() : swal("Debe llenar todos los campos")
    }

    useEffect(() => {
            // setInfoUsuario({
            //     nombre: nombre,
            //     apellido: apellido,
            //     email: email,
            //     telefono: telefono,
            //     tipoDeEnvio: retiro
            // })
        if (Object.keys(JSON.parse(sessionStorage.getItem('infoUsuario'))).length === 5 ) {
            const datos = JSON.parse(sessionStorage.getItem('infoUsuario'))
            setInfoUsuario({
                nombre: datos.nombre,
                apellido: datos.apellido,
                email: datos.email,
                telefono: datos.telefono,
                tipoDeEnvio: datos.tipoDeEnvio
            })
        } else {
            setInfoUsuario({
                nombre: nombre,
                apellido: apellido,
                email: email,
                telefono: telefono,
                tipoDeEnvio: retiro
            })
        }
    },[nombre, apellido, email, telefono, retiro])

    useEffect(() => {
        console.log(Object.keys(infoUsuario).length)
        console.log(infoUsuario)
        if (Object.keys(infoUsuario).length === 5) {
            sessionStorage.setItem('infoUsuario', JSON.stringify(infoUsuario))
        }
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
                    <input type='radio' value="Tienda" name='retiro' onChange={retiroChangeHandler} /> Retiro en tienda
                    <input type='radio' value="Domicilio" name='retiro' onChange={retiroChangeHandler} /> Retiro en domicilio
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