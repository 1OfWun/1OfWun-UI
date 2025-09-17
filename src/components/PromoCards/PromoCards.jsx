import React from 'react';
import './PromoCards.css';

const PromoCard = ({
  size = 'large', 
  title,
  subtitle,
  description,
  imageUrl,
  buttonText,
  buttonUrl  
}) => {
  return (
    <div className={`promo-card ${size}`} style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="card-overlay"></div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <h2 className="card-subtitle">{subtitle}</h2>
        {description && <p className="card-description">{description}</p>}
        {buttonText && (
          <a href={buttonUrl} className="card-button">
            {buttonText}
            </a>
          )}
      </div>
    </div>
  );
};

export default PromoCard;