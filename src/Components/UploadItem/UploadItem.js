import "./UploadItem.css";
import { getFirestore, doc, collection, setDoc } from "firebase/firestore";
import { useState } from "react";
import { uploadFile, convertHeic } from "../../index";
import ColorInput from "../ColorInput/ColorInput";
import swal from "sweetalert";
import Swal from "sweetalert2";

const UploadItem = () => {
  const [productoEdit, setProductoEdit] = useState({
    nombreProd: "",
    precioProd: "",
    categoriaProd: "SweatersYBuzos",
    materialesProd: "",
    largo: "",
    ancho: "",
    ruedo: "",
    NIProd: "",
  });
  const {
    nombreProd,
    precioProd,
    categoriaProd,
    materialesProd,
    largo,
    ancho,
    ruedo,
    NIProd,
  } = productoEdit;
  const [file, setFile] = useState();
  const [colorItems, setColorItems] = useState([]);
  const [cargandoItem, setCargandoItem] = useState(false);

  const db = getFirestore();
  const items2 = collection(db, "productos");

  const handleColorSelect = (colorItem) => {
    setColorItems((prevColorItems) => [...prevColorItems, colorItem]);
  };

  const handleColorDelete = (index, event) => {
    event.preventDefault();
    setColorItems((prevColorItems) => {
      const updatedColorItems = [...prevColorItems];
      updatedColorItems.splice(index, 1);
      return updatedColorItems;
    });
  };

  const inputChangeHandler = ({ target: { name, value } }) => {
    setProductoEdit({
      ...productoEdit,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    if (colorItems.length !== 0) {
      e.preventDefault();
      var results = [];
      setCargandoItem(true);
      try {
        for (const i of file) {
          if (i.type === "image/heic") {
            results.push(await convertHeic(i));
          } else {
            results.push(await uploadFile(i));
          }
        }
      } catch (error) {
        e.preventDefault();
        alert("Fallo interno, avisale a juanchi ", error);
        setCargandoItem(false);
      }
      if (colorItems.length !== 0) {
        setDoc(doc(items2), {
          title: nombreProd,
          price: precioProd,
          category_id: categoriaProd,
          Materiales: materialesProd,
          Largo: largo,
          AnchoBusto: ancho,
          Ruedo: ruedo,
          NuevoIngreso: NIProd,
          Colores: colorItems,
          picture_url: results,
        }).then(() => {
          setCargandoItem(false);
        });
      } else {
        Swal.fire("Fallo al cargar producto", "Debes cargar un color!", "error");
      }
      setProductoEdit({
        nombreProd: "",
        precioProd: "",
        categoriaProd: "SweatersYBuzos",
        materialesProd: "",
        largo: "",
        ancho: "",
        ruedo: "",
        NIProd: "",
      });
    } else {
      e.preventDefault();
      swal("Debe ingresar al menos 1 color!");
    }
  };

  return (
    <div className="formUpload">
      <form className="form">
        <label htmlFor="Titulo">Titulo</label>
        <input
          className="formInputs"
          required
          name="nombreProd"
          id="nombreProd"
          onChange={inputChangeHandler}
          value={nombreProd}
        />
        <label htmlFor="Precio">Precio</label>
        <input
          className="formInputs"
          required
          name="precioProd"
          id="precioProd"
          onChange={inputChangeHandler}
          value={precioProd}
        />
        <label htmlFor="Categoria">Categoria</label>
        <select
          className="formInputs"
          name="categoriaProd"
          id="categoriaProd"
          onChange={inputChangeHandler}
        >
          <option value="SweatersYBuzos" id="SweatersYBuzos">
            Sweaters y buzos
          </option>
          <option value="Camisas" id="Camisas">
            Camisas
          </option>
          <option value="RemerasYTops" id="RemerasYTops">
            Remeras y tops
          </option>
          <option value="Bikinis" id="Bikinis">
            Bikinis
          </option>
          <option value="Accesorios" id="Accesorios">
            Accesorios
          </option>
        </select>
        <div className="colores">
          <ColorInput
            onSelectColor={handleColorSelect}
            onColorDelete={handleColorDelete}
          />
          <h2>Colores seleccionados:</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {colorItems.map((colorItem, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <div
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundColor: colorItem.color,
                    border: "1px solid black",
                    marginRight: "5px",
                  }}
                ></div>
                <button onClick={(event) => handleColorDelete(index, event)}>
                  Eliminar
                </button>
                <div>
                  Talles:
                  {Object.entries(colorItem.sizes).map(([size, stock]) => (
                    <div key={size}>
                      {size}, Stock: {stock}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <label htmlFor="Materiales">Materiales</label>
        <input
          className="formInputs"
          name="materialesProd"
          id="materiales"
          onChange={inputChangeHandler}
          value={materialesProd}
        />
        <label htmlFor="Medidas">Medidas</label>
        <input
          className="formInputs"
          name="medidas"
          id="largo"
          onChange={inputChangeHandler}
          placeholder="Largo"
          value={largo}
        />
        <input
          className="formInputs"
          name="medidas"
          id="anchoBusto"
          onChange={inputChangeHandler}
          placeholder="Ancho Busto"
          value={ancho}
        />
        <input
          className="formInputs"
          name="medidas"
          id="ruedo"
          onChange={inputChangeHandler}
          placeholder="Ruedo"
          value={ruedo}
        />
        <label htmlFor="NuevoIngreso">Nuevo Ingreso?</label>
        <div className="radio">
          <input
            type="radio"
            value="si"
            name="NIProd"
            id="nuevoIngreso"
            onChange={inputChangeHandler}
          />{" "}
          Si
          <input
            type="radio"
            value="no"
            name="NIProd"
            id="NIProd"
            onChange={inputChangeHandler}
          />{" "}
          No
        </div>
        <label htmlFor="file">Imagen</label>
        <input
          className="formUploadInputs"
          multiple
          id="file"
          type="file"
          onChange={(e) => setFile(e.target.files)}
        />
        <button className="btnForm" onClick={handleSubmit}>
          Subir
        </button>
      </form>
      {cargandoItem && (
        <div className="cargando">
          <p>Cargando...</p>
        </div>
      )}
    </div>
  );
};

export default UploadItem;
