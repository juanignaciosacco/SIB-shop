import './UploadItem.css'
import { getFirestore, doc, collection, setDoc } from "firebase/firestore"
import { useState } from "react"
import { uploadFile } from '../../index'

const UploadItem = () => {

    const [nombreProd, setNombreProd] = useState('')
    const [precioProd, setPrecioProd] = useState('')
    const [categoriaProd, setCategoriaProd] = useState('')
    const [materialesProd, setMaterialesProd] = useState('')
    const [stockProd, setStockProd] = useState('')
    const [largo, setLargo] = useState('')
    const [ancho, setAncho] = useState('')
    const [ruedo, setRuedo] = useState('')
    const [NIProd, setNIProd] = useState()
    const [file, setFile] = useState()
    const db = getFirestore()
    const items2 = collection(db, 'productos')

    const nombreChangeHandler = (ev) => {
        setNombreProd(ev.target.value)
    }

    const precioChangeHandler = (ev) => {
        setPrecioProd(ev.target.value)
    }

    const categoriaChangeHandler = (ev) => {
        setCategoriaProd(ev.target.value)
    }
    const stockChangeHandler = (ev) => {
        setStockProd(ev.target.value)
    }

    const materialesChangeHandler = (ev) => {
        setMaterialesProd(ev.target.value)
    }

    const largoChangeHandler = (ev) => {
        setLargo(ev.target.value)
    }

    const anchoBustoChangeHandler = (ev) => {
        setAncho(ev.target.value)
    }

    const ruedoChangeHandler = (ev) => {
        setRuedo(ev.target.value)
    }

    const NIChangeHandler = (ev) => {
        setNIProd(ev.target.value)
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault()
        var results = []
        try {
            for (const i of file) {
                results.push(await uploadFile(i))
            }
        } catch (error) {
            alert('Fallo interno, avisale a juanchi ', error)
        }
            setDoc(doc(items2), {
                Nombre: nombreProd,
                Precio: precioProd,
                Categoria: categoriaProd,
                Materiales: materialesProd,
                Stock: stockProd,
                Largo: largo,
                AnchoBusto: ancho,
                Ruedo: ruedo,
                NuevoIngreso: NIProd,
                imgUrl: results
            })
            setPrecioProd('')
            setNombreProd('')
            setStockProd('')
            setMaterialesProd('')
            setAncho('')
            setLargo('')
            setRuedo('')
    }

    return (
        <div className="formUpload">
            <form onSubmit={handleSubmit} className='form'>
                <label htmlFor="Titulo">Titulo</label>
                <input className='formInputs' name="titulo" id="titulo" onChange={nombreChangeHandler} value={nombreProd}/>
                <label htmlFor="Precio">Precio</label>
                <input className='formInputs' name="precio" id="precio" onChange={precioChangeHandler} value={precioProd}/>
                <label htmlFor="Stock">Stock</label>
                <input className='formInputs' name="stock" id="stock" onChange={stockChangeHandler} value={stockProd}/>
                <label htmlFor='Categoria'>Categoria</label>
                <select className='formInputs' name='categoria' id='categoria' onChange={categoriaChangeHandler}>
                    <option value='SweatersYBuzos' id='SweatersYBuzos'>Sweaters y buzos</option>
                    <option value='Camisas' id='Camisas'>Camisas</option>
                    <option value='RemerasYTops' id='RemerasYTops'>Remeras y tops</option>''
                </select>
                <label htmlFor="Materiales">Materiales</label>
                <input className='formInputs' name="materiales" id="materiales" onChange={materialesChangeHandler} value={materialesProd}/>
                <label htmlFor='Medidas'>Medidas</label>
                <input className='formInputs' name="medidas" id="largo" onChange={largoChangeHandler} placeholder='Largo' value={largo}/>
                <input className='formInputs' name="medidas" id="anchoBusto" onChange={anchoBustoChangeHandler} placeholder='Ancho Busto' value={ancho}/>
                <input className='formInputs' name="medidas" id="ruedo" onChange={ruedoChangeHandler} placeholder='Ruedo' value={ruedo}/>
                <label htmlFor="NuevoIngreso">Nuevo Ingreso?</label>
                <div className="radio">
                    <input type='radio' value='si' name="nuevoIngreso" id="nuevoIngreso" onChange={NIChangeHandler}/> Si
                    <input type='radio' value='no' name="nuevoIngreso" id="nuevoIngreso" onChange={NIChangeHandler}/> No
                </div>
                <label htmlFor='file'>Imagen</label>
                <input className='formUploadInputs' multiple id='file' type='file' onChange={(e) => setFile(e.target.files)} />
                <button className='btnForm'>Subir</button>
            </form>
        </div>
    )
}

export default UploadItem