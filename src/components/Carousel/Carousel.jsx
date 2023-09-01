import React from 'react'
import { Carousel as CarouselBootStrap } from 'react-bootstrap'

export const Carrousel = ({ items=[] }) => {
    return (
        <CarouselBootStrap className='carrousel' interval={ null }>
            {
                items.map((item, i) => (
                    <CarouselBootStrap.Item className='img_container' key={ i }>
                        <img 
                            className='img_banner d-block w-100'
                            src={ item.img } 
                            alt={ item.desc }
                        />
                        <CarouselBootStrap.Caption>
                            <h2 className='fs-1'>{ item.title }</h2>
                            <p>{ item.text }</p>
                        </CarouselBootStrap.Caption>
                    </CarouselBootStrap.Item>
                ))
            }
        </CarouselBootStrap>
    )
}
