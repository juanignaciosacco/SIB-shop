import './Navbar.css'
import ImgLogo1 from '../../assets/logo1.png'
import Cartwidget from '../CartWidget/Cartwidget'
import { Link } from 'react-router-dom'
import UserWidget from '../UserWidget/UserWidget'
import { useContext, useState } from 'react'
import { AdminContext } from '../../Contextos/AdminContext'

const Navbar = () => {

    const [showPerfil, setShowPerfil] = useState()
    const { logged, adminIsLogged } = useContext(AdminContext)

    const userWidgetClickHandler = () => {
        showPerfil ? setShowPerfil(false) : setShowPerfil(true)
    }

    const logoutClickHandler = () => {
        adminIsLogged()
    }

    return (
        <div>
            <nav className="navbar">
                <ul className='navbarItems'>
                    <li><img src={ImgLogo1} alt='Logo SIB'/></li>
                    <li><Link to={'/'}>Inicio</Link></li>
                    <li><Link to={'/tienda'}>Tienda</Link></li>
                    <li><Link to={'/contacto'}>Contacto</Link></li>
                    <div className='widgets'>
                        <li><Cartwidget /></li>
                        <li onClick={userWidgetClickHandler}><UserWidget />
                        {showPerfil ? (
                            logged ? (
                                <ul className='profileMenu'>
                                    <li onClick={logoutClickHandler}>Logout</li>
                                </ul>
                            ):(
                                <ul className='profileMenu'>
                                    <li><Link to={'/login'}>Login</Link></li>
                                </ul>
                            )
                        ):(
                            <ul className='profileMenu-hidden'>
                                <li><Link to={'/login'}>Login</Link></li>
                                <li><Link to={'/login'}>Logout</Link></li>
                            </ul>
                        )}
                            </li>
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar