import React, { useEffect, useState } from 'react'
import './ObtenerOrden.css'
import OrdenCard from '../OrdenCard/OrdenCard'
import { useParams } from 'react-router-dom'
import { query, where, collection, getDocs, getFirestore } from 'firebase/firestore'

//0042ac6b-3c86-4892-9eb4-6d4054576e4a
const ObtenerOrden = () => {

    const db = getFirestore()
    const ordenesCollection = collection(db, 'ordenes')
    const  { idOrdenComprador } = useParams()
    const [ordenComprador, setOrdenComprador] = useState({})

    useEffect(() => {
        const q = query(ordenesCollection, where("idOrden", "==", `${idOrdenComprador}`));
        getDocs(q)
        .then((querySnapshot) => {
            console.log()
            querySnapshot.forEach((doc) => {
                setOrdenComprador(doc.data())
            });
        })
        .catch((error) => console.log(error))
    }, [idOrdenComprador])



  return (
    <div className='ordenContainer'>
        <div className='historialOrdenesContainer'>
            {ordenComprador !== undefined ? (
                <OrdenCard orden={ordenComprador} key={ordenComprador.id}/>
            ):(
                <p>Esta orden no ingreso aun!</p>
            )}
        </div>
    </div>
  )
}

export default ObtenerOrden