import './Cart.css'
import { useContext, useEffect, useState } from 'react';
import ItemCart from "../ItemCart/ItemCart";
import { CartContext } from '../../Contextos/CartContext';
import { initMercadoPago } from '@mercadopago/sdk-react'
import Payment from '../PaymentSummary/Payment';

initMercadoPago('TEST-443c3bde-e5e1-4b01-ad74-2c6fcb9da46c');

const Cart = () => {

    const {productosAgregados, precioTotal, totalItems, clearAllItems, setPreferenceId, preferenceId } = useContext(CartContext)

    const [orderSummary, setOrderSummary] = useState({})
    
    useEffect(() => {
        setOrderSummary({quantity: parseInt(totalItems), price: precioTotal})
    }, [totalItems, precioTotal])
    
    const vaciarClickHandler = () => {
        clearAllItems()
    }

    const handleClick = () => {
        console.log(JSON.stringify(orderSummary))
      fetch("http://localhost:8080/create_preference", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
                body: JSON.stringify(orderSummary),
      })
        .then((response) => {
            console.log('Chau')
          return response.json();
        })
        .then((preference) => {
            console.log('HOla')
          setPreferenceId(preference.id);
        })
        .catch((error) => {
            alert('Noooo')
          console.error(error);
        })
    };

    return (
        <div className='cartContainer'>
            <h1>Carrito</h1>
            <div id="cart">
                {productosAgregados.length !== 0 ? (
                    <div className='itemsInCart'>
                        {productosAgregados.map((prod) => (
                            <ItemCart id={prod.id} imgUrl={prod.picture_url} nombre={prod.title} precio={prod.price} stock={prod.Stock} key={prod.id}/>
                        ))}
                    </div>
                ):(
                    <div>
                        <h2>No tienes Items en el carrito</h2>
                    </div>
                )}
                {!preferenceId ? (
                    <div id='cartInfo'>
                        <h3>Informacion del Carrito</h3>
                        <p>Cantidad de productos: {totalItems}</p>
                        <p>Precio total: ${precioTotal}</p>
                        {/* <Wallet initialization={{ preferenceId: 'btnComprarMP' }} /> */}
                        <button id='btnCheckout' onClick={handleClick}>Continuar con la compra</button>
                        <button onClick={vaciarClickHandler}>Vaciar carrito</button>
                    </div>
                ):(
                    <Payment />
                )}
            </div>
        </div>
    )
}

export default Cart;
