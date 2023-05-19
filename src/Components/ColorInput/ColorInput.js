import './ColorInput.css'
import React, { useState } from 'react';

const colors = [
  { name: 'Blanco', value: 'white' },
  { name: 'Beige', value: 'beige' },
  { name: 'Amarillo', value: 'yellow' },
  { name: 'Rosado', value: 'pink' },
  { name: 'Verde', value: 'green' },
  { name: 'Violeta', value: 'violet' },
  { name: 'Azul', value: 'blue' },
  { name: 'Negro', value: 'black' },
  { name: 'Rojo', value: 'red' },
  { name: 'Marrón', value: 'brown' }
];

const ColorInput = ({ selectedColors, onColorChange, existingColors }) => {
  const [colorStocks, setColorStocks] = useState({});

  const handleStockChange = (color, stock) => {
    setColorStocks((prevStocks) => ({
      ...prevStocks,
      [color]: stock
    }));
  };

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    if (selectedColors.includes(selectedColor)) {
      const { [selectedColor]: _, ...rest } = colorStocks;
      setColorStocks(rest);
      onColorChange(selectedColors.filter((color) => color !== selectedColor));
    } else {
      onColorChange([...selectedColors, selectedColor]);
    }
  };

  const handleRemoveColor = (color) => {
    const { [color]: _, ...rest } = colorStocks;
    setColorStocks(rest);
    onColorChange(selectedColors.filter((c) => c !== color));
  };

  return (
    <div>
      <h4>Colores:</h4>
      {selectedColors.map((color) => (
        <div key={color}>
          <div
            className="color-square"
            style={{ backgroundColor: colors.find((c) => c.value === color)?.value }}
          />
          <label>
            <input
              type="number"
              min="0"
              value={colorStocks[color] || ''}
              onChange={(event) => handleStockChange(color, event.target.value)}
              placeholder="Stock"
            />
          </label>
          <button onClick={() => handleRemoveColor(color)}>Eliminar</button>
        </div>
      ))}
      <select value="" onChange={handleColorChange}>
        <option value="" disabled>
          Seleccionar color
        </option>
        {colors.map((color) => (
          <option key={color.name} value={color.value}>
            {color.name}
          </option>
        ))}
      </select>
      {existingColors && (
        <div>
          <h4>Colores existentes:</h4>
          {existingColors.map((color) => (
            <div key={color}>
              <div
                className="color-square"
                style={{ backgroundColor: colors.find((c) => c.value === color)?.value }}
              />
              <span>{color}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorInput;