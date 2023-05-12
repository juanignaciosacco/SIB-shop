import './ItemCard.css';
import { Link } from 'react-router-dom';
import EditItem from '../EditItem/EditItem';

const ItemCard = ({ producto, isLogged }) => {
  
  return (
    <div className="item-card-container" id={producto.id}>
      <img className="item-image" src={producto.picture_url} alt={producto.title} />
      <h3 className="item-title">{producto.title}</h3>
      <p className="item-price">${producto.price}</p>
        {producto.Stock === '0' && (
          <div className='prodSinStock'>
            <p>Agotado!</p>
          </div>
        )}
      {isLogged ? (
        <EditItem producto={producto} />
      ):(
        <div className="user-options">
          <Link to={`/tienda/producto/${producto.id}`}>
            <button className="user-button buy">Ver detalle</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
