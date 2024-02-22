import "./ObtenerOrdenes.css";
import React, { useEffect, useState, useContext } from "react";
import { AdminContext } from "../../Contextos/AdminContext";
import swal from "sweetalert";
import OrdenCard from "../OrdenCard/OrdenCard";

const ObtenerOrdenes = () => {
  const { logged } = useContext(AdminContext);
  const [ordenes, setOrdenes] = useState([]);
  const [idOrdenBuscada, setIdOrdenBuscada] = useState();
  const [ordenBuscada, setOrdenBuscada] = useState([]);
  const [busquedaNormalizada, setBusquedaNormalizada] = useState();

  useEffect(() => {
    if (logged) {
      fetch("http://localhost:8081/ordenes")
        .then((res) => {
          return res.json();
        })
        .then((res2) => {
          setOrdenes(res2);
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [logged]);

  const marcarOrden = (elv) => {
    swal({
      text: "Segura que desea modificar el estado de la orden?",
      buttons: ["No", "Si"],
    }).then((value) => {
      if (value) {
        ordenes.forEach((orden) => {
          if (orden.id == elv) {
            if (orden.ordenEntregada === false) {
              fetch(`http://localhost:8080/ordenes/${orden.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ordenEntregada: true,
                  estadoDePago: "Confirmado",
                }),
              });
            } else {
              fetch(`http://localhost:8080/ordenes/${orden.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ordenEntregada: false,
                  estadoDePago: "Confirmado",
                }),
              });
            }
          }
        });
      }
    });
  };

  const buscarOrden = (ev) => {
    setIdOrdenBuscada(ev.target.value);
  };

  const deleteOrden = (ordenId) => {
    fetch(`http://localhost:8080/ordenes/${ordenId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  useEffect(() => {
    if (idOrdenBuscada !== undefined) {
      let normalizar = idOrdenBuscada.toString();
      normalizar = normalizar.toLowerCase();
      setBusquedaNormalizada(normalizar);
    }
  }, [idOrdenBuscada]);

  useEffect(() => {
    setOrdenBuscada(
      ordenes.filter(
        (orden) =>
          orden.idPago === busquedaNormalizada ||
          orden.idOrden === busquedaNormalizada ||
          orden.userName === busquedaNormalizada ||
          orden.userPhoneNumer === busquedaNormalizada
      )
    );
    // eslint-disable-next-line
  }, [busquedaNormalizada]);

  return (
    <div id="ordenesContainer">
      <h1>Ordenes</h1>
      {logged ? (
        <div>
          <div className="buscadorDeOrdenes">
            <h3>Buscar orden</h3>
            <input
              className="formInputs"
              type="text"
              placeholder="ID Orden o ID Pago o Nombre usuario o Telefono usuario"
              onChange={buscarOrden}
            />
          </div>
          <div>
            {ordenBuscada.length !== 0 ? (
              <div className="historialOrdenesContainer">
                {ordenBuscada.map((orden) => (
                  <OrdenCard
                    isLogged={logged}
                    orden={orden}
                    marcarOrden={marcarOrden}
                    deleteOrden={deleteOrden}
                    key={ordenBuscada[0].id}
                  />
                ))}
              </div>
            ) : (
              <div className="historialOrdenesContainer">
                {ordenes.map((orden) => (
                  <OrdenCard
                    isLogged={logged}
                    orden={orden}
                    marcarOrden={marcarOrden}
                    deleteOrden={deleteOrden}
                    key={orden.id}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>Tiene que iniciar sesion para acceder a esta area!!</p>
      )}
    </div>
  );
};

export default ObtenerOrdenes;
