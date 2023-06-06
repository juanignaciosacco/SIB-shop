import './Cart.css'
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ItemCart from "../ItemCart/ItemCart";
import { CartContext } from '../../Contextos/CartContext';
import { initMercadoPago } from '@mercadopago/sdk-react'
import Payment from '../PaymentSummary/Payment';
import ResumenDeCompra from '../ResumenDeCompra/ResumenDeCompra';

initMercadoPago('TEST-443c3bde-e5e1-4b01-ad74-2c6fcb9da46c');

const Cart = () => {

    const {productosAgregados, precioTotal, totalItems, clearAllItems, setPreferenceId, preferenceId } = useContext(CartContext)
    const [orderSummary, setOrderSummary] = useState({})
    const [pagoET, setPagoET] = useState(false)
    const [pagoMP, setPagoMP] = useState(false)
    
    useEffect(() => {
        setOrderSummary({quantity: parseInt(totalItems), price: parseInt(precioTotal) })
    }, [totalItems, precioTotal])
    
    const vaciarClickHandler = () => {
        clearAllItems()
    }

    const handleClickMP = () => {
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
          setPagoMP(true)
        })
        .catch((error) => {
          console.error(error);
        })
    };

    const handleClickET = () => {
        setPagoET(!pagoET)
        setPagoMP(false)
        setPreferenceId(null)
    }

    const handleClickCancel = () => {
        setPagoET(false)
        setPreferenceId(null)
        setPagoMP(false)
    }

    return (
        <div className='cartContainer'>
            <h1>Carrito</h1>
            <div id='cart'>
                {productosAgregados.length !== 0 ? (
                    <div className='cart'>
                        <div className='itemsInCart'>
                            {productosAgregados.map((prod, index) => (
                                <ItemCart producto={prod} key={index}/>
                            ))}
                        </div>
                        <div>
                            {!preferenceId ? (
                                <div>
                                <ResumenDeCompra pagoMP={pagoMP} pagoET={pagoET} onClickMP={handleClickMP} onClickET={handleClickET} onClickCancel={handleClickCancel} onClickVaciar={vaciarClickHandler}/>
                                </div>
                            ):(
                                <div className='pagoMP'>
                                    <ResumenDeCompra pagoMP={pagoMP} pagoET={pagoET} onClickMP={handleClickMP} onClickET={handleClickET} onClickCancel={handleClickCancel} onClickVaciar={vaciarClickHandler}/>
                                    <Payment />
                                    <button className='btn' onClick={handleClickCancel}>Cancelar</button>
                                </div>
                            )}
                        </div>
                    </div>
                ):(
                    <div className='emptyCart'>
                        <h2>No tienes Items en el carrito</h2>
                        <button className='btn'><Link to={'/tienda'}>Ir a la tienda</Link></button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart;
