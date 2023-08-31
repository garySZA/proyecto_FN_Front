import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

import { Icon } from '../Icon';
import './styles.css'

export const DropdownOptions = ({ goToEmail, changeStatus, item }) => {
    return (
        <Dropdown className='dropdown-modif' >
            <Dropdown.Toggle variant='primary' id='dropdown-basic-menu' >
                <Icon icon='SlOptions' color='letters' size={20} title='Opciones'/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={ () => changeStatus( item ) }>{ `Marcar como ${ item.status ? 'pendiente' : 'atendido' }` }</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={ () => goToEmail( item ) }>Ir a Gmail</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
