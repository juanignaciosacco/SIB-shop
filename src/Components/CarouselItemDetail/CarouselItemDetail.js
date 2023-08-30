import React, { useEffect } from "react";
import './CarouselItemDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CarouselItemDetail = ({ images, colorP, currentIndex, setCurrentIndex }) => {

  useEffect(() => {
    let found = false

    switch (colorP) {
      case 'white': found = images.find(image => image.includes('blanco'))
        break;
      case 'beige': found = images.find(image => image.includes('beige'))
        break;
      case 'yellow': found = images.find(image => image.includes('amarillo'))
        break;
      case 'pink': found = images.find(image => image.includes('rosado'))
        break;
      case 'green': found = images.find(image => image.includes('verde'))
        break;
      case 'violet': found = images.find(image => image.includes('violeta'))
        break;
      case 'blue': found = images.find(image => image.includes('azul'))
        break;
      case 'black': found = images.find(image => image.includes('negro'))
        break;
      case 'red': found = images.find(image => image.includes('rojo'))
        break;
      default: found = false;
        break;
    }
    let indx = images.indexOf(found)
    indx !== -1 && moveToIndex(indx)
    // eslint-disable-next-line
  }, [colorP, images])

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const moveToIndex = (index) => {
    setCurrentIndex(index);
  }

  return (
    <div className="carousel-container">
      <button onClick={handlePrev}><FontAwesomeIcon className="flechasCarousel"
        icon={faCircleArrowLeft} /></button>
      <div className="carousel-content">
        <img className="imgCarousel"
          src={
            images[currentIndex]
          }
          alt="Carousel" />
        <div className="carousel-thumbnails">
          {
            images.map((image, index) => (
              <img key={index}
                src={image}
                alt="Thumbnail"
                className={
                  `carousel-thumbnail ${index === currentIndex ? "selected" : ""
                  }`
                }
                onClick={
                  () => handleThumbnailClick(index)
                } />
            ))
          } </div>
      </div>
      <button onClick={handleNext}><FontAwesomeIcon className="flechasCarousel"
        icon={faCircleArrowRight} /></button>
    </div>
  );
}
export default CarouselItemDetail;
