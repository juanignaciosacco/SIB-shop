import React, { useContext } from "react";
import { Wallet } from "@mercadopago/sdk-react";
import { CartContext } from "../../Contextos/CartContext";

const Payment = () => {
  const { preferenceId } = useContext(CartContext);

  const renderCheckoutButton = () => {
    if (!preferenceId) return null;

    return (
      <Wallet 
        initialization={{ preferenceId: preferenceId }}
      />
      )
  }

  return (
      <div>
        {renderCheckoutButton(preferenceId)}
      </div>
  );
};

export default Payment;
