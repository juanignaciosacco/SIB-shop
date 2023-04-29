import { useContext } from "react";
import ItemList from "../../Components/ItemList/ItemList";
import { AdminContext } from "../../Contextos/AdminContext";


const ItemListContainer = () => {

    const { logged } = useContext(AdminContext)

    console.log(logged)

    return (
        <div>
            <ItemList isLogged={logged} nuevosIngresos={false}/>
        </div>)
}

export default ItemListContainer;