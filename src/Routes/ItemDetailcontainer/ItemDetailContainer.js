import { useParams } from "react-router-dom";
import ItemDetails from "../../Components/ItemDetails/ItemDetails";

const ItemDetailContainer = () => {

    const {id} = useParams()

    return (
        <div>
            <ItemDetails idProd={id} />
        </div>
    )
}

export default ItemDetailContainer;