import './ItemList.css'
import { getDocs, collection, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import ItemCard from '../ItemCard/ItemCard';

const ItemList = () => {

    const [productos, setProductos] = useState([])

    useEffect(() => {
        const db = getFirestore()
        const prodCollection = collection(db, 'productos')
        getDocs(prodCollection).then((snapshot) => {
            const arrayProds = snapshot.docs.map((prod) => ({
                id: prod.id,
                ...prod.data()
            }))
            setProductos(arrayProds)
        }).catch((error) => console.log(error))
    })


    return (
        <div className='itemList'>
            {productos.map((prod) => (
                <ItemCard title={prod.Nombre} image={prod.imgUrl} description={prod.Descripcion} price={prod.Precio} isLogged={true} key={prod.id} id={prod.id} />
            ))}
        </div>
    )
}

export default ItemList;