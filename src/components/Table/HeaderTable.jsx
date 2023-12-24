import React from 'react'

export const HeaderTable = ({ listHeader, center }) => {
    return (
        <thead>
            <tr className='text-letters'>
                {
                    listHeader.map(( item, i ) => (
                        <th style={{ textAlign: center ? 'center' : 'left' }} key={ i }>{ item }</th>
                    ))
                }
            </tr>
        </thead>
    )
}
