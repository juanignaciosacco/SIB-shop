import './Home.css'
import video from '../../assets/video.mp4'
import video2 from '../../assets/video4.mp4'
// import sib from '../../assets/sib rosa transp.png'
import NuevosIngresos from '../../Components/NuevosIngresos/NuevosIngresos'
// import WhatsappWidget from '../../Components/WhatsappWidget/WhatsappWidget'
// import InstagramWidget from '../../Components/InstagraWidget/InstagramWidget'


const Home = () => {

    return (
        <div className='home'>
            <div>
                <div className='imgContainerPortada'> 
                    {/* <div className='l'>
                        <img src={sib} />
                        <div className='b'>
                            <WhatsappWidget />
                            <InstagramWidget />
                        </div>
                    </div> */}
                    <video controls loop muted playsInline width="410px">
                        <source src={video} type='video/mp4'/>
                    </video>
                    <video controls loop muted playsInline width="410px">
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