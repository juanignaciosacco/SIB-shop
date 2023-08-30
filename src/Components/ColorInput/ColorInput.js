import React, { useState } from 'react';
import './ColorInput.css'
import swal from 'sweetalert';

const ColorInput = ({ onSelectColor }) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSizes, setSelectedSizes] = useState({});

  const availableColors = [
    {
      color: 'azul',
      value: 'blue'
    },
    {
      color: 'rojo',
      value: 'red'
    },
    {
      color: 'verde',
      value: 'green'
    },
    {
      color: 'amarillo',
      value: 'yellow'
    }, {
      color: 'beige',
      value: 'beige'
    }, {
      color: 'marron',
      value: 'brown'
    }, {
      color: 'blanco',
      value: 'white'
    }, {
      color: 'negro',
      value: 'black'
    }, {
      color: 'celeste',
      value: 'lightblue'
    },
  ];

  const availableSizes = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'Talle Unico'
  ];

  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [color]: prevSizes[color] || {}
    }));
  };

  const handleStockChange = (event, color, size) => {
    const stock = event.target.value;
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [color]: {
        ...prevSizes[color],
        [size]: stock
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(Object.keys(selectedSizes[selectedColor]).length > 0) {
      const colorItem = {
        color: selectedColor,
        sizes: selectedSizes[selectedColor]
      };
      onSelectColor(colorItem);
      setSelectedColor('');
      setSelectedSizes({});
    } else {
      swal("Debe cargarle el stock a un talle")
    }
  };

  return (
    <div className='colorInput'>
      <label>
        Color:
        <select value={selectedColor}
          onChange={handleColorChange}>
          <option value="">Seleccionar color</option>
          {
            availableColors.map((color) => (
              <option key={
                color.value
              }
                value={
                  color.value
                }>
                {
                  color.color
                } </option>
            ))
          } </select>
      </label>

      {
        selectedColor && (
          <div>
            <p>Talles:</p>
            <div> {
              availableSizes.map((size) => (
                <div key={size}>
                  <span>{size}</span>
                  <input type="number" placeholder='Stock' min="0"
                    value={
                      selectedSizes[selectedColor]?.[size] || ''
                    }
                    onChange={
                      (event) => handleStockChange(event, selectedColor, size)
                    } />
                </div>
              ))
            } </div>
          </div>
        )
      }
      <button type="button"
        onClick={handleSubmit}
        disabled={
          !selectedColor
        }>
        Agregar
      </button>
    </div>
  );
};

export default ColorInput;
