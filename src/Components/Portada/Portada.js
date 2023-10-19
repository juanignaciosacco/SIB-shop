import './Portada.css';
import video from '../../assets/video.mp4'
import video2 from '../../assets/video4.mp4'
import img1 from '../../assets/IMG_6156.jpg';
import img2 from '../../assets/IMG_6178.jpg';
import { useEffect, useState } from 'react';

const Portada = () => {

    const[isSmallScreen, setIsSmallScreen] = useState(false);

    const handleChangeFrontPage = () => {
        if (window.innerWidth < 854) {
            setIsSmallScreen(true)
        } else {
            setIsSmallScreen(false)
        }
    }

    useEffect(() => {
        handleChangeFrontPage();
        window.addEventListener('resize', handleChangeFrontPage);
        return () => {
            window.removeEventListener('resize', handleChangeFrontPage);
        };
    }, [])

  return (
    <>
        {!isSmallScreen ? (
            <div className='imgContainerPortada'>
                <video controls loop muted playsInline >
                    <source src={video} type='video/mp4' />
                </video>
                <video controls loop muted playsInline>
                    <source src={video2} type='video/mp4' />
                </video>
            </div>
        ):(
            <div className='imgsPortada'>
                <div>
                    <img src={img1} alt='Imagen de portada 1'/>
                </div>
                <div>
                    <img src={img2} alt='Imagen de portada 2'/>
                </div>
            </div>
        )}
    </>
  )
}

export default Portada