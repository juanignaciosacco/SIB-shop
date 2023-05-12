import './UploadItem.css'
import { getFirestore, doc, collection, setDoc } from "firebase/firestore"
import { useState } from "react"
import { uploadFile } from '../../index'
import ColorStockInput from '../ColorStockInput/ColorStockInput'

const UploadItem = () => {

    const [nombreProd, setNombreProd] = useState('')
    const [precioProd, setPrecioProd] = useState('')
    const [categoriaProd, setCategoriaProd] = useState('')
    const [colores, setColores] = useState([{ color: "#ffffff", stock: "" }]);
    const [materialesProd, setMaterialesProd] = useState('')
    const [stockProd, setStockProd] = useState('')
    const [largo, setLargo] = useState('')
    const [ancho, setAncho] = useState('')
    const [ruedo, setRuedo] = useState('')
    const [NIProd, setNIProd] = useState()
    const [file, setFile] = useState()
    const db = getFirestore()
    const items2 = collection(db, 'productos')
    const [talles, setTalles] = useState([]);
    const tallesDisponibles = ["XS", "S", "M", "L", "XL"];
    

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

    const handleAddColor = (ev) => {
        ev.preventDefault()
        setColores([...colores, { color: "#ffffff", stock: "" }]);
        console.log(colores)
    }

    const handleColorChange = (index, newColorStock) => {
        setColores((prevColores) =>
        prevColores.map((colorStock, i) => (i === index ? newColorStock : colorStock))
        );
      }

    const handleDeleteColor = (index) => {
    setColores((prevColores) => prevColores.filter((_, i) => i !== index));
    }

    const handleTalleChange = (talle, stock) => {
        const newTalles = [...talles];
        const index = newTalles.findIndex((item) => item.talle === talle);
        if (index !== -1) {
          if (stock === undefined) {
            newTalles.splice(index, 1);
          } else {
            newTalles[index].stock = stock;
          }
        } else {
          newTalles.push({ talle, stock });
        }
        setTalles(newTalles);
      };

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
                title: nombreProd,
                price: precioProd,
                category_id: categoriaProd,
                Materiales: materialesProd,
                Stock: stockProd,
                Largo: largo,
                AnchoBusto: ancho,
                Ruedo: ruedo,
                NuevoIngreso: NIProd,
                Colores: colores,
                Talles: talles,
                picture_url: results
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
            <form className='form'>
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
                <label htmlFor='Talle'>Talle</label>
                <div className='talle'>
                    <div>
                        {tallesDisponibles.map((talle) => (
                        <div key={talle}>
                            <label>
                            <input type="checkbox" key={talle} value={talle} checked={talles.some((item) => item.talle === talle)} onChange={(e) => handleTalleChange
                                (
                                    e.target.value,
                                    e.target.checked ? 0 : undefined
                                )}/>
                            {talle}
                            </label>
                            {talles.some((item) => item.talle === talle) && (
                                <input type="number" placeholder='Stock' value={talles.find((item) => item.talle === talle)?.stock || ""} onChange={(e) => handleTalleChange( talle, Number(e.target.value))
                            }/>
                            )}
                        </div>
                        ))}
                    </div>
                    <div>
                        <input type='checkbox' value='talleUnico' name='talle'  />Talle unico
                    </div>
                </div>
                <label htmlFor='Colores'>Colores</label>
                <div>
                {colores.map((colorStock, index) => (
                    <div>
                        <ColorStockInput
                        key={index}
                        color={colorStock.color}
                        stock={colorStock.stock}
                        index={index}
                        onChange={(newColorStock) => handleColorChange(index, newColorStock)}
                        onDelete={handleDeleteColor}
                        />
                    </div>
                ))}
                <button onClick={handleAddColor}>Agregar color</button>
                </div>
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
                <button className='btnForm' onClick={handleSubmit}>Subir</button>
            </form>
        </div>
    )
}

export default UploadItem