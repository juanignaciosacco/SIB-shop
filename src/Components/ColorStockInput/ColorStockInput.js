const ColorStockInput = ({ color, stock, onChange, onDelete, index }) => {

    return (
        <div>
            <div style={{
                display: "inline-block",
                width: 20,
                height: 20,
                backgroundColor: color,
                marginRight: 10,
            }}/>
            <input type="color" value={color} onChange={(e) => onChange({ color: e.target.value, stock })} />
            <input type="number" value={stock} placeholder="Stock" onChange={(e) => onChange({ color, stock: e.target.value })} />
            {/* eslint-disable-next-line */}
            <button onClick={(ev) => (ev.preventDefault(), onDelete(index))}>Eliminar</button>
        </div>
    )
}

export default ColorStockInput;