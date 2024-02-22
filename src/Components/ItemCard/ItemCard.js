import './ItemCard.css';
import { Link } from 'react-router-dom';
import EditItem from '../EditItem/EditItem';

const ItemCard = ({ producto, isLogged }) => {

  return (
    <div className="item-card-container"
      id={
        producto.idProduct
      }>
      <img className="item-image"
        src={
          producto.imgUrl[0].imgUrl
        }
        alt={
          producto.nombreProd
        } />
      <h3 className="item-title">
        {
          producto.nombreProd
        }</h3>
      <p className="item-price">${
        producto.precioProd
      }</p>
      {
        isLogged ? (
          <EditItem producto={producto} />
        ) : (
          <div className="user-options">
            <Link to={
              `/tienda/producto/${producto.id
              }`
            }>
              <button className="btn">Ver detalle</button>
            </Link>
          </div>
        )
      } </div>
  );
};

export default ItemCard;
