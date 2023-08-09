import './FeedbackCompra.css'
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { CartContext } from '../../Contextos/CartContext';
import { v4 } from 'uuid';

const FeedbackCompra = () => {
    // eslint-disable-next-line
    const prodsSinSTock = [];
    const { productosAgregados } = useContext(CartContext)
    const [searchParams] = useSearchParams()
    const [paymentId, setPaymentId] = useState()
    const [orderStatus, setOrderStatus] = useState()
    const [orderId, setOrderId] = useState()
    const [userInfo, setUserInfo] = useState({})
    const [mailOrderInfoConfig, setMailOrderInfoConfig] = useState({})
    const [productos, setProductos] = useState([])
    const { compraEf } = useParams();

    const db = getFirestore()
    const ordenesCollection = collection(db, 'ordenes')

    useEffect(() => {
        setProductos(JSON.parse(localStorage.getItem('productosAgregados')))
    }, [productosAgregados])

    useEffect(() => {
        productos.forEach((prod) => {
            for (const i of prod.Colores) {
                for(const j in i.sizes) {
                   if (i.sizes[j] <= 1) {
                    prodsSinSTock.push({
                        nombreProdSinStock: prod.title,
                        colorProdSinStock: i.color,
                        talleProdSinStock: Object.keys(i.sizes),
                        stockProdSinStock: i.sizes[j]
                    })
                   }
                }
            }
        })
    // eslint-disable-next-line
    }, [productos])

    useEffect(() => {
        if (prodsSinSTock.length > 0) {
            fetch("http://localhost:8080/sin_stock", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(prodsSinSTock)
            }).then((response) => {
                return response.json();
            }).catch((error) => {
                console.error(error);
            })
        }
    }, [prodsSinSTock])

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
                idOrden: orderId,
                ordenEntregada: false,
                productos: productos,
                pago: "Mercadopago",
                estadoDePago: "Confirmado"
            }).catch((error) => {
                console.log(error)
            })
            setMailOrderInfoConfig({
                userMailName: userInfo.nombre,
                userMailLastname: userInfo.apellido,
                userMail: userInfo.email,
                userPhone: userInfo.telefono,
                userAdress: userInfo.calles,
                userState: userInfo.localidad,
                userAdressNumber: userInfo.numero,
                tipoDeEnvio: userInfo.tipoDeEnvio,
                userPaymentId: paymentId
            })
        }
        // eslint-disable-next-line
    }, [orderStatus, paymentId])

    useEffect(() => {
        const infoUsuario = JSON.parse(localStorage.getItem('infoUsuario'))
        const dirUsuario = JSON.parse(localStorage.getItem('direccionUsuario'))
        const infoTotalUsu = Object.assign(infoUsuario, dirUsuario)
        if (compraEf === "true" && productos.length > 0) {
            console.log('Hola')
            setDoc(doc(ordenesCollection), {
                usuario: infoTotalUsu,
                idOrden: v4(),
                ordenEntregada: false,
                productos: productos,
                pago: "Efectivo, Transferencia",
                estadoDePago: "Pendiente"
            }).catch((error) => {
                console.log(error)
            })
        }
        // eslint-disable-next-line
    }, [compraEf, productos])

    useEffect(() => {
        if (orderStatus === 'approved' && Object.keys(mailOrderInfoConfig).length > 0) {
            // fetch("https://backend.sib.com.uy/feedback", {
            fetch("http://localhost:8080/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(mailOrderInfoConfig)
            }).then((response) => {
                return response.json();
            }).catch((error) => {
                console.error(error);
            })
        }
    }, [mailOrderInfoConfig, orderStatus])


    return (
        <div className="feedback">
            <div>
                {orderStatus === "approved" ? <i className='check'><FontAwesomeIcon icon={faCircleCheck} /></i> : compraEf === "true" ? <i className='pending'><FontAwesomeIcon icon={faSpinner} /></i> : <i className='denied'><FontAwesomeIcon icon={faCircleXmark} /></i>}
            </div>
            <div>
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
                {orderStatus === "approved" ? <p><b>Payment ID:</b> {paymentId}</p> : ""}
                <p><b>Estado de compra:</b> {orderStatus === "approved" ? "Aprovada" : compraEf === "true" ? "Pendiente" : "Denegada"}</p>
            </div>
            <div>
                <Link to={"/"}><button className='btn'>Volver</button></Link>
            </div>
        </div>
    )
}

export default FeedbackCompra;

