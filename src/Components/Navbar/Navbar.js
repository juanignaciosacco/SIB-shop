import './Navbar.css'
import ImgLogo1 from '../../assets/logo1.png'
import Cartwidget from '../CartWidget/Cartwidget'
import { Link } from 'react-router-dom'

const Navbar = () => {

    return (
        <div>
            <nav className="navbar">
                <ul className='navbarItems'>
                    <li><img src={ImgLogo1} alt='Logo SIB'/></li>
                    <li><Link to={'/'}>Inicio</Link></li>
                    <li><Link to={'/tienda'}>Tienda</Link></li>
                    <li>Contacto</li>
                    <li><Cartwidget /></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar