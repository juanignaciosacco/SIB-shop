import React, { useContext, useState } from "react";
import classnames from 'classnames'
import { Wallet } from "@mercadopago/sdk-react";
import { CartContext } from "../../Contextos/CartContext";

const Payment = () => {
  const { preferenceId, productosAgregados, precioTotal } = useContext(CartContext);
  const [isReady, setIsReady] = useState(false);
  const paymentClass = classnames('payment-form dark', {
    'payment-form--hidden': !isReady,
  });

  const handleOnReady = () => {
    setIsReady(true);
  }

  const renderCheckoutButton = (preferenceId) => {
    if (!preferenceId) return null;

    return (
      <Wallet 
        initialization={{ preferenceId: preferenceId }}
        onReady={handleOnReady} />
      )
  }

  return (
    <div className={paymentClass}>
      <div className="container_payment">
        <div className="block-heading">
          <h2>Checkout Payment</h2>
          <p>This is an example of a Mercado Pago integration</p>
        </div>
        <div className="form-payment">
          <div className="products">
            <h2 className="title">Resumen de compra</h2>
            {productosAgregados.map((prod) => (
              <div className="item" key={prod.id}>
                <span className="price" id="summary-price">${prod.price}</span>
                <p className="item-name">
                  {prod.title}<span id="summary-quantity">{prod.quantity}</span>
                </p>
              </div>
            ))}
            <div className="total">
              Total
              <span className="price" id="summary-total">${precioTotal}</span>
            </div>
          </div>
          <div className="payment-details">
            <div className="form-group col-sm-12">
              {renderCheckoutButton(preferenceId)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
