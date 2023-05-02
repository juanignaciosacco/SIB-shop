import React, { useState } from 'react';
import './ItemCard.css';
import { deleteDoc, doc, getFirestore, updateDoc, collection } from 'firebase/firestore';
import { Link } from 'react-router-dom';


const ItemCard = ({ image, title, price, isLogged, id }) => {
  
  const [isEditing, setEditing] = useState()
  const [nombreProdEdit, setNombreProd] = useState()
  const [precioProdEdit, setPrecioProd] = useState()
  const [categoriaProdEdit, setCategoriaProd] = useState()
  const [materialesProdEdit, setMaterialesProd] = useState()
  const [largoEdit, setLargoEdit] = useState()
  const [anchoEdit, setAnchoEdit] = useState()
  const [ruedoEdit, setRuedoEdit] = useState()
  const [NIProd, setNIProd] = useState()
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

  const materialesChangeHandler = (ev) => {
      setMaterialesProd(ev.target.value)
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
    deleteDoc(doc(db, 'productos', id))
  }

  const handleEdit = () => {
    setEditing(true)
    isEditing && setEditing(false)
  }
  
  const updateProduct = (ev) => {
    ev.preventDefault()
    const producto = doc(items2, `${id}`)
    updateDoc(producto, {
      Nombre: nombreProdEdit,
      Precio: precioProdEdit,
      Categoria: categoriaProdEdit,
      Materiales: materialesProdEdit,
      Largo: largoEdit,
      AnchoBusto: anchoEdit,
      Ruedo: ruedoEdit,
      NuevoIngreso: NIProd
    })
    setEditing(false)
  }

  return (
    <div className="item-card-container" id={id}>
      <img className="item-image" src={image} alt={title} />
      <h3 className="item-title">{title}</h3>
      <p className="item-price">${price}</p>
      {isLogged ? (
        <div className="admin-options">
          {isEditing ? ( <button className="admin-button edit" onClick={handleEdit}>No editar mas</button>) : ( <button className="admin-button edit" onClick={handleEdit}>Editar</button>)}
          <button className="admin-button delete" onClick={handleDelete}>Eliminar</button>
          {isEditing && (
            <form onSubmit={updateProduct} className='formEdit'>
              <label htmlFor='nombre'>Nombre</label>
              <input name='nombre' id='nombre' onChange={nombreChangeHandler} />
              <label htmlFor='precio'>Precio</label>
              <input name='precio' id='precio' onChange={precioChangeHandler} />
              <label htmlFor='Categoria'>Categoria</label>
              <select name='categoria' id='categoria' onChange={categoriaChangeHandler}>
                    <option value='SweatersYBuzos' id='SweatersYBuzos'>Sweaters y buzos</option>
                    <option value='Camisas' id='Camisas'>Camisas</option>
                    <option value='RemerasYTops' id='RemerasYTops'>Remeras y tops</option>
                </select>
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
              <button>Actualizar</button>
            </form>
          )}
        </div>
      ):(
        <div className="user-options">
          <Link to={`/tienda/producto/${id}`}>
            <button className="user-button buy">Ver detalle</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
