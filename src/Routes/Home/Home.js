import './Home.css'
import image from '../../assets/image.jpg'
import NuevosIngresos from '../../Components/NuevosIngresos/NuevosIngresos'

const Home = () => {

    return (
        <div className='home'>
            <div className='imgContainerPortada'> 
                <img src={image} alt='Imagen portada'/>
            </div>

            <h1>Conoce nuestros nuevos productos</h1>
            <div className='nuevosIngresos'>
                <NuevosIngresos />
            </div>
        </div>
        
    )
}

export default Home