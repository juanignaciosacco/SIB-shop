import './Home.css'
import video from '../../assets/video.mp4'
import video2 from '../../assets/video4.mp4'
import NuevosIngresos from '../../Components/NuevosIngresos/NuevosIngresos'


const Home = () => {

    return (
        <div className='home'>
            <div>
                <div className='imgContainerPortada'> 
                    <video controls loop muted playsInline >
                        <source src={video} type='video/mp4'/>
                    </video>
                    <video controls loop muted playsInline>
                        <source src={video2} type='video/mp4'/>
                    </video>
                </div>
                <h1>Conoce nuestros nuevos productos</h1>
                <div className='nuevosIngresos'>
                    <NuevosIngresos />
                </div>
            </div>
        </div>
        
    )
}

export default Home