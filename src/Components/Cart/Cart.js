import "./Cart.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemCart from "../ItemCart/ItemCart";
import { CartContext } from "../../Contextos/CartContext";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Payment from "../PaymentSummary/Payment";
import ResumenDeCompra from "../ResumenDeCompra/ResumenDeCompra";
import FormCompra from "../FormCompra/FormCompra";
import FormCompraDireccion from "../FormCompraDireccion/FormCompraDireccion";

// initMercadoPago('APP_USR-21fa9365-b7a0-44e2-b57e-b518d8ef2322');
initMercadoPago("APP_USR-21fa9365-b7a0-44e2-b57e-b518d8ef2322");

const Cart = () => {
  const {
    productosAgregados,
    precioTotal,
    totalItems,
    clearAllItems,
    setPreferenceId,
    preferenceId,
  } = useContext(CartContext);
  const [items, setOrderSummary] = useState({});
  const [pagoET, setPagoET] = useState(false);
  const [pagoMP, setPagoMP] = useState(false);
  const [formFilled, setFormFilled] = useState(false);
  const [formDirectionFilled, setFormDirectionFilled] = useState(false);
  const [retiro, setRetiro] = useState();

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("infoUsuario"));
    if (data !== null) {
      if (Object.keys(data).length === 5) {
        setFormFilled(true);
        setRetiro(data.tipoDeEnvio);
      }
    }
  }, []);

  useEffect(() => {
    setOrderSummary({
      items: [
        {
          name: "Compra SIB Shop",
          quantity: parseInt(totalItems),
          price: parseInt(precioTotal),
        },
      ],
    });
  }, [totalItems, precioTotal]);

  const vaciarClickHandler = () => {
    clearAllItems();
  };

  const handleClickMP = () => {
    fetch("https://backend.sib.com.uy/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(items),
    })
      .then((response) => {
       return response.text();
      })
      .then((res) => {
        setPreferenceId(res);
        setPagoMP(true);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleClickET = () => {
    setPagoET(!pagoET);
    setPagoMP(false);
    setPreferenceId(null);
  };

  const handleClickCancel = () => {
    setPagoET(false);
    setPreferenceId(null);
    setPagoMP(false);
  };

  const siguienteClickHandler = () => {
    setFormFilled(true);
  };

  const volverClickHandler = () => {
    sessionStorage.removeItem("infoUsuario");
    setFormDirectionFilled(false);
    setFormFilled(false);
  };

  const formDirectionIsFilled = () => {
    setFormDirectionFilled(true);
  };

  const envio = (ev) => {
    setRetiro(ev);
  };

  return (
    <div className="cartContainer">
      <h1>Carrito</h1>
      <div id="cart">
        {productosAgregados.length !== 0 ? (
          <div className="cart">
            <div className="itemsInCart">
              {productosAgregados.map((prod, index) => (
                <ItemCart producto={prod} key={index} />
              ))}
            </div>
            <div>
              {!formFilled ? (
                <div className="formInCart">
                  <FormCompra
                    onClickSiguiente={siguienteClickHandler}
                    envio={envio}
                  />
                </div>
              ) : (
                <div>
                  {retiro === "Domicilio" ? (
                    <div className="formInCart">
                      <FormCompraDireccion
                        onClickSiguiente={formDirectionIsFilled}
                        isHidden={formDirectionFilled}
                      />{" "}
                      {formDirectionFilled && (
                        <div>
                          <ResumenDeCompra
                            pagoMP={pagoMP}
                            pagoET={pagoET}
                            onClickMP={handleClickMP}
                            onClickET={handleClickET}
                            onClickCancel={handleClickCancel}
                            onClickVaciar={vaciarClickHandler}
                            onClickVolver={volverClickHandler}
                          />
                          {preferenceId && (
                            <div className="pagoMP">
                              <Payment />
                              <button
                                className="btn"
                                onClick={handleClickCancel}
                              >
                                Cancelar
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : retiro === "Tienda" ? (
                    <div>
                      <ResumenDeCompra
                        pagoMP={pagoMP}
                        pagoET={pagoET}
                        onClickMP={handleClickMP}
                        onClickET={handleClickET}
                        onClickCancel={handleClickCancel}
                        onClickVaciar={vaciarClickHandler}
                        onClickVolver={volverClickHandler}
                      />
                      {preferenceId && (
                        <div className="pagoMP">
                          <Payment />
                          <button
                            className="btn btn-cancelar"
                            onClick={handleClickCancel}
                          >
                            Cancelar
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <FormCompra
                        onClickSiguiente={siguienteClickHandler}
                        envio={envio}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="emptyCart">
            <h2>No tienes Items en el carrito</h2>
            <button className="btn">
              <Link to={"/tienda"}>Ir a la tienda</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
