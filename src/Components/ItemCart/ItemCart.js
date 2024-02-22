import './ItemCart.css'
import ItemCount from '../ItemCount/ItemCount';
import { useEffect } from 'react';

const ItemCart = ({ producto }) => {

    useEffect(() => {
        console.log(producto)
    }, [producto])

    return (
        <div className="itemCart">
            <div className='itemCartImg'>
                <img src={producto.imgUrl[producto.imageIndx].imgUrl} alt={`Imagen de ${producto.title} en carrito`} />
            </div>
            <div>
                <h3>{producto.nombreProd}</h3>
                <p>Precio: ${producto.precioProd}</p>
                <p>Talle: {producto.talleProd}</p>
                <p>Color: </p>
                <div className='colorDivItemCart' style={{ backgroundColor: `${producto.colorProd}` }}></div>
                <ItemCount producto={producto} />
            </div>
        </div>
    )
}

export default ItemCart;