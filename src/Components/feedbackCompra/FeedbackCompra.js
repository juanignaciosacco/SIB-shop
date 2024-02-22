import "./FeedbackCompra.css";
import { useContext, useEffect, useRef, useState } from "react";
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
  
  const options = useRef({});
  const prodsSinSTock = useRef([]);
  const { productosAgregados } = useContext(CartContext);
  const [searchParams] = useSearchParams();
  const [paymentId, setPaymentId] = useState();
  const [orderStatus, setOrderStatus] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [mailOrderInfoConfig, setMailOrderInfoConfig] = useState({});
  const [mailOrderCashInfoConfig, setMailOrderCashInfoConfig] = useState({});
  const [productos, setProductos] = useState([]);
  const { compraEf } = useParams();
  const [data, setData] = useState();
  const [errors, setErrors] = useState();

  const handleFetch = (url, options) => {
    if (url !== undefined) {
      fetch(url, options)
        .then((response) => {
          return response.json();
        })
        .then((res) => setData(res))
        .catch((error) => {
          setErrors(error);
          throw error;
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
      for (const i of prod.colores) {
        for (const j in i.talles) {
          if (i.talles[j] <= 1) {
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
    prodsSinSTock.current = [...prodStock];
    // eslint-disable-next-line
  }, [productos]);

  useEffect(() => {
    if (prodsSinSTock.length > 0) {
      options.current = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prodsSinSTock),
      };
      // handleFetch("https:backend.sib.com.uy/sin_stock", options);
    }
    // eslint-disable-next-line
  }, [prodsSinSTock]);

  useEffect(() => {
    setPaymentId(searchParams.get("payment_id"));
    setOrderStatus(searchParams.get("status"));
  }, [searchParams]);

  useEffect(() => {
    const infoUsuario = JSON.parse(sessionStorage.getItem("infoUsuario"));
    const dirUsuario = JSON.parse(localStorage.getItem("direccionUsuario"));
    const precioTotal = JSON.parse(localStorage.getItem("precioTotal"));
    const infoTotalUsu = Object.assign(infoUsuario, dirUsuario, precioTotal);
    infoTotalUsu && setUserInfo(infoTotalUsu);
    if (orderStatus === "approved") {
      let idCompra = v4();
      options.current = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: userInfo.email,
          userName: userInfo.nombre,
          idPago: paymentId,
          idOrden: idCompra,
          ordenEntregada: false,
          productos: productos,
          precioTotal: precioTotal,
          pago: "Mercadopago",
          estadoDePago: "Confirmado",
        }),
      }
      handleFetch("http://localhost:8080/ordenes", options)
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
      options.current = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: infoTotalUsu.email,
          userName: infoTotalUsu.nombre,
          userLastName: infoTotalUsu.apellido,
          userPhoneNumber: infoTotalUsu.telefono,
          idPago: paymentId,
          idOrden: idCompra,
          ordenEntregada: false,
          productos: productos,
          precioTotal: precioTotal,
          pago: "Efectivo, Transeferencia",
          estadoDePago: "Pendiente",
        }),
      }
      handleFetch("http://localhost:8080/ordenes", options.current)
    }
    // eslint-disable-next-line
  }, [compraEf, productos]);

  useEffect(() => {
    if (
      Object.keys(mailOrderInfoConfig).length > 0 ||
      Object.keys(mailOrderCashInfoConfig).length > 0
    ) {
      if (orderStatus === "approved" || compraEf === "true") {
        options.current = {
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
        // handleFetch("https:backend.sib.com.uy/feedback", options);
        // handleFetch("https:backend.sib.com.uy/confirmacion_compra", options);
      }
    }
    // eslint-disable-next-line
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
          <a href="https://wa.link/p6zef9" target="_blank" rel="noreferrer">
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
