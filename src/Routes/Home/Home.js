import './Home.css'
import Portada from '../../Components/Portada/Portada'
import NuevosIngresos from '../../Components/NuevosIngresos/NuevosIngresos'


const Home = () => {

    return (
        <div className='home'>
            <div>
                <Portada />
                <h1>Conoce nuestros nuevos productos</h1>
                <div className='nuevosIngresos'>
                    <NuevosIngresos />
                </div>
            </div>
        </div>

    )
}

export default Home