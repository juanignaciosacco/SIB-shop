import './Home.css'
import image from '../../assets/image.jpg'
import NuevosIngresos from '../../Components/NuevosIngresos/NuevosIngresos'


const Home = () => {

    return (
        <div>
            <div >
                <img src={image} alt='Imagen portada'/>
            </div>
            <NuevosIngresos />
        </div>
        
    )
}

export default Home