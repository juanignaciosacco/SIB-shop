import './FiltrosTienda.css'

const FiltrosTienda = ({ sweaters, camisas, remeras, onClickSweaters, onClickCamisas, onClickRemeras }) => {

    const sweatersHandler = () => {
        onClickSweaters(!sweaters)
    }

    const camisasHandler = () => {
        onClickCamisas(!camisas)
    }

    const remerasHandler = () => {
        onClickRemeras(!remeras)
    }

    return (
        <div className='filtrosTienda'>
            <ul className='filtrosItems'>
                {sweaters ? (
                    <li className='itemFiltro itemFiltro-active' onClick={sweatersHandler}>Sweaters y Buzos</li>
                ):(
                    <li className='itemFiltro' onClick={sweatersHandler}>Sweaters y Buzos</li>
                )}
                {camisas ? (
                    <li className='itemFiltro itemFiltro-active' onClick={camisasHandler}>Camisas</li>
                ):(
                    <li className='itemFiltro' onClick={camisasHandler}>Camisas</li>
                )}
                {remeras ? (
                    <li className='itemFiltro itemFiltro-active' onClick={remerasHandler}>Remeras y Tops</li>
                ):(
                    <li className='itemFiltro' onClick={remerasHandler}>Remeras y Tops</li>
                )}
            </ul>
        </div>
    )
}

export default FiltrosTienda;