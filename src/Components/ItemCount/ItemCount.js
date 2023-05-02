import './ItemCount.css'
import { useState, useContext } from "react";
import { CartContext } from "../../Contextos/CartContext";

const ItemCount = ({stock, id, precio}) => {

    const { moreItemsOnCart, lessItemsOnCart, removeItemFromCart } = useContext(CartContext)

    const [contador, setContador] = useState(1)

    const moreItems = () => {
        if (contador >= stock) {
            alert('No quedan mas productos en stock')
        } else {
            setContador(contador + 1)
            moreItemsOnCart(id, 1)
        }
    }

    const lessItems = () => {
       if (contador <= 1) {
        alert('Has eliminado el producto')
        removeItemFromCart(id, precio, 1)
       } else {
        setContador(contador - 1)
        lessItemsOnCart(id, 1)
       }
    }

    return (
        <div className="itemCount">
            <button onClick={lessItems}>-</button>
            <p>{contador}</p>
            <button onClick={moreItems}>+</button>
        </div>
    )
}

export default ItemCount;