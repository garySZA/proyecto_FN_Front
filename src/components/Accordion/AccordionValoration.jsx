import React from 'react'
import { Accordion } from 'react-bootstrap'

export const AccordionValoration = ({ valoration }) => {
    return (
        <>
            <Accordion defaultActiveKey='0' flush>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header className='border shadow-sm'>
                        <h3 className='fs-5 text-letters'>
                            <strong>
                                Valoración
                            </strong>
                        </h3>
                    </Accordion.Header>
                    <Accordion.Body className='shadow-sm'>
                        <ul className='d-flex flex-column text-letters'>
                            <li><strong>Detalle: </strong></li>
                            <li>aqui iria el detalle de la valoracion</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}
