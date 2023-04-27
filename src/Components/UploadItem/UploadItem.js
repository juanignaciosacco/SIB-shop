import './UploadItem.css'
import { getFirestore, doc, collection, setDoc } from "firebase/firestore"
import { useState } from "react"
import { uploadFile } from '../../index'

const UploadItem = () => {

    const [nombreProd, setNombreProd] = useState()
    const [precioProd, setPrecioProd] = useState()
    const [descProd, setDescProd] = useState()
    const [NIProd, setNIProd] = useState()
    const [files, setFiles] = useState([])
    const [file, setFile] = useState()
    const db = getFirestore()
    const items2 = collection(db, 'productos')

    const nombreChangeHandler = (ev) => {
        setNombreProd(ev.target.value)
    }

    const precioChangeHandler = (ev) => {
        setPrecioProd(ev.target.value)
    }

    const descChangeHandler = (ev) => {
        setDescProd(ev.target.value)
    }

    const NIChangeHandler = (ev) => {
        setNIProd(ev.target.value)
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('hola')
        var results = []
        try {
            for (const i of file) {
                results.push(await uploadFile(i))
            }
        } catch (error) {
            console.log(error)
            alert('Fallo interno, avisale a juanchi')
        }
            setDoc(doc(items2), {
                Nombre: nombreProd,
                Precio: precioProd,
                Descripcion: descProd,
                NuevoIngreso: NIProd,
                imgUrl: results
            })
            setFiles(results)
            setPrecioProd('')
            setNombreProd('')
            setDescProd('')
            console.log(files)
    }



    return (
        <div className="formUpload">
            <form onSubmit={handleSubmit} id='formProds'>
                <label htmlFor="Titulo">Titulo</label>
                <input className='formUploadInputs' name="titulo" id="titulo" onChange={nombreChangeHandler}/>
                <label htmlFor="Precio">Precio</label>
                <input className='formUploadInputs' name="precio" id="precio" onChange={precioChangeHandler}/>
                <label htmlFor="Descripcion">Descripcion</label>
                <input className='formUploadInputs' name="descripcion" id="descripcion" onChange={descChangeHandler}/>
                <label htmlFor="NuevoIngreso">Nuevo Ingreso?</label>
                <input type='radio' value='si' className='formUploadInputs' name="nuevoIngreso" id="nuevoIngreso" onChange={NIChangeHandler}/> Si
                <input type='radio' value='no' className='formUploadInputs' name="nuevoIngreso" id="nuevoIngreso" onChange={NIChangeHandler}/> No
                <label htmlFor='file'>Imagen</label>
                <input className='formUploadInputs' multiple id='file' type='file' onChange={(e) => setFile(e.target.files)} />
                <button id='btnSubirProd'>Subir</button>
            </form>
        </div>
    )
}

export default UploadItem