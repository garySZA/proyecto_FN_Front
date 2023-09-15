import React from 'react'
import * as ReactIcons from 'react-icons/all'
import { FaUser } from 'react-icons/fa'

export const Icon = ({ icon, title = 'Usuarios', size = 25, color = 'primary', className='mt-1' }) => {
    if( ReactIcons[icon] ){
        const IconComponent = ReactIcons[icon];

        return <IconComponent className={`text-${color} ${ className }`} title={ title } size={ size }  />
    } else {
        return <FaUser className={`mt-1 text-${color}`} title={ title } size={ size }/>
    }
}
