import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const FeedbackCompra = () => {

    const [searchParams] = useSearchParams()
    const [paymentId, setPaymentId] = useState()
    const [orderStatus, setOrderStatus] = useState()
    
    useEffect(() => {
        setPaymentId(searchParams.get('payment_id'))
        setOrderStatus(searchParams.get('status'))
      }, [searchParams]);
    

    return (
        <div>
            <p>Payment ID: {paymentId}</p>
            <p>Estado de compra: {orderStatus}</p>
        </div>
    )
}

export default FeedbackCompra;