import './ItemCount.css'
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../Contextos/CartContext";
import swal from 'sweetalert';

const ItemCount = ({ producto }) => {

    const [stockReal, setStockReal] = useState(0)
    const [contador, setContador] = useState()
    const { productosAgregados, moreItemsOnCart, lessItemsOnCart, removeItemFromCart } = useContext(CartContext)

    useEffect(() => {
        productosAgregados.forEach(prod => {
            if (prod === producto) {
                setContador(prod.cantidad)
            }
        });
        for (const i of producto.colores) {
            if (`${i.color}` === producto.ColorSelec) {
                for (const j of i.talles) {
                    if (`${j.talle}` === producto.TalleSelec) {
                        setStockReal(j.stock)
                    }
                }
            }
        }
    }, [producto, productosAgregados])

    const moreItems = () => {
        if (contador > stockReal) {
            swal('No quedan mas productos en stock!')
        } else {
            setContador(contador + 1)
            moreItemsOnCart(producto.id, 1, producto.ColorSelec, producto.TalleSelec)
        }
    }

    const lessItems = () => {
        if (contador <= 1) {
            swal('Has eliminado el producto de tu carrito!')
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
