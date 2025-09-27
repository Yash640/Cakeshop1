'use client';

import { useState } from 'react';

interface ImageGalleryProps {
  images: {
    src: string;
    alt: string;
    title: string;
    description: string;
    fallbackClass: string;
  }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div id="cakeCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#cakeCarousel"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      
      <div className="carousel-inner rounded-4 shadow-lg overflow-hidden">
        {images.map((image, index) => (
          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="cake-gallery-item position-relative">
              {!imageErrors[index] ? (
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="position-absolute w-100 h-100"
                  style={{objectFit: 'cover'}}
                  onError={() => handleImageError(index)}
                />
              ) : (
                <div className={`${image.fallbackClass} position-absolute w-100 h-100`}></div>
              )}
              <div className="overlay-dark position-absolute w-100 h-100"></div>
              <div className="container-fluid h-100 d-flex align-items-center justify-content-center">
                <div className="text-center text-white">
                  <h3 className="display-6 fw-bold mb-3">{image.title}</h3>
                  <p className="lead">{image.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="carousel-control-prev" type="button" data-bs-target="#cakeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#cakeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
