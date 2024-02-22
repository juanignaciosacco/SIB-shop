import React, { useEffect, useState } from "react";

const CartContext = React.createContext()

const ItemsProvider = ({ children }) => {

    const [productosAgregados, setProductos] = useState([])
    const [precioTotal, setPrecioTotal] = useState(0)
    const [totalItems, setTotalItems] = useState(0)
    const [preferenceId, setPreferenceId] = useState(null)
    const [addItem, setAddItem] = useState(false)
    const [prod, setProd] = useState({})

    const addItemToCart = (producto) => {
        setProd({
            nombreProd: producto.nombreProd,
            precioProd: producto.precioProd,
            cantidad: producto.quantity,
            talleProd: producto.TalleSelec,
            colorProd: producto.ColorSelec
        })
        setAddItem(!addItem)
        if (productosAgregados.length === 0) {
            setProductos([...productosAgregados, producto])
            setTotalItems(totalItems + producto.cantidad)
        } else {
            let found = false
            productosAgregados.forEach((prod) => {
                if (prod.id === producto.id && !found) {
                    if (prod.ColorSelec !== producto.ColorSelec) {
                        found = false
                    } else if (prod.ColorSelec === producto.ColorSelec && prod.TalleSelec !== producto.TalleSelec) {
                        found = false
                    } else if (prod === producto) {
                        prod.quantity++
                        found = true
                        setTotalItems(totalItems + 1)
                    }
                }
            })
            if (found === false) {
                setProductos([...productosAgregados, producto])
                setTotalItems(totalItems + producto.cantidad)
            }
        }
        setPrecioTotal(precioTotal + (producto.precioProd * producto.cantidad))
    }

    const moreItemsOnCart = (id, cantidad, color, talle) => {
        productosAgregados.forEach((prod) => {
            if (prod.id === id && prod.talleProd === talle && prod.colorProd === color) {
                prod.cantidad += parseInt(cantidad)
                setPrecioTotal(precioTotal + parseInt(prod.precioProd))
            }
        })
        setTotalItems(totalItems + cantidad)
        actualizarStock(id, 'resta', false)
    }

    const lessItemsOnCart = (id, cantidad, color, talle) => {
        productosAgregados.forEach((prod) => {
            if (prod.id === id && prod.talleProd === talle && prod.colorProd === color) {
                prod.cantidad -= parseInt(cantidad)
                setTotalItems(totalItems - cantidad)
                setPrecioTotal(precioTotal - parseInt(prod.precioProd))
            }
        })
        actualizarStock(id, 'suma', false)
    }

    const removeItemFromCart = (product) => {
        const nuevaListaProds = productosAgregados.filter(prod => prod !== product)
        setPrecioTotal(precioTotal - parseInt(product.precioProd))
        setTotalItems(totalItems - product.cantidad)
        setProductos(nuevaListaProds)
        actualizarStock(product.id, 'suma')
    }

    const clearAllItems = () => {
        setProductos([])
        setPrecioTotal(0)
        setTotalItems(0)
    }

    const actualizarStock = (id, operacion, desdeAddItem) => {
        productosAgregados.forEach((prod) => {
            if (id === prod.id) {
                let colorrr = prod.colores
                for (const i of colorrr) {
                    if (i.color === prod.ColorSelec) {
                        for (const j in i.talles) {
                            if (j.talle === prod.TalleSelec) {
                                if (desdeAddItem) {
                                    i.sizes[j] = i.sizes[j] - 1
                                } else {
                                    operacion === 'resta' ? i.sizes[j] = i.sizes[j] - 1 : i.sizes[j] = i.sizes[j] + 1
                                }
                            }
                        }
                    }
                }
            }
        })
    }

    useEffect(() => {
        if (Object.keys(productosAgregados).length !== 0) {
            localStorage.setItem('productosAgregados', JSON.stringify(productosAgregados))
            localStorage.setItem('precioTotal', JSON.stringify(precioTotal))
        }
    }, [productosAgregados, precioTotal])

    useEffect(() => {
        actualizarStock(prod.id, 'resta', true)
        // eslint-disable-next-line
    }, [addItem])

    return (
        <div>
            <CartContext.Provider value={{ addItemToCart, removeItemFromCart, clearAllItems, moreItemsOnCart, lessItemsOnCart, setPreferenceId, preferenceId, productosAgregados, precioTotal, totalItems }}>
                {children}
            </CartContext.Provider>
        </div>
    )
}

export { CartContext, ItemsProvider };
