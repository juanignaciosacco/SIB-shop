import ItemList from "../../Components/ItemList/ItemList";

const ItemListContainer = () => {

    return (
        <div>
            <ItemList isLogged={true} nuevosIngresos={false}/>
        </div>)
}

export default ItemListContainer;