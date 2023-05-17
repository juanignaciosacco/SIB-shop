import React, { useState } from "react";
import './CarouselItemDetail.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CarouselItemDetail = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

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
