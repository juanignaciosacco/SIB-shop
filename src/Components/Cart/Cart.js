import './Cart.css'
import { useContext } from 'react';
import ItemCart from "../ItemCart/ItemCart";
import { CartContext } from '../../Contextos/CartContext';

const Cart = () => {

    const {productosAgregados, precioTotal, totalItems, clearAllItems} = useContext(CartContext)


    const vaciarClickHandler = () => {
        clearAllItems()
    }

    return (
        <div className='cartContainer'>
            <h1>Carrito</h1>
            <div id="cart">
                {productosAgregados.length !== 0 ? (
                    <div className='itemsInCart'>
                        {productosAgregados.map((prod) => (
                            <ItemCart id={prod.id} imgUrl={prod.imgUrl} nombre={prod.Nombre} precio={prod.Precio} stock={prod.Stock} key={prod.id}/>
                        ))}
                    </div>
                ):(
                    <div>
                        <h2>No tienes Items en el carrito</h2>
                    </div>
                )}
                <div id='cartInfo'>
                    <h3>Informacion del Carrito</h3>
                    <p>Cantidad de productos: {totalItems}</p>
                    <p>Precio total: ${precioTotal}</p>
                    <button>Continuar</button>
                    <button onClick={vaciarClickHandler}>Vaciar carrito</button>
                </div>
            </div>
        </div>
    )
}

export default Cart;