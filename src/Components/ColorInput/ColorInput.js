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

  const handleStockChange = (event, color, talle) => {
    const stock = event.target.value;
    setSelectedSizes((prevSizes) => ({
      ...prevSizes,
      [color]: {
        ...prevSizes[color],
        [talle]: stock
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (
      selectedColor &&
      selectedSizes &&
      selectedSizes[selectedColor] &&
      Object.keys(selectedSizes[selectedColor]).length > 0
    ) {
      console.log('Entre al if')
      console.log(Object.entries(selectedSizes[selectedColor]))
      const colorItem = {
        color: selectedColor,
        talles: Object.entries(selectedSizes[selectedColor]).map(([talle, stock]) => ({
          talle,
          stock: parseInt(stock, 10),
        })),
      };
      console.log(colorItem)
  
      onSelectColor(colorItem);
      setSelectedColor('');
      setSelectedSizes({});
    } else {
      swal('Debe cargarle el stock a un talle');
    }
  };
  
  
  

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if(Object.keys(selectedSizes[selectedColor]).length > 0 && Object.entries(selectedSizes[selectedColor])) {
  //     const colorItem = {
  //       color: selectedColor,
  //       talles: [{"talle": Object.keys(selectedSizes[selectedColor]), "stock": Object.values(selectedSizes[selectedColor])}]
  //     };
  //     console.log(Object.keys(selectedSizes[selectedColor]), Object.values(selectedSizes[selectedColor]))
  //     onSelectColor(colorItem);
  //     setSelectedColor('');
  //     setSelectedSizes({});
  //   } else {
  //     swal("Debe cargarle el stock a un talle")
  //   }
  // };

  return (
    <div className='colorInput'>
    <label>
      Color:
      <select value={selectedColor} onChange={handleColorChange}>
        <option value="">Seleccionar color</option>
        {availableColors.map((color) => (
          <option key={color.value} value={color.value}>
            {color.color}
          </option>
        ))}
      </select>
    </label>

    {selectedColor && (
      <div>
        <p>Talles:</p>
        <div>
          {availableSizes.map((talle) => (
            <div key={talle}>
              <span>{talle}</span>
              <input
                type="number"
                placeholder='Stock'
                min="0"
                value={selectedSizes[selectedColor]?.[talle] || ''}
                onChange={(event) => handleStockChange(event, selectedColor, talle)}
              />
            </div>
          ))}
        </div>
      </div>
    )}
    <button type="button" onClick={handleSubmit} disabled={!selectedColor}>
      Agregar
    </button>
  </div>
    // <div className='colorInput'>
    //   <label>
    //     Color:
    //     <select value={selectedColor}
    //       onChange={handleColorChange}>
    //       <option value="">Seleccionar color</option>
    //       {
    //         availableColors.map((color) => (
    //           <option key={
    //             color.value
    //           }
    //             value={
    //               color.value
    //             }>
    //             {
    //               color.color
    //             } </option>
    //         ))
    //       } </select>
    //   </label>

    //   {
    //     selectedColor && (
    //       <div>
    //         <p>Talles:</p>
    //         <div> {
    //           availableSizes.map((talle) => (
    //             <div key={talle}>
    //               <span>{talle}</span>
    //               <input type="number" placeholder='Stock' min="0"
    //                 value={
    //                   selectedSizes[selectedColor]?.[talle] || ''
    //                 }
    //                 onChange={
    //                   (event) => handleStockChange(event, selectedColor, talle)
    //                 } />
    //             </div>
    //           ))
    //         } </div>
    //       </div>
    //     )
    //   }
    //   <button type="button"
    //     onClick={handleSubmit}
    //     disabled={
    //       !selectedColor
    //     }>
    //     Agregar
    //   </button>
    // </div>
  );
};

export default ColorInput;
