import './Navbar.css'
import ImgLogo1 from '../../assets/logo1.png'
import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { AdminContext } from '../../Contextos/AdminContext'
import { CartContext } from '../../Contextos/CartContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarsStaggered, faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

    const [showPerfil, setShowPerfil] = useState()
    const [isCollapsed, setIsCollapsed] = useState()
    const [totalItemsWidget, setTotalItemsWidget] = useState(0)
    const [showNabar, setShowNavbar] = useState()
    const { logged, adminIsLogged } = useContext(AdminContext)
    const { totalItems } = useContext(CartContext)

    useEffect(() => {
        setTotalItemsWidget(totalItems)
    }, [totalItems])


    const userWidgetClickHandler = () => {
        showPerfil ? setShowPerfil(false) : setShowPerfil(true)
    }

    const logoutClickHandler = () => {
        adminIsLogged()
    }

    const showNavbarItems = () => {
        showNabar ? setShowNavbar(false) : setShowNavbar(true)
    }

    const handleResize = () => {
        if (window.innerWidth <= 768) {
          setIsCollapsed(true);
          setShowNavbar(false);
        } else if (window.innerWidth >= 770 && window.innerWidth <= 784) {
            setIsCollapsed(true);
            setShowNavbar(false);
        } else {
          setIsCollapsed(false);
          setShowNavbar(true);
        }
      };
    
      useEffect(() => {
        // handleResize();
        window.addEventListener('resize', handleResize);
        console.log('hola')
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <div>
            <nav className={`navbar ${isCollapsed ? 'collapsed' : ''}`}>
                {isCollapsed && <div className='imgLogoSib'><img src={ImgLogo1} alt='Logo SIB'/></div>}
                {isCollapsed && <button className='btn btn-bars' onClick={showNavbarItems}><FontAwesomeIcon icon={faBarsStaggered} /></button>}
                <ul className={`${showNabar ? 'navbarItems' : 'ocultable'}`}>
                    <li><img src={ImgLogo1} alt='Logo SIB'/></li>
                    <Link to={'/'}><li >Inicio</li></Link>
                    <Link to={'/tienda'}><li >Tienda</li></Link>
                    <Link to={'/contacto'}><li >Contacto</li></Link>
                    <div className='widgets'>
                        <Link to={'carrito'}>
                            <li>
                                <div className='widget'>
                                    {totalItemsWidget !== 0 && totalItemsWidget}
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </div>
                            </li>
                        </Link>
                        <li  onClick={userWidgetClickHandler}>
                            <div className='widget-user'>
                                <div className='widget'>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div>
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
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar