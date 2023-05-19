const ColorStockInput = ({ color, stock, onColorChange, onStockChange, onDelete }) => {
  return (
    <div>
      <div
        style={{
          display: "inline-block",
          width: 20,
          height: 20,
          backgroundColor: `${color}`,
          marginRight: 10,
        }}
      />
      <select
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
      >
          <option value="">Seleccione un color</option>
          <option value="white">Blanco</option>
          <option value="beige">Beige</option>
          <option value="yellow">Amarillo</option>
          <option value="pink">Rosado</option>
          <option value="green">Verde</option>
          <option value="violet">Violeta</option>
          <option value="blue">Azul</option>
          <option value="black">Negro</option>
          <option value="red">Rojo</option>
        </select>
        <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => onStockChange(color, e.target.value)}
      />
      <button onClick={onDelete}>Eliminar</button>
    </div>
  );
};

export default ColorStockInput;