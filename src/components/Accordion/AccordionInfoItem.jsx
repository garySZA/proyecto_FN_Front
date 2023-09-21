import React from 'react'
import { Accordion } from 'react-bootstrap'
import moment from 'moment/moment';
import 'moment/locale/es';

export const AccordionInfoItem = ({ creator, item }) => {
    return (
        <Accordion defaultActiveKey='1' flush>
            <Accordion.Item eventKey='1'>
                <Accordion.Header className='border shadow-sm'>
                    <h3 className='fs-5 text-letters'>
                        <strong>
                            Información de item
                        </strong>
                    </h3>
                </Accordion.Header>
                <Accordion.Body className='shadow-sm text-letters'>
                    <h4 className='fs-5'><strong>id Item: </strong>{ item.id }</h4>
                    <ul className='d-flex flex-column'>
                        <li><strong>Parte del cuerpo:</strong></li>
                        <li>{ item?.bodyPart || 'No cuenta' }</li>
                        <li><strong>Descripción:</strong></li>
                        <li>{ item?.description || 'No cuenta' }</li>
                        <li><strong>Creado por:</strong></li>
                        <li>{ creator?.first_name || 'item por defecto' } { creator?.last_name || '' }</li>
                        <li><strong>Fecha de creación:</strong></li>
                        <li>{ moment(item.createdAt).locale('es').fromNow() }, { moment(item.createdAt).locale('es').format('LLL') }</li>
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
