import React from 'react'
import { Button } from 'react-bootstrap'
import { Icon } from './Icon'

export const HeaderSection = ({ title, goTo }) => {
    return (
        <>
            <div className="col-12 col-sm-6 col-md-4">
                <h2 className='text-letters'>{ title }</h2>
            </div>
            <div className="col-12 col-sm-5 col-md-4 col-lg-3 col-xl-2 ms-auto">
                <Button onClick={ () => goTo() } className='text-letters' variant='primary' >
                    <Icon className='mt-0' icon='IoIosArrowBack' size={25} title='Volver' color='letters'/>
                    <small className='me-2'>Volver</small>
                </Button>
            </div>
            <hr />
        </>
    )
}
