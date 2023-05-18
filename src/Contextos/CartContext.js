import React, { useState } from "react";

const CartContext = React.createContext()

const ItemsProvider = ({ children }) => {

    const [productosAgregados, setProductos] = useState([])
    const [precioTotal, setPrecioTotal] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [preferenceId, setPreferenceId] = useState(null)
    const [colorS, setColorS] = useState()

    const colorSelectHandler = (color) => {
        setColorS(color)
        console.log(colorS)
    }

    const addItemToCart = (producto) => {
        if (productosAgregados.length === 0) {
            setProductos([...productosAgregados, producto])
        } else {
            let found = false
            productosAgregados.forEach((prod) => {
                if (prod.id === producto.id) {
                   producto.quantity += parseInt(prod.quantity)
                   found = true
                }
            })
            found === false && setProductos([...productosAgregados, producto])
            console.log(productosAgregados)
        }
        setPrecioTotal(precioTotal + (producto.price * producto.quantity))
        setTotalItems(totalItems + producto.quantity)
    }

    const moreItemsOnCart = (id, cantidad) => {
        productosAgregados.forEach((prod) => {
            if (prod.id === id) {
                prod.quantity += parseInt(cantidad)
                setTotalItems(totalItems + cantidad)
                setPrecioTotal(precioTotal + parseInt(prod.price))
            }
        })
    }
    const lessItemsOnCart = (id, cantidad) => {
        productosAgregados.forEach((prod) => {
            if (prod.id === id) {
                prod.quantity -= parseInt(cantidad)
                setTotalItems(totalItems - cantidad)
                setPrecioTotal(precioTotal - parseInt(prod.price))

            }
        })
    }

    const removeItemFromCart = (prodId, precio, cantidad) => {
        const nuevaListaProds = productosAgregados.filter(prod => prod.id !== prodId)
        setPrecioTotal(precioTotal - parseInt(precio))
        setTotalItems(totalItems - cantidad)
        setProductos(nuevaListaProds)
    }

    const clearAllItems = () => {
        setProductos([])
        setPrecioTotal(0)
        setTotalItems(0)
    }


    return (
        <div>
            <CartContext.Provider value={{addItemToCart, removeItemFromCart, clearAllItems, moreItemsOnCart, colorSelectHandler, colorS, lessItemsOnCart, setPreferenceId, preferenceId, productosAgregados, precioTotal, totalItems}}>
                {children}
            </CartContext.Provider>
        </div>
    )
}

export {CartContext, ItemsProvider}