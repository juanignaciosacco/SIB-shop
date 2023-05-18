import './ItemList.css'
import { getDocs, collection, getFirestore, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import ItemCard from '../ItemCard/ItemCard';
import UploadItem from '../../Components/UploadItem/UploadItem'


const ItemList = ({isLogged, nuevosIngresos, isFiltered, remerasF, camisasF, sweatersF}) => {

    const [productos, setProductos] = useState([])
    const [prodNuevos, setProdNuevos] = useState([])
    const [prodFiltrados, setProdFiltrados] = useState([])
    const db = getFirestore()
    const prodCollection = collection(db, 'productos')

    useEffect(() => {
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
        if (remerasF) {
            const arryF = prodFiltrados
            const q = query(prodCollection, where('category_id', '==', 'RemerasYTops'))
            getDocs(q).then((snapshot) => {
                const arrayFiltrados = snapshot.docs.map((prod) => (
                    {
                        id: prod.id,
                        ...prod.data()
                    }
                ))
                if ((camisasF || sweatersF) || (camisasF && sweatersF)) {
                    arrayFiltrados.forEach(prod => {
                       const si =  arryF.some((item) => item.id === prod.id)
                       !si && arryF.push(prod)
                    })
                    setProdFiltrados(arryF)
                } else {
                    setProdFiltrados(arrayFiltrados)
                }
            })
        } else if (camisasF) {
            const arryF = prodFiltrados
            const q = query(prodCollection, where('category_id', '==', 'Camisas'))
            getDocs(q).then((snapshot) => {
                const arrayFiltrados = snapshot.docs.map((prod) => (
                    {
                        id: prod.id,
                        ...prod.data()
                    }
                ))
                if ((sweatersF || remerasF) || (sweatersF && remerasF)) {
                    arrayFiltrados.forEach(prod => {
                       const si =  arryF.some((item) => item.id === prod.id)
                       !si && arryF.push(prod)
                    })
                    setProdFiltrados(arryF)
                } else {
                    setProdFiltrados(arrayFiltrados)
                }
            })
        } else if (sweatersF) {
            const arryF = prodFiltrados
            const q = query(prodCollection, where('category_id', '==', 'SweatersYBuzos'))
            getDocs(q).then((snapshot) => {
                const arrayFiltrados = snapshot.docs.map((prod) => (
                    {
                        id: prod.id,
                        ...prod.data()
                    }
                ))
                if ((camisasF || remerasF) || (camisasF && remerasF)) {
                    arrayFiltrados.forEach(prod => {
                       const si =  arryF.some((item) => item.id === prod.id)
                       !si && arryF.push(prod)
                    })
                    setProdFiltrados(arryF)
                } else {
                    setProdFiltrados(arrayFiltrados)
                }
            })
        } 
        // eslint-disable-next-line
    }, [remerasF, camisasF, sweatersF])
    
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
                isFiltered ? (
                    <div className='itemList'>
                        {prodFiltrados.map((prod) => (
                            <ItemCard producto={prod} isLogged={isLogged} key={prod.id} />
                        ))}
                    </div>
                ):(
                    <div className='itemList'>
                        {productos.map((prod) => (
                            <ItemCard producto={prod} isLogged={isLogged} key={prod.id} />
                        ))}
                    </div>
                )
                )}
                {isLogged && <UploadItem />}
        </div>
    )
}

export default ItemList;