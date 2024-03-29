import React from 'react'

import imgOne from '../../assets/img/img1.jpg'
import imgTwo from '../../assets/img/img5.jpg'
import imgSix from '../../assets/img/img6.jpg'

import { Carrousel } from '../../components/Carousel/Carousel'
import { carrouselBanner } from '../../helpers/carousel-items'

import './home_styles.css'
import { Card } from '../../components/Card/Card'
import { cardsList } from '../../helpers/cards-list'

export const Home = () => {
    return (
        <>
            <section
                data-aos="fade-zoom-in"
                data-aos-easing="ease-in-back"
                data-aos-delay="25"
                data-aos-offset="0"
            >
                <Carrousel items={ carrouselBanner }/>
            </section>

            <section className='' id='cards-section' style={{ marginBottom: '140px' }}>
                <div className="container">
                    <div className="row">
                        {
                            cardsList.map((card, i) => (
                                <Card card={ card } key={ i }/>
                            ))
                        }
                    </div>
                </div>
            </section>

            <div className="container mt-5">

                <div className="row my-4">
                    <div 
                        className="col-md-6 ms-auto my-auto"
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                    >
                        <h2 className='text-letters'>Contamos con los mejores equipos</h2>
                        <p className='parraf_home'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nostrum soluta rerum autem cum sunt beatae voluptatum recusandae. Dignissimos voluptatem illum, in accusantium vel officiis, consectetur ut pariatur dicta porro praesentium laudantium explicabo veniam. Provident fuga aliquid officiis illum consequatur architecto maiores, tenetur asperiores beatae reiciendis iusto consequuntur natus! Omnis ea facere reprehenderit quidem numquam nisi ad voluptatem harum dolorum.</p>
                    </div>
                    <div 
                        className="col-md-5"
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                    >
                        <figure className='ps-auto'>
                            <img className='img_home' src={imgOne} alt="" />
                        </figure>
                    </div>
                </div>

                <div className="row my-4">
                    <div 
                        className="col-md-5 order-md-first"
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                    >
                        <figure>
                            <img className='img_home' src={imgSix} alt="" />
                        </figure>
                    </div>
                    <div 
                        className="col-md-6 ms-auto my-auto order-first"
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                    >
                        <h2 className='text-letters'>Personal altamente capacitado</h2>
                        <p className='parraf_home'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nostrum soluta rerum autem cum sunt beatae voluptatum recusandae. Dignissimos voluptatem illum, in accusantium vel officiis, consectetur ut pariatur dicta porro praesentium laudantium explicabo veniam. Provident fuga aliquid officiis illum consequatur architecto maiores, tenetur asperiores beatae reiciendis iusto consequuntur natus! Omnis ea facere reprehenderit quidem numquam nisi ad voluptatem harum dolorum.</p>
                    </div>
                </div>

                <div 
                    className="row my-4"
                >
                    <div 
                        className="col-md-6 ms-auto my-auto"
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                    >
                        <h2 className='text-letters'>Contamos con los mejores equipos</h2>
                        <p className='parraf_home'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nostrum soluta rerum autem cum sunt beatae voluptatum recusandae. Dignissimos voluptatem illum, in accusantium vel officiis, consectetur ut pariatur dicta porro praesentium laudantium explicabo veniam. Provident fuga aliquid officiis illum consequatur architecto maiores, tenetur asperiores beatae reiciendis iusto consequuntur natus! Omnis ea facere reprehenderit quidem numquam nisi ad voluptatem harum dolorum.</p>
                    </div>
                    <div 
                        className="col-md-5"
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                    >
                        <figure>
                            <img className='img_home' src={imgOne} alt="" />
                        </figure>
                    </div>
                </div>
                <div 
                    className="row my-4"
                >
                    <div 
                        className="col-md-5 order-md-first"
                    >
                        <figure>
                            <img className='img_home' src={imgTwo} alt="" />
                        </figure>
                    </div>
                    <div 
                        className="col-md-6 ms-auto my-auto order-first"
                        data-aos="fade-up"
                        data-aos-anchor-placement="bottom-bottom"
                    >
                        <h2 className='text-letters'>Diagnósticos desde un dispositivo móvil</h2>
                        <p className='parraf_home'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed nostrum soluta rerum autem cum sunt beatae voluptatum recusandae. Dignissimos voluptatem illum, in accusantium vel officiis, consectetur ut pariatur dicta porro praesentium laudantium explicabo veniam. Provident fuga aliquid officiis illum consequatur architecto maiores, tenetur asperiores beatae reiciendis iusto consequuntur natus! Omnis ea facere reprehenderit quidem numquam nisi ad voluptatem harum dolorum.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
