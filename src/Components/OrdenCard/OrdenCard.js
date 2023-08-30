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
                        <p><b>Nombre</b> Completo: {orden.usuario.nombre} {orden.usuario.apellido}</p>
                        <p><b>Emial:</b> {orden.usuario.email}</p>
                        <p><b>Telefono:</b> {orden.usuario.telefono}</p>
                        <h3>Direccion: </h3>
                        <p><b>Calles:</b> {orden.usuario.calles}</p>
                        <p><b>Numero:</b> {orden.usuario.numero}</p>
                        <p><b>Localidad:</b> {orden.usuario.localidad}</p>
                    </div>
                </div>
                <div>
                    <hr />
                    <h3>Productos:</h3>
                    {orden.productos.map((prod, id) => (
                        <div key={id}>
                            <p><b>Producto:</b> {prod.title}</p>
                            <p><b>Talle:</b> {prod.TalleSelec}</p>
                            <p><b>Cantidad:</b> {prod.quantity}</p>
                            <p><b>Color:</b> {prod.ColorSelec}</p>
                            <p><b>Precio Total:</b> {prod.precioTotal}</p>
                            <hr />
                        </div>
                    ))}
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