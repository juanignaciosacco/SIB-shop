import React from 'react';
import './ItemCard.css';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';


const ItemCard = ({ image, title, description, price, isLogged, id }) => {
  
const db = getFirestore()

const handleDelete = () => {
  // let idToDelete = ev.target.parentElement.parentElement.id
  deleteDoc(doc(db, 'productos', id))

}

const handleEdit = (ev) => {

}


  return (

    <div className="item-card-container" id={id}>
      <img className="item-image" src={image} alt={title} />
      <h3 className="item-title">{title}</h3>
      <p className="item-description">{description}</p>
      <p className="item-price">${price}</p>
      {isLogged && (
        <div className="admin-options">
          <button className="admin-button edit" onClick={handleEdit}>Editar</button>
          <button className="admin-button delete" onClick={handleDelete}>Eliminar</button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
