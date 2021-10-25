import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function MainPageSlider() {
    const setting = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        adaptiveHeight:true

     
        
    }
    return (
        <Slider {...setting}>
            
            <img src="https://media.discordapp.net/attachments/856941694518689802/888487844631416873/unknown.png?width=1536&height=287"/>
            <img src="https://media.discordapp.net/attachments/856941694518689802/888487844631416873/unknown.png?width=1536&height=287"/>
            <img src="https://media.discordapp.net/attachments/856941694518689802/888487844631416873/unknown.png?width=1536&height=287"/>
           
        </Slider>
    );
}