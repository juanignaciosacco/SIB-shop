import "./ItemDetails.css";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Contextos/CartContext";
import { Link } from "react-router-dom";
import CarouselItemDetail from "../CarouselItemDetail/CarouselItemDetail";
import swal from "sweetalert";

const ItemDetails = ({ idProd }) => {
  const [producto, setProducto] = useState({});
  const [images2, setImages] = useState([]);
  const [talleSelec, setTalleSelec] = useState("");
  const [colorP, setColorP] = useState();
  const { addItemToCart } = useContext(CartContext);
  const [colorSeleccionado, setColorSeleccionado] = useState(false);
  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [esTalleUnico, setEsTalleUnico] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8081/products/${idProd}`)
      .then((res) => res.json())
      .then((response) => setProducto(response));
  }, [idProd]);

  useEffect(() => {
    let list = [];
    for (let key in producto) {
      key === "imgUrl" &&
      // eslint-disable-next-line
        producto[key].map((key) => {
          list.push(key.imgUrl);
        });
    }
    setImages(list);
    if (producto.colores !== undefined) {
      if (producto.colores.length > 0) {
        producto.colores.forEach((color) => {
          if (color.talles.every((val) => val !== "Talle Unico")) {
            setEsTalleUnico(false);
          } else {
            setEsTalleUnico(true);
          }
        });
      }
    }
  }, [producto]);

  const selectTalleHandler = (ev) => {
    ev.target.value !== "Selecciona un talle"
      ? setTalleSelec(ev.target.value)
      : setTalleSelec("");
  };

  const addItemToCartList = (ev) => {
    if (colorP !== undefined || colorP) {
      if (talleSeleccionado !== "" || esTalleUnico) {
        const productoACarrito = {
          ...producto,
          cantidad: 1,
          talleProd: talleSeleccionado,
          colorProd: colorP,
          imageIndx: currentIndex,
        };
        addItemToCart(productoACarrito);
      } else {
        ev.preventDefault();
        swal("Debe seleccionar un talle!");
      }
    } else if (producto.Talle === "Talle Unico") {
      ev.preventDefault();
      swal("Debe seleccionar un color!");
    }
  };

  const selectColor = (ev) => {
    setColorP(ev.target.id);
    setColorSeleccionado(true);
    setTalleSeleccionado("");
  };

  const selectTalle = (ev) => {
    setTalleSeleccionado(ev.target.innerHTML);
  };

  return (
    <div className="itemDetailsContainer">
      {images2.length !== 0 ? (
        <div className="itemDetails">
          <div className="itemDetailCarousel">
            <CarouselItemDetail
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              colorP={colorP}
              images={images2}
            />
          </div>
          <div className="itemDetailInfo">
            <h1>{producto.nombreProd}</h1>
            <h2>${producto.precioProd}</h2>
            <hr style={{ marginBottom: "30px", marginTop: "30px" }} />
            <h3>Hecho en Uruguay</h3>
            <p>Materiales: {producto.materialesProd}</p>
            <hr style={{ marginBottom: "30px", marginTop: "30px" }} />
            <h3>Medidas</h3>
            {true ? (
              <div key={producto.idProduct}>
                <p>Talles: </p>
                <select required onChange={selectTalleHandler}>
                  <option value="">Selecciona un talle</option>
                  {Array.from(
                    new Set(
                      producto.colores
                        .map((color) =>
                          color.talles.map((talle) => talle.talle)
                        )
                        .flat()
                    )
                  ).map((talleUnico) => (
                    <option key={talleUnico} value={talleUnico}>
                      {talleUnico}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div>
                <p>Talle unico</p>
              </div>
            )}
            {producto.largo !== "0" && producto.largo !== "" && (
              <p>- Largo: {producto.largo} cm</p>
            )}
            {producto.ancho !== "0" && producto.ancho !== "" && (
              <p>- Ancho Busto: {producto.ancho} cm</p>
            )}
            {producto.ruedo !== "0" && producto.ruedo !== "" && (
              <p>- Ruedo: {producto.ruedo} cm</p>
            )}
            <hr style={{ marginBottom: "30px", marginTop: "30px" }} />
            <div>
              {producto.colores !== undefined && (
                <div id="coloresDetailsContainer">
                  <h3>Colores:</h3>
                  <div>
                    {producto.colores.length !== 0 &&
                      producto.colores.map((color, index) =>
                        color.talles.some(
                          (talle) => talle.talle === talleSelec
                        ) ? (
                          <button
                            className="colorBtnItemDetails"
                            onClick={selectColor}
                            key={index}
                            id={color.color}
                            style={{ backgroundColor: `${color.color}` }}
                          />
                        ) : (
                          talleSelec === "" && (
                            <button
                              className="colorBtnItemDetails"
                              onClick={selectColor}
                              key={index}
                              id={color.color}
                              style={{ backgroundColor: `${color.color}` }}
                            />
                          )
                        )
                      )}
                  </div>
                  {colorSeleccionado && (
                    <div>
                      <h3>Color seleccionado para agregar a carrito</h3>
                      <div
                        className="colorBtnItemDetails"
                        style={{
                          backgroundColor: `${colorP}`,
                          marginBottom: "15px",
                        }}
                      ></div>
                      {esTalleUnico ? (
                        <div>
                          <p>Es talle único</p>
                        </div>
                      ) : (
                        <div>
                          <label style={{ marginRight: "10px" }}>
                            Selecciona un talle:
                          </label>
                          <div className="talleSelection">
                            {producto.colores.map(
                              (color) =>
                                color.color === colorP &&
                                Array.isArray(color.talles) &&
                                color.talles.map((size, index) => (
                                  <div
                                    className={
                                      talleSeleccionado === size.talle
                                        ? "tallesDetails seleccionado"
                                        : "tallesDetails"
                                    }
                                    onClick={selectTalle}
                                    id={size}
                                    key={index}
                                  >
                                    {size.talle}
                                  </div>
                                ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
            <Link to={"/carrito"}>
              <button className="btn" onClick={addItemToCartList}>
                Agregar al carrito
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <p>Cargando...</p>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
