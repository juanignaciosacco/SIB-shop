import './ItemList.css'
import { getDocs, collection, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import UploadItem from '../../Components/UploadItem/UploadItem'


const ItemList = ({isLogged, nuevosIngresos}) => {

    const [productos, setProductos] = useState([])
    const [nuevosProd, setNuevosProds] = useState([])

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

    return (
        <div>
            {nuevosIngresos ? (
                <div className='nuevosIngresosItemList'>
                    {productos.map((prod) => (
                        prod.NuevoIngreso === 'true' && <ItemCard title={prod.Nombre} image={prod.imgUrl} description={prod.Descripcion} price={prod.Precio} isLogged={isLogged} key={prod.id} id={prod.id} />
                        ))}
                </div>
            ):(
                <div className='itemList'>
                    {productos.map((prod) => (
                        <ItemCard title={prod.Nombre} image={prod.imgUrl} description={prod.Descripcion} price={prod.Precio} isLogged={isLogged} key={prod.id} id={prod.id} />
                    ))}
                    {isLogged && <UploadItem />}
                </div>
                )}
        </div>
    )
}

export default ItemList;