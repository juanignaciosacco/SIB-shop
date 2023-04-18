import './Navbar.css'
import ImgLogo1 from '../../assets/logo1.png'
import Cartwidget from '../CartWidget/Cartwidget'

const Navbar = () => {

    return (
        <div>
            <nav className="navbar">
                <ul className='navbarItems'>
                    <li><img src={ImgLogo1} /></li>
                    <li>Inicio</li>
                    <li>Tienda</li>
                    <li>Contacto</li>
                    <li><Cartwidget /></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar