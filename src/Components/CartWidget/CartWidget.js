import './CartWidget.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { CartContext } from '../../Contextos/CartContext'
import { useContext, useEffect, useState } from 'react'


const CartWidget = () => {

    const { totalItems } = useContext(CartContext)
    const [totalItemsWidget, setTotalItemsWidget] = useState(0)

    useEffect(() => {
        setTotalItemsWidget(totalItems)
    }, [totalItems])


    return (
        <div id='widget'>
            {totalItemsWidget !== 0 && totalItemsWidget}
            <FontAwesomeIcon icon={faCartShopping} />
        </div>
    )
}

export default CartWidget
