import React, { useState } from "react";

const CartContext = React.createContext()

const ItemsProvider = ({ children }) => {

    const [productosAgregados, setProductos] = useState([])
    const [precioTotal, setPrecioTotal] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [preferenceId, setPreferenceId] = useState(null)

    const addItemToCart = (producto) => {
        if (productosAgregados.length === 0) {
            setProductos([...productosAgregados, producto])
            setTotalItems(totalItems + producto.quantity)
        } else {
            let found = false
            productosAgregados.forEach((prod) => {
                if (prod.id === producto.id && !found) {
                    if (prod.ColorSelec !== producto.ColorSelec) {
                        found = false
                    } else if (prod.ColorSelec === producto.ColorSelec && prod.TalleSelec !== producto.TalleSelec) {
                        found = false
                    } else  if (prod === producto) {
                        prod.quantity ++
                        found = true
                        setTotalItems(totalItems + 1)
                    }
                }
            })
            if (found === false) {
                setProductos([...productosAgregados, producto])
                setTotalItems(totalItems + producto.quantity)
            }
        }
        setPrecioTotal(precioTotal + (producto.price * producto.quantity))
    }

    const moreItemsOnCart = (id, cantidad, color, talle) => {
        productosAgregados.forEach((prod) => {
            if (prod.id === id && prod.TalleSelec === talle && prod.ColorSelec === color) {
                prod.quantity += parseInt(cantidad)
                setPrecioTotal(precioTotal + parseInt(prod.price))
            }
        })
        setTotalItems(totalItems + cantidad)
    }
    const lessItemsOnCart = (id, cantidad, color, talle) => {
        productosAgregados.forEach((prod) => {
            if (prod.id === id && prod.TalleSelec === talle && prod.ColorSelec === color) {
                prod.quantity -= parseInt(cantidad)
                setTotalItems(totalItems - cantidad)
                setPrecioTotal(precioTotal - parseInt(prod.price))
            }
        })
    }

    const removeItemFromCart = (product) => {
        const nuevaListaProds = productosAgregados.filter(prod => prod !== product)
        setPrecioTotal(precioTotal - parseInt(product.price))
        setTotalItems(totalItems - product.quantity)
        setProductos(nuevaListaProds)
    }

    const clearAllItems = () => {
        setProductos([])
        setPrecioTotal(0)
        setTotalItems(0)
    }

    return (
        <div>
            <CartContext.Provider value={{addItemToCart, removeItemFromCart, clearAllItems, moreItemsOnCart, lessItemsOnCart, setPreferenceId, preferenceId, productosAgregados, precioTotal, totalItems}}>
                {children}
            </CartContext.Provider>
        </div>
    )
}

export {CartContext, ItemsProvider}