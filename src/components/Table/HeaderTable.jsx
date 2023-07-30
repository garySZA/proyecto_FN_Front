import React from 'react'

export const HeaderTable = ({ listHeader }) => {
    return (
        <thead>
            <tr className='text-letters'>
                {
                    listHeader.map(( item, i ) => (
                        <th key={ i }>{ item }</th>
                    ))
                }
            </tr>
        </thead>
    )
}
