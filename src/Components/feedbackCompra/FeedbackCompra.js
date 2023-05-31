import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CartContext } from "../../Contextos/CartContext";
import { initMercadoPago } from '@mercadopago/sdk-react'
initMercadoPago('TEST-443c3bde-e5e1-4b01-ad74-2c6fcb9da46c');

const FeedbackCompra = () => {

    const [searchParams] = useSearchParams()
    const [paymentId, setPaymentId] = useState()
    const [orderStatus, setOrderStatus] = useState()
    const [orderId, setOrderId] = useState()

    const { precioTotal } = useContext(CartContext)

    const db = getFirestore()
    const ordenesCollection = collection(db, 'ordenes')
    
    useEffect(() => {
        setPaymentId(searchParams.get('payment_id'))
        setOrderStatus(searchParams.get('status'))
        setOrderId(searchParams.get('preference_id'))
      }, [searchParams]);
    
      useEffect(() => {
        fetch(`https://api.mercadopago.com/checkout/preferences/${orderId}`)
        .then((res) => {return res.json()})
        .then((ress) => console.log(ress))

        orderStatus === "approved" && (
            setDoc(doc(ordenesCollection), {
                idPago: paymentId,
                idOrden: orderId,
                totalPrice: precioTotal
            })
        )
        // eslint-disable-next-line
      }, [orderStatus, paymentId])

    return (
        <div>
            <p>Payment ID: {paymentId}</p>
            <p>Estado de compra: {orderStatus}</p>
        </div>
    )
}

export default FeedbackCompra;