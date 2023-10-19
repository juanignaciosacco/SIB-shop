import "./FeedbackCompra.css";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contextos/CartContext";
import { v4 } from "uuid";

const FeedbackCompra = () => {
  // eslint-disable-next-line
  let options = {};
  let prodsSinSTock = [];
  const { productosAgregados } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const [paymentId, setPaymentId] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const [orderId, setOrderId] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [mailOrderInfoConfig, setMailOrderInfoConfig] = useState({});
  const [mailOrderCashInfoConfig, setMailOrderCashInfoConfig] = useState({});
  const [productos, setProductos] = useState([]);
  const { compraEf } = useParams();
  const [data, setData] = useState();
  const [errors, setErrors] = useState();

  const db = getFirestore();
  const ordenesCollection = collection(db, "ordenes");

  const handleFetch = (url, options) => {
    if (url !== undefined) {
      fetch(url, options)
        .then((response) => {
          return response.json();
        })
        .then((res) => setData(res))
        .catch((error) => {
          setErrors(error);
          console.error(error);
        });

      return { data, errors };
    }
  };

  useEffect(() => {
    setProductos(JSON.parse(localStorage.getItem("productosAgregados")));
  }, [productosAgregados]);

  useEffect(() => {
    const prodStock = []
    productos.forEach((prod) => {
      for (const i of prod.Colores) {
        for (const j in i.sizes) {
          if (i.sizes[j] <= 1) {
            prodStock.push({
              nombreProdSinStock: prod.title,
              colorProdSinStock: i.color,
              talleProdSinStock: Object.keys(i.sizes),
              stockProdSinStock: i.sizes[j],
            });
          }
        }
      }
    });
    prodsSinSTock = [...prodStock]
    // eslint-disable-next-line
  }, [productos]);

  useEffect(() => {
    if (prodsSinSTock.length > 0) {
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prodsSinSTock),
      };
      handleFetch("https:backend.sib.com.uy/sin_stock", options);
    }
  }, [prodsSinSTock]);

  useEffect(() => {
    setPaymentId(searchParams.get("payment_id"));
    setOrderStatus(searchParams.get("status"));
    setOrderId(searchParams.get("preference_id"));
  }, [searchParams]);

  useEffect(() => {
    const infoUsuario = JSON.parse(sessionStorage.getItem("infoUsuario"));
    const dirUsuario = JSON.parse(localStorage.getItem("direccionUsuario"));
    const precioTotal = JSON.parse(localStorage.getItem("precioTotal"));
    const infoTotalUsu = Object.assign(infoUsuario, dirUsuario, precioTotal);
    infoTotalUsu && setUserInfo(infoTotalUsu);
    if (orderStatus === "approved") {
      let idCompra = v4();
      setDoc(doc(ordenesCollection), {
        usuario: userInfo,
        idPago: paymentId,
        idOrden: idCompra,
        ordenEntregada: false,
        productos: productos,
        precioTotal: precioTotal,
        pago: "Mercadopago",
        estadoDePago: "Confirmado",
      }).catch((error) => {
        throw error;
      });
      setMailOrderInfoConfig({
        userMailName: userInfo.nombre,
        userMailLastname: userInfo.apellido,
        userMail: userInfo.email,
        userPhone: userInfo.telefono,
        userAdress: userInfo.calles,
        userState: userInfo.localidad,
        userAdressNumber: userInfo.numero,
        precioTotal: precioTotal,
        tipoDeEnvio: userInfo.tipoDeEnvio,
        idOrden: idCompra,
        userPaymentId: paymentId
      });
    }
    // eslint-disable-next-line
  }, [orderStatus, paymentId]);

  useEffect(() => {
    const infoUsuario = JSON.parse(sessionStorage.getItem("infoUsuario"));
    const dirUsuario = JSON.parse(localStorage.getItem("direccionUsuario"));
    const precioTotal = JSON.parse(localStorage.getItem("precioTotal"));
    const infoTotalUsu = Object.assign({
      ...infoUsuario,
      ...dirUsuario,
      precioTotal: precioTotal,
    });
    infoTotalUsu && setUserInfo(infoTotalUsu);
    if (compraEf === "true" && productos.length > 0) {
      let idCompra = v4();
      setMailOrderCashInfoConfig({
        idOrden: idCompra,
        tipoDeEnvio: infoUsuario.tipoDeEnvio,
        precioTotal: precioTotal,
        userMail: userInfo.email,
        userMailName: userInfo.nombre,
        userMailLastname: userInfo.apellido,
        userPhone: userInfo.telefono,
        userAdress: userInfo.calles,
        userState: userInfo.localidad,
        userAdressNumber: userInfo.numero,
        userPaymentId: paymentId
      });
      setDoc(doc(ordenesCollection), {
        usuario: infoTotalUsu,
        idOrden: idCompra,
        ordenEntregada: false,
        productos: productos,
        precioTotal: precioTotal,
        pago: "Efectivo, Transferencia",
        estadoDePago: "Pendiente",
      }).catch((error) => {
        throw error;
      });
    }
    // eslint-disable-next-line
  }, [compraEf, productos]);

  useEffect(() => {
    if (
      Object.keys(mailOrderInfoConfig).length > 0 ||
      Object.keys(mailOrderCashInfoConfig).length > 0
    ) {
      if (orderStatus === "approved" || compraEf === "true") {
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            Object.keys(mailOrderCashInfoConfig).length > 0 
              ? mailOrderCashInfoConfig
              : mailOrderInfoConfig
          ),
        };
        handleFetch("https:backend.sib.com.uy/feedback", options);
        handleFetch("https:backend.sib.com.uy/confirmacion_compra", options);
      }
    }
  }, [mailOrderInfoConfig, orderStatus, mailOrderCashInfoConfig]);

  return (
    <div className="feedback">
      <div>
        {" "}
        {orderStatus === "approved" ? (
          <i className="check">
            <FontAwesomeIcon icon={faCircleCheck} />
          </i>
        ) : compraEf === "true" ? (
          <i className="pending">
            <FontAwesomeIcon icon={faSpinner} />
          </i>
        ) : (
          <i className="denied">
            <FontAwesomeIcon icon={faCircleXmark} />
          </i>
        )}{" "}
      </div>
      <div>
        <h3>Informacion Personal:</h3>
        <p>
          <b>Nombre: </b>
          {userInfo.nombre}
        </p>
        <p>
          <b>Apellido: </b>
          {userInfo.apellido}
        </p>
        <p>
          <b>Email: </b>
          {userInfo.email}
        </p>
        <p>
          <b>Telefono: </b>
          {userInfo.telefono}
        </p>
        <p>
          <b>Direccion: </b>
          {userInfo.calles}
        </p>
        <p>
          <b>Localidad: </b>
          {userInfo.localidad}
        </p>
        <p>
          <b>Número: </b>
          {userInfo.numero}
        </p>
      </div>
      <div>
        <h3>Informacion Compra: </h3>
        {orderStatus === "approved" ? (
          <p>
            <b>Payment ID: </b>
            {paymentId}
          </p>
        ) : (
          ""
        )}
        <p>
          <b>Estado de compra: </b>
          {orderStatus === "approved"
            ? "Aprovada"
            : compraEf === "true"
            ? "Pendiente"
            : "Denegada"}
        </p>
        <p>
          <b>Precio Total: $ </b>
          {userInfo.precioTotal}
        </p>
      </div>
      <div className="botonesFeedback">
        {compraEf === "true" && (
          <a href="https://wa.link/p6zef9" target="_blank">
            <button className="btn">Arreglar el pago</button>
          </a>
        )}
        <Link to={"/"}>
          <button className="btn">Volver</button>
        </Link>
      </div>
    </div>
  );
};

export default FeedbackCompra;
