import './ObtenerOrdenes.css'
import React, { useEffect, useState, useContext } from 'react'
import { getDocs, collection, getFirestore, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore'
import { AdminContext } from '../../Contextos/AdminContext'
import swal from 'sweetalert'
import OrdenCard from '../OrdenCard/OrdenCard'
import { useParams } from 'react-router-dom'

const ObtenerOrdenes = () => {

    const db = getFirestore()
    const ordenesCollection = collection(db, 'ordenes')
    const { logged } = useContext(AdminContext)
    const [ordenes, setOrdenes] = useState([])
    const [idOrdenBuscada, setIdOrdenBuscada] = useState()
    const [ordenBuscada, setOrdenBuscada] = useState([])
    const [busquedaNormalizada, setBusquedaNormalizada] = useState()
    const [ordenComprador, setOrdenComprador] = useState({})
    const  { idOrdenComprador } = useParams()

    useEffect(() => {
        if (logged) {
            getDocs(ordenesCollection).then((snapshot) => {
                const arrayProds = snapshot.docs.map((prod) => ({
                    id: prod.id,
                    ...prod.data()
                }))
                setOrdenes(arrayProds)
            }).catch((error) => console.log(error))
        } else if (idOrdenComprador !== undefined) {
            const q = query(collection(ordenesCollection), where("idOrden", "==", `${idOrdenComprador}`));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
                setOrdenComprador(doc.id, ...doc.data())
            });
        }
    }, [logged, ordenesCollection])

    const marcarOrden = (ev) => {
        swal({
            text: "Segura que desea modificar el estado de la orden?",
            buttons: ["No", "Si"]
          }).then((value) => {
            if (value) {
                ordenes.forEach((orden) => {
                    if (orden.id === ev) {
                        const prod = doc(ordenesCollection, `${ev}`)
                        if (orden.ordenEntregada === false) {
                        updateDoc(prod, {
                            ordenEntregada: true,
                            estadoDePago: "Confirmado"
                        })
                    } else {
                        updateDoc(prod, {
                            ordenEntregada: false
                        })
                    } 
                    }
                })
            }
          })
    }

    const buscarOrden = (ev) => {
        setIdOrdenBuscada(ev.target.value)
    }
    const deleteOrden = ( ordenId ) => {
        deleteDoc(doc(ordenesCollection, `${ordenId}`))
    }

    useEffect(() => {
        if (idOrdenBuscada !== undefined) {
            let normalizar = idOrdenBuscada.toString()
            normalizar =  normalizar.toLowerCase()
            setBusquedaNormalizada(normalizar)
        }
    }, [idOrdenBuscada]);

    useEffect(() => {
        setOrdenBuscada(ordenes.filter((orden) => orden.idPago === busquedaNormalizada || orden.idOrden === busquedaNormalizada || orden.usuario.nombre === busquedaNormalizada || orden.usuario.telefono === busquedaNormalizada))
        // eslint-disable-next-line
    }, [busquedaNormalizada])

    return (
        <div id='ordenesContainer'>
            <h1>Ordenes</h1>
            {logged ? (
                Object.keys(ordenes).length === 0 ? (
                    <p>Debe iniciar sesion para acceder a las ordenes</p>
                ) : (
                    <div>
                        <div className='buscadorDeOrdenes'>
                            <h3>Buscar orden</h3>
                            <input className='formInputs' type='text' placeholder='ID Orden o ID Pago o Nombre usuario o Telefono usuario' onChange={buscarOrden}/>
                        </div>
                        <div>
                            {ordenBuscada.length !== 0 ? (
                                <div className='historialOrdenesContainer'>
                                    {ordenBuscada.map((orden) => (
                                        <OrdenCard orden={orden} marcarOrden={marcarOrden} deleteOrden={deleteOrden} key={ordenBuscada[0].id} />
                                    ))}
                                </div>
                            ) : (
                                <div className='historialOrdenesContainer'>
                                    {ordenes.map((orden) => (
                                        <OrdenCard orden={orden} marcarOrden={marcarOrden} deleteOrden={deleteOrden} key={orden.id} />
                                    ))}
                                </div>
                            )}         
                        </div>
                    </div>
                )
            ):(

            )}
            
        </div>
    )
}

export default ObtenerOrdenes