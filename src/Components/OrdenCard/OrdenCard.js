import React from 'react'

const OrdenCard = ({ orden, deleteOrden, marcarOrden, isLogged }) => {

    const marcarOrdenCard = (ev) => {
        marcarOrden(ev.target.parentElement.parentElement.id);
    }

    const delteDocCard = () => {
        deleteOrden(orden.id)
    }

    return (
        <div>
            <div id={orden.id} className={orden.estadoDePago === "Pendiente" ?
                'ordenEnHistorial ordenEnHistorial-rojo' : orden.ordenEntregada ?
                    'ordenEnHistorial ordenEnHistorial-verde' : 'ordenEnHistorial ordenEnHistorial-amarillo'} key={orden.id}>
                <h3>Orden: {orden.ordenEntregada ? 'Orden entregada' : 'Entrega pendiente'}</h3>
                <p><b>ID Orden:</b> {orden.idOrden}</p>
                <p><b>ID Pago:</b> {orden.idPago}</p>
                <p><b>Forma de pago:</b> {orden.pago}</p>
                <p><b>Estado de pago:</b> {orden.estadoDePago}</p>
                <div>
                    <h3>Usuario</h3>
                    <div>
                        <p><b>Nombre Completo:</b> {orden.userName} {orden.userLastName}</p>
                        <p><b>Emial:</b> {orden.userEmail}</p>
                        <p><b>Telefono:</b> {orden.userPhoneNumber}</p>
                        {/* <h3>Direccion: </h3>
                        <p><b>Calles:</b> {orden.usuario.calles}</p>
                        <p><b>Numero:</b> {orden.usuario.numero}</p>
                        <p><b>Localidad:</b> {orden.usuario.localidad}</p> */}
                    </div>
                </div>
                <div>
                    <hr />
                    <h3>Productos:</h3>
                    {orden.productos.map((prod, id) => (
                        <div key={id}>
                            <p><b>Producto:</b> {prod.nombreProd}</p>
                            <p><b>Talle:</b> {prod.talleProd}</p>
                            <p><b>Cantidad:</b> {prod.cantidad}</p>
                            <p><b>Color:</b> {prod.colorProd}</p>
                            <hr />
                        </div>
                    ))}
                    <p><b>Precio Total:</b> ${orden.precioTotal}</p>
                </div>
                {isLogged && (
                    <div className='btnsOrdenes'>
                        <button className='btn' onClick={marcarOrdenCard}>{orden.ordenEntregada ? 'Marcar como no entregada' : 'Marcar como entregada'}</button>
                        <button className='btn' onClick={delteDocCard}>Eliminar orden</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OrdenCard