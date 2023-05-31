import './ItemCart.css'
import ItemCount from '../ItemCount/ItemCount';

const ItemCart = ({ producto }) => {
    
    return (
        <div className="itemCart">
            <div className='itemCartImg'>
                <img src={producto.picture_url[producto.imageIndx]} alt={`Imagen de ${producto.title} en carrito`} />
            </div>
            <div>
                <h3>{producto.title}</h3>
                <p>Precio: ${producto.price}</p>
                <p>Talle: {producto.TalleSelec}</p>
                <p>Color: </p>
                <div className='colorDivItemCart' style={{backgroundColor: `${producto.ColorSelec}`}}></div>
                <ItemCount producto={producto}/>
            </div>
        </div>
    )
}

export default ItemCart;