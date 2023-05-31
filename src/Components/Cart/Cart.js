import './Cart.css'
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ItemCart from "../ItemCart/ItemCart";
import { CartContext } from '../../Contextos/CartContext';
import { initMercadoPago } from '@mercadopago/sdk-react'
import Payment from '../PaymentSummary/Payment';

initMercadoPago('TEST-443c3bde-e5e1-4b01-ad74-2c6fcb9da46c');

const Cart = () => {

    const {productosAgregados, precioTotal, totalItems, clearAllItems, setPreferenceId, preferenceId } = useContext(CartContext)
    const [orderSummary, setOrderSummary] = useState({})
    
    useEffect(() => {
        setOrderSummary({quantity: parseInt(totalItems), price: parseInt(precioTotal) })
    }, [totalItems, precioTotal])

    useEffect(() => {
        console.log(productosAgregados)
    })
    
    const vaciarClickHandler = () => {
        clearAllItems()
    }

    const handleClick = () => {
      fetch("http://localhost:8080/create_preference", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
                body: JSON.stringify(orderSummary),
      })
      .then((response) => {
          return response.json();
        })
        .then((preference) => {
          setPreferenceId(preference.id);
        })
        .catch((error) => {
          console.error(error);
        })
    };

    return (
        <div className='cartContainer'>
            <h1>Carrito</h1>
            <div id="cart">
                {productosAgregados.length !== 0 ? (
                    <div className='itemsInCart'>
                        {productosAgregados.map((prod, index) => (
                            <ItemCart producto={prod} key={index}/>
                        ))}
                    </div>
                ):(
                    <div className='emptyCart'>
                        <h2>No tienes Items en el carrito</h2>
                        <button className='btn'><Link to={'/tienda'}>Ir a la tienda</Link></button>
                    </div>
                )}
                {!preferenceId ? (
                    <div id='cartInfo'>
                        <h3>Informacion del Carrito</h3>
                        <p>Cantidad de productos: {totalItems}</p>
                        <p>Precio total: ${precioTotal}</p>
                        <button className='btn' id='btnCheckout' onClick={handleClick}>Finalizar compra</button>
                        <button className='btn' onClick={vaciarClickHandler}>Vaciar carrito</button>
                    </div>
                ):(
                    <Payment />
                )}
            </div>
        </div>
    )
}

export default Cart;
