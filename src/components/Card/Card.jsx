import React from 'react'
import { Icon } from '../Icon'

export const Card = ({ card }) => {
    return (
        <>
            <div className="col-10 col-sm-5 col-lg-3 mx-auto my-4 text-center bg-letters shadow-lg rounded">
                <Icon 
                    icon={ card.icon.icon }
                    color={ card.icon.color }
                    size={ card.icon.size }
                    title={ card.icon.title }
                    className='my-4'
                />
                <h2 className='w-75 mx-auto card-title text-primary text-center'>{ card.title }</h2>
                <p className='w-75 mx-auto mb-4 card-text text-primary'>{ card.text }</p>
            </div>
        </>
    )
}
