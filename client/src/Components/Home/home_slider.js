import React from 'react';
import Slider from 'react-slick'
import MyButton from '../utils/button'

const HomeSlider = (props) => {

    const slides = [
        {
            img: 'Slider/Batman.jpg',
            lineOne: 'Trades',
            lineTwo: '',
            linkTitle: '',
            linkTo: '/shop'
        },
        {
            img: 'Slider/Batman.jpg',
            lineOne: 'Trades',
            lineTwo: '',
            linkTitle: '',
            linkTo: '/shop'
        }
    ]


const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    arrows: false
}

const generateSlides = () => (
    slides ?
        slides.map((item,i)=>(
            <div key={i}>
                <div className="featured_image"
                    style={{
                        background: `url(${item.img})`,
                        height: `${window.innerHeight}px`
                    }}
                
                >
                    <div className="featured_action">
                    <div className="tag title">{item.lineOne} </div>
                    <div className="tag low_title">{item.lineTwo} </div>
                    <div>
                        <MyButton
                        type="default"
                        title={item.linkTitle}
                        linkTo={item.linkTo}
                        addStyle='10px 0 0 0'
                        />
                    </div>
                    </div>
                </div>
            </div>
        ))
    :null
)

    return (
        <div className="featured_container">
            <Slider {...settings}>
            {generateSlides()}
            </Slider>
            
        </div>
    );
};

export default HomeSlider;