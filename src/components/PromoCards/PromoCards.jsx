import React from 'react';
import './PromoCards.css';

const PromoCard = ({
  size = 'large', 
  title,
  subtitle,
  description,
  imageUrl,
  buttonText
}) => {
  return (
    <div className={`promo-card ${size}`} style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className="card-overlay"></div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <h2 className="card-subtitle">{subtitle}</h2>
        {description && <p className="card-description">{description}</p>}
        {buttonText && <button className="card-button">{buttonText}</button>}
      </div>
    </div>
  );
};

export default PromoCard;