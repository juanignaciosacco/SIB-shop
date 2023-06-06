import './ItemCount.css'
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../Contextos/CartContext";

const ItemCount = ({ producto }) => {

    const [stockReal, setStockReal] = useState(0)
    const [contador, setContador] = useState()
    const { productosAgregados, moreItemsOnCart, lessItemsOnCart, removeItemFromCart } = useContext(CartContext)
    
        useEffect(() => {
            productosAgregados.forEach(prod => {
                if (prod === producto) {
                    setContador(prod.quantity)
                }
            });
            for (const i of producto.Colores) {
                if (`${i.color}` === producto.ColorSelec) {
                    for (const key in i.sizes) {
                        if ( `${key}` === producto.TalleSelec ) {
                            setStockReal(i.sizes[key])
                        } 
                    }
                }
            }
        }, [producto, productosAgregados])

    const moreItems = () => {
        if (contador >= stockReal) {
            alert('No quedan mas productos en stock')
        } else {
            setContador(contador + 1)
            moreItemsOnCart(producto.id, 1, producto.ColorSelec, producto.TalleSelec)
        }
    }

    const lessItems = () => {
       if (contador <= 1) {
        alert('Has eliminado el producto')
        removeItemFromCart(producto)
       } else {
        setContador(contador - 1)
        lessItemsOnCart(producto.id, 1, producto.ColorSelec, producto.TalleSelec)
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