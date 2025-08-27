import React from 'react';
import './Hero.css';
import PromoCard from '../PromoCards/PromoCards'; // Using your import path
import CH from '../../assets/CH.png';
import js from '../../assets/js.png';
import CL from '../../assets/CL.png';
import CH_Beanie from '../../assets/CH_Beanie.png';

const Hero = () => {
    return (
        <section className='hero-section'>
            <div className="hero-container">
                <div className="hero-main">
                    <PromoCard
                        size="large"
                        title="New Arrivals"
                        subtitle="Chrome Hearts Hoodie"
                        description="Iconic designs for a standout style."
                        imageUrl={CH}
                        buttonText='Discover Now'
                    />
                </div>

                <div className="hero-side">
                    <PromoCard
                        size="medium"
                        title="Stylish Comfort"
                        subtitle="Classic T's"
                        imageUrl={js}
                    />
                    
                    <div className="hero-side-bottom">
                        <PromoCard
                            size="small"
                            title="Accessories"
                            subtitle="Chrome Hearts Beanies"
                            imageUrl={CH_Beanie}
                        />
                        <PromoCard
                            size="small"
                            title="Footwear"
                            subtitle="Chunky Loafers"
                            imageUrl={CL}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;