import './ItemCart.css'
import ItemCount from '../ItemCount/ItemCount';

const ItemCart = ({imgUrl,talle, nombre, precio, id, stock}) => {
    return (
        <div className="itemCart">
            <div className='itemCartImg'>
                <img src={imgUrl} alt={`Imagen de ${nombre} en carrito`} />
            </div>
            <div>
                <h3>{nombre}</h3>
                <p>Precio: ${precio}</p>
                <p>Talle: {talle}</p>
                <ItemCount id={id} stock={stock} precio={precio}/>
            </div>
        </div>
    )
}

export default ItemCart;