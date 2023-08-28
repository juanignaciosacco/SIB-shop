import './FormCompraDireccion.css'
import { useState, useEffect } from "react";
import swal from "sweetalert";

const FormCompraDireccion = ({ onClickSiguiente, isHidden }) => {

    const [calles, setCalles] = useState()
    const [localidad, setLocalidad] = useState()
    const [numeroPuerta, setNumeroPuerta] = useState()
    const [piso, setPiso] = useState()
    const [departamento, setDepartamento] = useState()
    const [direccionUsuario, setDireccionUsuario] = useState({})

    const callesFormChangeHandler = (ev) => {
        setCalles(ev.target.value)
    }

    const localidadFormChangeHandler = (ev) => {
        setLocalidad(ev.target.value)
    }

    const numeroPuertaChangeHandler = (ev) => {
        setNumeroPuerta(ev.target.value)
    }

    const pisoFormChangeHandler = (ev) => {
        setPiso(ev.target.value)
    }

    const departamentoFormChangeHandler = (ev) => {
        setDepartamento(ev.target.value)
    }

    const siguienteClickHandler = (ev) => {
        ev.preventDefault();
        console.log(calles, localidad, numeroPuerta)
        localStorage.setItem('direccionUsuario', JSON.stringify(direccionUsuario))
        if (calles !== undefined && localidad !== undefined && numeroPuerta !== undefined) {
            onClickSiguiente()
        } else {
            swal("Debe ingresar los campos obligatorios!")
        }
    }

    useEffect(() => {
        setDireccionUsuario({
            calles: calles,
            localidad: localidad,
            numero: numeroPuerta,
            piso: piso,
            departamento: departamento
        })
    },[calles, localidad, numeroPuerta, piso, departamento])

    return (
        <div className={isHidden ? 'hidden formCompraUsu': 'formCompraUsu'}>
            <form>
                <label htmlFor="calles">Calles</label>
                <input className='formInputs' type="text" id="calles" name="calles" required={true} placeholder='Obligatorio' onChange={callesFormChangeHandler}/>
                <label htmlFor="localidad">Localidad</label>
                <input className='formInputs' type="text" id="localidad" name="localidad" required={true} placeholder='Obligatorio' onChange={localidadFormChangeHandler}/>
                <label htmlFor="numeroPuerta">Número</label>
                <input className='formInputs' type="text" name="numeroPuerta" id="numeroPuerta" required={true} placeholder='Obligatorio' onChange={numeroPuertaChangeHandler}/>
                <label htmlFor="piso">Piso</label>
                <input className='formInputs' type="text" name="piso" id="piso" onChange={pisoFormChangeHandler}/>
                <label htmlFor="departamento">Departamento</label>
                <input className='formInputs' type="text" name="departamento" id="departamento" onChange={departamentoFormChangeHandler}/>
                <button className='btn' onClick={siguienteClickHandler}>Siguiente</button>
            </form>
        </div>
    )
}

export default FormCompraDireccion;