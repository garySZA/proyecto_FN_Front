import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import './styles.css';
import { Icon } from '../Icon';

export const DropdownGeneric = ({ options=[], element }) => {
    return (
        <Dropdown className='dropdown-modif'>
            <Dropdown.Toggle variant='primary' id='dropdown-basic-manu'>
                <Icon icon='SlOptions' color='letters' size={20} title='Opciones'/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    options.map(( item, i ) => (
                        item.state && <Dropdown.Item onClick={ () => item.action( element ) } key={ i }>{ item.label }</Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}
