import './ItemList.css'
import { getDocs, collection, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import UploadItem from '../../Components/UploadItem/UploadItem'


const ItemList = ({isLogged, nuevosIngresos}) => {

    const [productos, setProductos] = useState([])
    const [prodNuevos, setProdNuevos] = useState([])

    useEffect(() => {
        const db = getFirestore()
        const prodCollection = collection(db, 'productos')
        getDocs(prodCollection).then((snapshot) => {
            const arrayProds = snapshot.docs.map((prod) => (
                {
                    id: prod.id,
                    ...prod.data()
                }
                ))
                setProductos(arrayProds)
        })
        .catch((error) => console.log(error))
    })

    useEffect(() => {
        const arrayNuevos = productos.filter((prod) => (
            prod.NuevoIngreso === 'si'))
            setProdNuevos(arrayNuevos)
    }, [productos])

    return (
        <div>
            {nuevosIngresos ? (
                <div className='nuevosIngresosItemList'>
                    {prodNuevos.map((prod) => (
                            <ItemCard producto={prod} isLogged={isLogged} key={prod.id}  />
                            ))}
                </div>
            ):(
                <div className='itemList'>
                    {productos.map((prod) => (
                        <ItemCard producto={prod} isLogged={isLogged} key={prod.id} />
                    ))}
                </div>
                )}
                
                {isLogged && <UploadItem />}
        </div>
    )
}

export default ItemList;