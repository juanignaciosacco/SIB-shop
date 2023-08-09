import { useContext } from "react";
import { CartContext } from "../../Contextos/CartContext";
import { Link } from "react-router-dom";

const ResumenDeCompra = ({pagoMP, pagoET, onClickCancel, onClickET, onClickMP, onClickVaciar, onClickVolver }) => {

    const { productosAgregados, precioTotal, totalItems} = useContext(CartContext)
    

    const handleClickET = () => {
        onClickET()
    }

    const handleClickMP = () => {
        onClickMP()
    }

    const handleClickCancel = () => {
        onClickCancel()
    }

    const vaciarClickHandler = () => {
        onClickVaciar()
    }

    const clickVolver = () => {
        onClickVolver()
    }

    return (
        <div>
         {!pagoET && !pagoMP ? (
             <div id='cartInfo'>
                 <h3>Informacion del Carrito</h3>
                 <p>Cantidad de productos: {totalItems}</p>
                 <p>Precio total: ${precioTotal}</p>
                 <button className='btn' id='btnCheckout' onClick={handleClickMP}>Pagar con debito</button>
                 <button className='btn' id='btnCheckout' onClick={handleClickET}>Pagar en efectivo / transferencia</button>
                 <button className='btn' onClick={vaciarClickHandler}>Vaciar carrito</button>
                 <br></br>
                 <button className="btn" onClick={clickVolver}>Volver</button>
             </div>
         ):(
            <div>
                <div>
                    {pagoET && (
                        <div className='pagoET'>
                            <div>
                                <h2>Resumen de compra</h2>
                                {productosAgregados.map((prod, index) => (
                                    <div className='item' key={index}>
                                        {prod.title} <span>Cantidad: {prod.quantity}</span>
                                        <p>Color: <span>{prod.ColorSelec}</span></p>
                                        <p>Talle: <span>{prod.TalleSelec}</span></p>
                                        <p>Precio: <span>${prod.price}</span></p>
                                        <hr />
                                    </div>
                                ))}
                                <p>Total: <span>${precioTotal}</span></p>
                            </div>
                            <p>Debes contactarte con el administrador para coordinar el pago</p>
                            <Link to={`/feedback/true`}><button className='btn'>Contactate</button></Link>
                            <button className='btn btn-cancelar' onClick={handleClickCancel}>Cancelar</button>
                        </div>
                    )}
                </div>
                <div>
                    {pagoMP && (
                        <div className='pagoET'>
                            <div>
                                <h2>Resumen de compra</h2>
                                {productosAgregados.map((prod, index) => (
                                    <div className='item' key={index}>
                                        {prod.title} <span>Cantidad: {prod.quantity}</span>
                                        <p>Color: <span>{prod.ColorSelec}</span></p>
                                        <p>Talle: <span>{prod.TalleSelec}</span></p>
                                        <p>Precio: <span>${prod.price}</span></p>
                                        <hr />
                                    </div>
                                ))}
                                <p>Total: <span>${precioTotal}</span></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
         )}
        </div>
    )
}

export default ResumenDeCompra;