import { useState } from "react"
import { deleteDoc, doc, getFirestore, updateDoc, collection } from 'firebase/firestore'
import { uploadFile, deletFile } from "../../index"
import ColorInput from "../ColorInput/ColorInput"

const EditItem = ({ producto }) => {

    const [prodEdit, setProdEdit] = useState({
        nombreProdEdit: '',
        precioProdEdit: '',
        categoriaProdEdit: '',
        materialesProdEdit: '',
        stockProd: '',
        largoEdit: '',
        anchoEdit: '',
        ruedoEdit: '',
        NIProd: ''
    })
    const { nombreProdEdit, precioProdEdit, categoriaProdEdit, stockProd, materialesProdEdit, largoEdit, anchoEdit, ruedoEdit, NIProd } = prodEdit

    const [isEditing, setEditing] = useState()
    const [file, setFile] = useState([])
    const [files, setFiles] = useState(producto.picture_url)
    const db = getFirestore()
    const items2 = collection(db, 'productos')
    const [colors, setColors] = useState(producto.Colores);

    const inputChangeHandler = ({target: {name, value}}) => {
        setProdEdit({
            ...prodEdit,
            [name]: value
        })
    }

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

    const handleDelete = () => {
        var results = producto.picture_url
        for (const i of results) {
            deletFile(i)
        }
        deleteDoc(doc(db, 'productos', producto.id))
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
        } catch (error) {
            throw error;
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
                {isEditing ? (<button className="admin-button edit" onClick={handleEdit}>No editar mas</button>) : (<button className="admin-button edit" onClick={handleEdit}>Editar</button>)}
                <button className="admin-button delete" onClick={handleDelete}>Eliminar</button>
                {isEditing && (
                    <form onSubmit={updateProduct} className='formEdit'>
                        <label htmlFor='nombreProdEdit'>Nombre</label>
                        <input name='nombreProdEdit' id='nombreProdEdit' onChange={inputChangeHandler} />
                        <label htmlFor='precioProdEdit'>Precio</label>
                        <input name='precioProdEdit' id='precioProdEdit' onChange={inputChangeHandler} />
                        <label htmlFor="Stock">Stock</label>
                        <input name="stockProd" id="stockProd" onChange={inputChangeHandler} value={stockProd} />
                        <label htmlFor='CategoriaProdEdit'>Categoria</label>
                        <select name='categoriaProdEdit' id='categoriaProdEdit' onChange={inputChangeHandler}>
                            <option value='SweatersYBuzos' id='SweatersYBuzos'>Sweaters y buzos</option>
                            <option value='Camisas' id='Camisas'>Camisas</option>
                            <option value='RemerasYTops' id='RemerasYTops'>Remeras y tops</option>
                            <option value='Bikinis' id='Bikinis'>Bikinis</option>
                            <option value='Accesorios' id='Accesorios'>Accesorios</option>
                        </select>
                        <label htmlFor='Colores'>Colores</label>
                        <div>
                            <ColorInput onSelectColor={handleColorSelect} onColorDelete={handleColorDelete} />
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
                        <label htmlFor='materialesProdEdit'>Materiales</label>
                        <input name='materialesProdEdit' id='materialesProdEdit' onChange={inputChangeHandler} />
                        <label htmlFor='Medidas'>Medidas</label>
                        <input name="medidas" id="largo" onChange={inputChangeHandler} placeholder='Largo' />
                        <input name="medidas" id="anchoBusto" onChange={inputChangeHandler} placeholder='Ancho Busto' />
                        <input name="medidas" id="ruedo" onChange={inputChangeHandler} placeholder='Ruedo' />
                        <label htmlFor="NuevoIngreso">Nuevo Ingreso?</label>
                        <div>
                            <input type='radio' value={'si'} className='formUploadInputs' name="nuevoIngreso" id="nuevoIngreso" onChange={inputChangeHandler} /> Si
                            <input type='radio' value={'no'} className='formUploadInputs' name="nuevoIngreso" id="nuevoIngreso" onChange={inputChangeHandler} /> No
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