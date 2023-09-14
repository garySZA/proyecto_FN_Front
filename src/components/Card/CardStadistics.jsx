import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Icon } from '../Icon'

export const CardStadistics = ({ item, styles }) => {
    return (
        <Col>
            <Card className={`${ styles }`}>
                <div>
                    <Icon icon={ item.icon } size={ item.size } className='mt-3'/>
                </div>
                <h3 className='fs-1 my-2' >{ item.cant }</h3>
                <p>{ item.text }</p>
            </Card>
        </Col>
    )
}
