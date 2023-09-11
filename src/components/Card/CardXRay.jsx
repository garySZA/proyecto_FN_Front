import React from 'react'
import moment from 'moment/moment'
import { Button, Card, Col } from 'react-bootstrap'
import 'moment/locale/es';

export const CardXRay = ({ item, history, goTo }) => {    
    
    return (
        <Col>
            <Card className='my-3 my-md-1'>
                <Card.Img variant='top' src={ item.img }/>
                <Card.Body>
                    <Card.Title>{ item?.bodyPart ?? 'Sin parte de cuerpo' }</Card.Title>
                    <Card.Text>{ item?.description ?? 'Sin descripción' }</Card.Text>
                    <Button onClick={() => goTo( item.id )} className='text-primary w-100' variant="letters">Ver item</Button>
                </Card.Body>
                <Card.Footer>
                    <small className='text-muted'>
                    { moment(item.createdAt).locale('es').fromNow() }, { moment(item.createdAt).locale('es').format('LLL') }
                    </small>
                </Card.Footer>
            </Card>
        </Col>
    )
}
