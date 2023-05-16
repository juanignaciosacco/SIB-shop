import { useContext, useState } from "react";
import ItemList from "../../Components/ItemList/ItemList";
import { AdminContext } from "../../Contextos/AdminContext";
import FiltrosTienda from "../../Components/FiltrosTienda/FiltrosTienda";


const ItemListContainer = () => {

    const [isSweatersFiltered, setSweatersFiltered] = useState(false)
    const [isCamisasFiltered, setCamisasFiltered] = useState(false)
    const [isRemerasFiltered, setRemerasFiltered] = useState(false)
    const [isFiltered, setIsFiltered] = useState(false)
    const { logged } = useContext(AdminContext)

    const sweatersHandler = () => {
        setSweatersFiltered(!isSweatersFiltered)
        if(!isFiltered) {
            setIsFiltered(!isFiltered)
        } else if ( (isFiltered && isCamisasFiltered) || (isFiltered && isRemerasFiltered) || (isFiltered && isCamisasFiltered && isRemerasFiltered)) {
            setIsFiltered(isFiltered)
        } else {
            setIsFiltered(!isFiltered)
        }
    }

    const camisasHandler = () => {
        setCamisasFiltered(!isCamisasFiltered)
        if(!isFiltered) {
            setIsFiltered(!isFiltered)
        } else if ( (isFiltered && isSweatersFiltered) || (isFiltered && isRemerasFiltered) || (isFiltered && isSweatersFiltered && isRemerasFiltered)) {
            setIsFiltered(isFiltered)
        } else {
            setIsFiltered(!isFiltered)
        }
    }

    const remerasHandler = () => {
        setRemerasFiltered(!isRemerasFiltered)
        if(!isFiltered) {
            setIsFiltered(!isFiltered)
        } else if ( (isFiltered && isCamisasFiltered) || (isFiltered && isSweatersFiltered) || (isFiltered && isCamisasFiltered && isSweatersFiltered)) {
            setIsFiltered(isFiltered)
        } else {
            setIsFiltered(!isFiltered)
        }
    }

    return (
        <div>
            <FiltrosTienda sweaters={isSweatersFiltered} camisas={isCamisasFiltered} remeras={isRemerasFiltered} onClickSweaters={sweatersHandler} onClickCamisas={camisasHandler} onClickRemeras={remerasHandler} />
            <ItemList isLogged={logged} nuevosIngresos={false} isFiltered={isFiltered} sweatersF={isSweatersFiltered} camisasF={isCamisasFiltered} remerasF={isRemerasFiltered}/>
        </div>)
}

export default ItemListContainer;