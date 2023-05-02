import React, { useState } from "react";

const CartContext = React.createContext()

const ItemsProvider = ({ children }) => {

    const [productosAgregados, setProductos] = useState([])
    const [precioTotal, setPrecioTotal] = useState(0)
    const [totalItems, setTotalItems] = useState(0)

    const addItemToCart = (producto) => {
        if (productosAgregados.length === 0) {
            setProductos([...productosAgregados, producto])
        } else {
            let found = false
            productosAgregados.forEach((prod) => {
                if (prod.id === producto.id) {
                   producto.Cantidad += prod.Cantidad
                   found = true
                }
            })
            found === false && setProductos([...productosAgregados, producto])
        }
        setPrecioTotal(precioTotal + (producto.Precio * producto.Cantidad))
        setTotalItems(totalItems + producto.Cantidad)
    }

    const moreItemsOnCart = (id, cantidad) => {
        productosAgregados.forEach((prod) => {
            if (prod.id === id) {
                prod.Cantidad += cantidad
                setTotalItems(totalItems + cantidad)
                setPrecioTotal(precioTotal + parseInt(prod.Precio))
            }
        })
    }
    const lessItemsOnCart = (id, cantidad) => {
        productosAgregados.forEach((prod) => {
            if (prod.id === id) {
                prod.Cantidad -= cantidad
                setTotalItems(totalItems - cantidad)
                setPrecioTotal(precioTotal - parseInt(prod.Precio))

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
            <CartContext.Provider value={{addItemToCart, removeItemFromCart, clearAllItems, moreItemsOnCart, lessItemsOnCart, productosAgregados, precioTotal, totalItems}}>
                {children}
            </CartContext.Provider>
        </div>
    )
}

export {CartContext, ItemsProvider}