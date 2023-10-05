import React from 'react'
import { Button } from 'react-bootstrap'
import { Icon } from './Icon'

export const HeaderSection = ({ title, goTo }) => {
    return (
        <>
            <div className="col-auto">
                <h2 className='text-letters'>{ title }</h2>
            </div>
            <div className="col-auto ms-auto px-0">
                <Button onClick={ () => goTo() } className='text-letters' variant='primary' >
                    <Icon className='mt-0' icon='IoIosArrowBack' size={25} title='Volver' color='letters'/>
                    <small className='me-2'>Volver</small>
                </Button>
            </div>
            <hr />
        </>
    )
}
