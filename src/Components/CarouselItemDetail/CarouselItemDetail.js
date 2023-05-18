import React, { useContext, useEffect, useState } from "react";
import './CarouselItemDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../Contextos/CartContext";

const CarouselItemDetail = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [colorES, setColorES] = useState()
  const { colorS } = useContext(CartContext)

  useEffect(() => {
    switch (colorS) {
      case 'white':
        setColorES('blanco')
        break;
      case 'beige':
        setColorES('beige')
        break;
      case 'yellow':
        setColorES('amarillo')
        break;
      case 'pink':
        setColorES('rosado')
        break;
      case 'green':
        setColorES('verde')
        break;
      case 'violet':
        setColorES('violeta')
        break;
      case 'blue':
        setColorES('azul')
        break;
      case 'black':
        setColorES('negro')
        break;
      case 'red':
        setColorES('rojo')
        break;
      default:
        setColorES('')
        break;
    }
    let found = images.find(image => image.includes(`${colorES}`))
    let indx = images.indexOf(found)
    moveToIndex(indx)
  }, [colorS])

  const handleNext = () => {
    // setCurrentIndex()
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    console.log('hola')
    console.log(currentIndex)
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    console.log(currentIndex)
  };

  const moveToIndex = (index) => {
    setCurrentIndex(index);
  }

  return (
    <div className="carousel-container">
        <button onClick={handlePrev}><FontAwesomeIcon className="flechasCarousel" icon={faCircleArrowLeft} /></button>
        <div className="carousel-content">
            <img className="imgCarousel" src={images[currentIndex]} alt="Carousel" />
        <div className="carousel-thumbnails">
            {images.map((image, index) => (
            <img
                key={index}
                src={image}
                alt="Thumbnail"
                className={`carousel-thumbnail ${index === currentIndex ? "selected" : ""}`}
                onClick={() => handleThumbnailClick(index)}
            />
            ))}
        </div>
        </div>
        <button onClick={handleNext}><FontAwesomeIcon className="flechasCarousel" icon={faCircleArrowRight} /></button>
    </div>
    );
}
export default CarouselItemDetail;
