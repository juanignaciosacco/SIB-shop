import React, { useState } from 'react';
import './ItemCard.css';
import { deleteDoc, doc, getFirestore, updateDoc, collection } from 'firebase/firestore';


const ItemCard = ({ image, title, description, price, isLogged, id }) => {
  
  const [isEditing, setEditing] = useState()
  const [nombreProdEdit, setNombreProd] = useState()
  const [precioProdEdit, setPrecioProd] = useState()
  const [descProdEdit, setDescProd] = useState()
  const [NIProd, setNIProd] = useState()
  const db = getFirestore()
  const items2 = collection(db, 'productos')

  const nombreChangeHandler = (ev) => {
    setNombreProd(ev.target.value)
  }

  const precioChangeHandler = (ev) => {
    setPrecioProd(ev.target.value)
  }

  const descripcionChangeHandler = (ev) => {
      setDescProd(ev.target.value)
  }

  const NIChangeHandler = (ev) => {
    setNIProd(ev.target.value)
}

  const handleDelete = () => {
    deleteDoc(doc(db, 'productos', id))
  }

  const handleEdit = () => {
    setEditing(true)
  }
  

  const updateProduct = (ev) => {
    ev.preventDefault()
    const producto = doc(items2, `${id}`)
    updateDoc(producto, {
      Nombre: nombreProdEdit,
      Precio: precioProdEdit,
      Descripcion: descProdEdit,
      NuevoIngreso: NIProd
    })
    setEditing(false)
  }

  const handleBuy = () => {

  }


  return (

    <div className="item-card-container" id={id}>
      <img className="item-image" src={image} alt={title} />
      <h3 className="item-title">{title}</h3>
      <p className="item-description">{description}</p>
      <p className="item-price">${price}</p>
      {isLogged ? (
        <div className="admin-options">
          <button className="admin-button edit" onClick={handleEdit}>Editar</button>
          <button className="admin-button delete" onClick={handleDelete}>Eliminar</button>
          {isEditing && (
            <form onSubmit={updateProduct}>
              <label htmlFor='nombre'>Nombre</label>
              <input name='nombre' id='nombre' onChange={nombreChangeHandler} />
              <label htmlFor='precio'>Precio</label>
              <input name='precio' id='precio' onChange={precioChangeHandler} />
              <label htmlFor='descripcion'>Descripcion</label>
              <input name='descripcion' id='descripcion' onChange={descripcionChangeHandler} />
              <label htmlFor="NuevoIngreso">Nuevo Ingreso?</label>
                <input type='radio' value={true} className='formUploadInputs' name="nuevoIngreso" id="nuevoIngreso" onChange={NIChangeHandler}/> Si
                <input type='radio' value={false} className='formUploadInputs' name="nuevoIngreso" id="nuevoIngreso" onChange={NIChangeHandler}/> No
              <button>Actualizar</button>
            </form>
          )}
        </div>
      ):(
        <div className="user-options">
          <button className="user-button buy" onClick={handleBuy}>Ver detalle</button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
