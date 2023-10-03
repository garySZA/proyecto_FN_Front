import React from 'react';
import { Accordion } from 'react-bootstrap';
import moment from 'moment/moment';
import 'moment/locale/es';

export const AccordionValoration = ({ valoration }) => {
    const { medic } = valoration;

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
                    <Accordion.Body className='shadow-sm text-letters'>
                        <h4 className='fs-5'>
                            <strong>
                                Reporte
                            </strong>
                        </h4>
                        <ul className='d-flex flex-column'>
                            <li><strong>Método de estudio: </strong></li>
                            <li style={{ whiteSpace: 'pre-line' }}>{ valoration.studyMethod }</li>
                            <li><strong>Motivo del estudio: </strong></li>
                            <li style={{ whiteSpace: 'pre-line' }}>{ valoration.reason }</li>
                            <li><strong>Descripción: </strong></li>
                            <li style={{ whiteSpace: 'pre-line' }}>{ valoration.description }</li>
                            <li><strong>Conclusión: </strong></li>
                            <li style={{ whiteSpace: 'pre-line' }}>{ valoration.conclusion }</li>
                        </ul>
                        <hr />
                        <h4 className='fs-5'>
                            <strong>
                                Información de valoración
                            </strong>
                        </h4>
                        <ul className='d-flex flex-column'>
                            <li><strong>Médico: </strong></li>
                            <li>{ medic?.first_name || 'nocuenta' } { medic?.last_name || 'nocuenta' }</li>
                            <li><strong>Id valoración: </strong></li>
                            <li>{ valoration.id }</li>
                            <li><strong>Fecha valoración: </strong></li>
                            <li>{ moment(valoration.createdAt).locale('es').fromNow() }, { moment(valoration.createdAt).locale('es').format('LLL') }</li>
                            <li><strong>Fecha modificación: </strong></li>
                            <li>{ moment(valoration.updatedAt).locale('es').fromNow() }, { moment(valoration.updatedAt).locale('es').format('LLL') }</li>
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}
