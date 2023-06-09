import { useState } from "react"
import { deleteDoc, doc, getFirestore, updateDoc, collection } from 'firebase/firestore'
import { uploadFile, deletFile } from "../../index"
import ColorInput from "../ColorInput/ColorInput"

const EditItem = ({ producto }) => {

    const [isEditing, setEditing] = useState()
    const [nombreProdEdit, setNombreProd] = useState(producto.title)
    const [precioProdEdit, setPrecioProd] = useState(producto.price)
    const [categoriaProdEdit, setCategoriaProd] = useState(producto.category_id)
    const [materialesProdEdit, setMaterialesProd] = useState(producto.Materiales)
    const [stockProd, setStockProd] = useState(producto.Stock)
    const [largoEdit, setLargoEdit] = useState(producto.Largo)
    const [anchoEdit, setAnchoEdit] = useState(producto.AnchoBusto)
    const [ruedoEdit, setRuedoEdit] = useState(producto.Ruedo)
    const [NIProd, setNIProd] = useState(producto.NuevoIngreso)
    const [file, setFile] = useState([])
    const [files, setFiles] = useState(producto.picture_url)
    const [talles, setTalles] = useState(producto.Talles);
    const tallesDisponibles = ["XS", "S", "M", "L", "XL"];
    const db = getFirestore()
    const items2 = collection(db, 'productos')
    const [colors, setColors] = useState(producto.Colores);

    const handleColorSelect = (colorItem) => {
      setColors((prevColors) => [...prevColors, colorItem]);
    };
  
    const handleColorDelete = (index, event) => {
        event.preventDefault()
      setColors((prevColors) => {
        const updatedColors = [...prevColors];
        updatedColors.splice(index, 1);
        return updatedColors;
      });
    };

    const nombreChangeHandler = (ev) => {
        setNombreProd(ev.target.value)
    }
    
    const precioChangeHandler = (ev) => {
        setPrecioProd(ev.target.value)
    }

    const categoriaChangeHandler = (ev) => {
        setCategoriaProd(ev.target.value)
    }

    const materialesChangeHandler = (ev) => {
        setMaterialesProd(ev.target.value)
    }

    const stockChangeHandler = (ev) => {
        setStockProd(ev.target.value)
    }

    const largoChangeHandler = (ev) => {
        setLargoEdit(ev.target.value)
    }

    const anchoBustoChangeHandler = (ev) => {
        setAnchoEdit(ev.target.value)
    }

    const ruedoChangeHandler = (ev) => {
        setRuedoEdit(ev.target.value)
    }

    const NIChangeHandler = (ev) => {
        setNIProd(ev.target.value)
    }

    const handleDelete = () => {
        var results = producto.picture_url
        for (const i of results) {
            deletFile(i)
        }
        deleteDoc(doc(db, 'productos', producto.id))
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
    }

    const handleEdit = () => {
        setEditing(true)
        isEditing && setEditing(false)
    }

    const imgDeleteClickHandle = async (ev) => {
        const srcToDelete = ev.target.currentSrc
        var results = producto.picture_url
        try {
            await deletFile(srcToDelete)
            console.log('Exitoso')
        } catch (error) {
            console.log(error)
        }
        const newImages = files.filter(img => srcToDelete !== img)
        setFiles(newImages)
        for (const i of results) {
            if (i === srcToDelete) {
            const indexToSplice = (results.indexOf(i))
            results.splice(indexToSplice, 1)
            }
        }
        const prod = doc(items2, `${producto.id}`)
        updateDoc(prod, {
            Nombre: nombreProdEdit,
            Precio: precioProdEdit,
            Categoria: categoriaProdEdit,
            Talles: talles,
            Colores: colors,
            Materiales: materialesProdEdit,
            Largo: largoEdit,
            AnchoBusto: anchoEdit,
            Ruedo: ruedoEdit,
            picture_url: results,
            NuevoIngreso: NIProd
        })
    }
    
    const updateProduct = async (ev) => {
        ev.preventDefault()
        var results = producto.picture_url
        try {
            for (const i of file) {
                results.push(await uploadFile(i))
            }
            } catch (error) {
            alert('Fallo interno, avisale a juanchi ', error)
            }
        const prod = doc(items2, `${producto.id}`)
        
        updateDoc(prod, {
            Nombre: nombreProdEdit,
            Precio: precioProdEdit,
            Categoria: categoriaProdEdit,
            Talles: talles,
            Colores: colors,
            Materiales: materialesProdEdit,
            Largo: largoEdit,
            AnchoBusto: anchoEdit,
            Ruedo: ruedoEdit,
            picture_url: results,
            NuevoIngreso: NIProd
        })
        setEditing(false)
    }

    return (
        <div>
        <div className="admin-options">
          {isEditing ? ( <button className="admin-button edit" onClick={handleEdit}>No editar mas</button>) : ( <button className="admin-button edit" onClick={handleEdit}>Editar</button>)}
          <button className="admin-button delete" onClick={handleDelete}>Eliminar</button>
          {isEditing && (
            <form onSubmit={updateProduct} className='formEdit'>
              <label htmlFor='nombre'>Nombre</label>
              <input name='nombre' id='nombre' onChange={nombreChangeHandler} />
              <label htmlFor='precio'>Precio</label>
              <input name='precio' id='precio' onChange={precioChangeHandler} />
              <label htmlFor="Stock">Stock</label>
              <input name="stock" id="stock" onChange={stockChangeHandler} value={stockProd}/>
              <label htmlFor='Categoria'>Categoria</label>
              <select name='categoria' id='categoria' onChange={categoriaChangeHandler}>
                    <option value='SweatersYBuzos' id='SweatersYBuzos'>Sweaters y buzos</option>
                    <option value='Camisas' id='Camisas'>Camisas</option>
                    <option value='RemerasYTops' id='RemerasYTops'>Remeras y tops</option>
                    <option value='Bikinis' id='Bikinis'>Bikinis</option>
                    <option value='Accesorios' id='Accesorios'>Accesorios</option>
              </select>
              <label htmlFor='Talle'>Talle</label>
              <div>
                  {tallesDisponibles.map((talle) => (
                    <div key={talle}>
                        <label>
                        <input type="checkbox" key={talle.talle} value={talle} checked={talles.some((item) => item.talle === talle)} onChange={(e) => handleTalleChange
                            (
                                e.target.value,
                                e.target.checked ? 0 : undefined
                            )}/>
                        {talle}
                        </label>
                        {talles.some((item) => item.talle === talle) && (
                          // eslint-disable-next-line
                          <input type="number" placeholder='Stock' value={talles.find((item) => item.talle === 
                            talle) ?.stock || ""} onChange={(e) => handleTalleChange(talle, Number(e.target.value))
                        }/>
                        )}
                    </div>
                  ))}
              </div>
                <label htmlFor='Colores'>Colores</label>
                <div>
                <ColorInput onSelectColor={handleColorSelect} onColorDelete={handleColorDelete}/>
                    <h2>Colores seleccionados:</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {colors.map((colorItem, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
                            <div style={{ width: '30px', height: '30px', backgroundColor: colorItem.color, border: '1px solid black', marginRight: '5px' }}>
                            </div>
                            <button onClick={(event) => handleColorDelete(index, event)}>Eliminar</button>
                            <div>
                                Talles:
                                {Object.entries(colorItem.sizes).map(([size, stock]) => (
                                    <div key={size}>
                                        {size}, Stock: {stock}
                                    </div>
                                ))}
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
              <label htmlFor='materiales'>Materiales</label>
              <input name='materiales' id='materiales' onChange={materialesChangeHandler} />
              <label htmlFor='Medidas'>Medidas</label>
              <input name="medidas" id="largo" onChange={largoChangeHandler} placeholder='Largo'/>
              <input name="medidas" id="anchoBusto" onChange={anchoBustoChangeHandler} placeholder='Ancho Busto' />
              <input name="medidas" id="ruedo" onChange={ruedoChangeHandler} placeholder='Ruedo' />
              <label htmlFor="NuevoIngreso">Nuevo Ingreso?</label>
              <div>
                <input type='radio' value={'si'} className='formUploadInputs' name="nuevoIngreso" id="nuevoIngreso" onChange={NIChangeHandler}/> Si
                <input type='radio' value={'no'} className='formUploadInputs' name="nuevoIngreso" id="nuevoIngreso" onChange={NIChangeHandler}/> No
              </div>
              <label htmlFor='file'>Imagen</label>
              <div className='imgsMiniatura'>
                {files.map((img) => (
                  <img onClick={imgDeleteClickHandle} src={img} alt='Imagen minutra' />
                ))}
              </div>
              <input multiple id='file' type='file' onChange={(e) => setFile(e.target.files)} />
              <button>Actualizar</button>
            </form>
          )}
        </div>
        </div>
    )
}

export default EditItem;