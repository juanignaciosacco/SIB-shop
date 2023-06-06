import React, { useEffect, useState } from 'react';

const HistoryOrders = () => {
  const [order, setOrder] = useState(null);
  const [preferenceId, setPreferenceId] = useState('648132542-ebeeacc1-c796-4f15-8c76-5d17840a4868')

useEffect(() => {
    fetch(`http://localhost:8080/orden/${preferenceId}`)
        .then((response) => {
        return response.json();
        })
        .then((preference) => {
        setOrder(preference);
        })
        .catch((error) => {
        console.error(error);
        })
}, [])

const txtChangeHandler = (ev) => {
  setPreferenceId(ev.target.value)
}


  // Renderizar los detalles de la orden
  return (
    <div>
      {!order ? (
        <div>
          <input onChange={txtChangeHandler} placeholder='Id Orden' />
        </div>
      ):(
        <div>  
          <h2>Detalles de la Orden</h2>
          <p>Estado: {order.status}</p>
          <p>Monto: {order.amount}</p>
        </div>
      )}  
      {/* Renderizar otros detalles de la orden */}
    </div>
  );
}
export default HistoryOrders;
