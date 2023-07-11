import './FeedbackCompra.css'
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

const FeedbackCompra = () => {

    const [searchParams] = useSearchParams()
    const [paymentId, setPaymentId] = useState()
    const [orderStatus, setOrderStatus] = useState()
    const [orderId, setOrderId] = useState()
    const [userInfo, setUserInfo] = useState({})

    const db = getFirestore()
    const ordenesCollection = collection(db, 'ordenes')
    
    useEffect(() => {
        setPaymentId(searchParams.get('payment_id'))
        setOrderStatus(searchParams.get('status'))
        setOrderId(searchParams.get('preference_id'))
      }, [searchParams]);
    
      useEffect(() => {
        const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'))
        const dirUsuario = JSON.parse(localStorage.getItem('direccionUsuario'))
        const infoTotalUsu = Object.assign(infoUsuario, dirUsuario)
        infoTotalUsu && setUserInfo(infoTotalUsu)
        if (orderStatus === "approved") {
            setDoc(doc(ordenesCollection), {
                usuario: userInfo,
                idPago: paymentId,
                idOrden: orderId
            })
        }
        // eslint-disable-next-line
      }, [orderStatus, paymentId])

    return (
        <div className="feedback">
            <div>
                {orderStatus === "approved" ? <i className='check'><FontAwesomeIcon icon={faCircleCheck} /></i> : <i className='denied'><FontAwesomeIcon icon={faCircleXmark} /></i>}
            </div>
            <div>
                {console.log(userInfo)}
                <h3>Informacion Personal:</h3>
                <p><b>Nombre:</b> {userInfo.nombre}</p>
                <p><b>Apellido:</b> {userInfo.apellido}</p>
                <p><b>Email:</b> {userInfo.email}</p>
                <p><b>Telefono:</b> {userInfo.telefono}</p>
                <p><b>Direccion:</b> {userInfo.calles}</p>
                <p><b>Localidad:</b> {userInfo.localidad}</p>
                <p><b>Número:</b> {userInfo.numero}</p>
            </div>
            <div>
                <h3>Informacion Compra:</h3>
                <p><b>Payment ID:</b> {paymentId}</p>
                <p><b>Estado de compra:</b> {orderStatus === "approved" ? "Aprovada" : "Denegada"}</p>
            </div>
            <div>
                <Link to={"/"}><button className='btn'>Volver</button></Link>
            </div>
        </div>
    )
}

export default FeedbackCompra;