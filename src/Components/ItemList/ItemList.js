import "./ItemList.css";
import { useEffect, useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import UploadItem from "../../Components/UploadItem/UploadItem";

const ItemList = ({ isLogged, nuevosIngresos }) => {

  const [productos, setProductos] = useState([]);
  const [prodNuevos, setProdNuevos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [remerasChck, setRemerasChck] = useState(false);
  const [camisasChck, setCamisasChck] = useState(false);
  const [buzosChck, setbuzosChck] = useState(false);
  const [accesoriosChck, setAccesoriosChck] = useState(false);
  const [bikinisChck, setBikinisChck] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((res) => {
        return res.json();
      })
      .then((res2) => {
        setProductos(res2)
      })
      .catch((error) => {
        throw error;
      });
  }, [productos]);

  useEffect(() => {
    if (categoriasSeleccionadas.length > 0) {
      const productosFiltrados = productos.filter((producto) =>
        categoriasSeleccionadas.includes(producto.categoriaProd)
      );
      setProductosFiltrados(productosFiltrados);
    } else {
      setProductosFiltrados(productos);
    }
  }, [categoriasSeleccionadas, productos]);

  const handleFiltroCategoria = (event) => {
    const categoria = event.target.value;
    categoria === "RemerasYTops" && setRemerasChck(!remerasChck);
    categoria === "Camisas" && setCamisasChck(!camisasChck);
    categoria === "SweatersYBuzos" && setbuzosChck(!buzosChck);
    categoria === "Accesorios" && setAccesoriosChck(!accesoriosChck);
    categoria === "Bikinis" && setBikinisChck(!bikinisChck);
    if (event.target.checked) {
      setCategoriasSeleccionadas([...categoriasSeleccionadas, categoria]);
    } else {
      setCategoriasSeleccionadas(
        categoriasSeleccionadas.filter(
          (categoriaSeleccionada) => categoriaSeleccionada !== categoria
        )
      );
    }
  };

  useEffect(() => {
    if (productos.length > 0) {
      const arrayNuevos = productos.filter((prod) => prod.nuevoIngresoProd === "si");
      setProdNuevos(arrayNuevos);
    }
  }, [productos]);
 
  return (
    <div>
      {nuevosIngresos ? (
        <div className="nuevosIngresosItemList">
          {prodNuevos.length > 0 && prodNuevos.map((prod) => (
            <ItemCard producto={prod} isLogged={isLogged} key={prod.id} />
          ))}
        </div>
      ) : (
        <div>
          <div className="filtros">
            <div className="filtro">
              <label className={remerasChck ? "activo" : ""}>
                <input
                  id="Remeras"
                  type="checkbox"
                  value="RemerasYTops"
                  checked={categoriasSeleccionadas.includes("RemerasYTops")}
                  onChange={handleFiltroCategoria}
                />
                Remeras
              </label>
            </div>
            <div className="filtro">
              <label className={buzosChck ? "activo" : ""}>
                <input
                  type="checkbox"
                  value="SweatersYBuzos"
                  checked={categoriasSeleccionadas.includes("SweatersYBuzos")}
                  onChange={handleFiltroCategoria}
                />
                Sweaters
              </label>
            </div>
            <div className="filtro">
              <label className={camisasChck ? "activo" : ""}>
                <input
                  type="checkbox"
                  value="Camisas"
                  checked={categoriasSeleccionadas.includes("Camisas")}
                  onChange={handleFiltroCategoria}
                />
                Camisas
              </label>
            </div>
            <div className="filtro">
              <label className={bikinisChck ? "activo" : ""}>
                <input
                  type="checkbox"
                  value="Bikinis"
                  checked={categoriasSeleccionadas.includes("Bikinis")}
                  onChange={handleFiltroCategoria}
                />
                Bikinis
              </label>
            </div>
            <div className="filtro">
              <label className={accesoriosChck ? "activo" : ""}>
                <input
                  type="checkbox"
                  value="Accesorios"
                  checked={categoriasSeleccionadas.includes("Accesorios")}
                  onChange={handleFiltroCategoria}
                />
                Accesorios
              </label>
            </div>
          </div>
          <div className="itemList">
            {productosFiltrados.length > 0 && productosFiltrados.map((prod) => (
              <ItemCard producto={prod} isLogged={isLogged} key={prod.id} />
            ))}
          </div>
        </div>
      )}
      {isLogged && <UploadItem />}
    </div>
  );
};

export default ItemList;
