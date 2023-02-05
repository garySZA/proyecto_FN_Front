import React, { useEffect, useReducer } from 'react'
import { stateReducer } from '../../../context/stateReducer'

const listClients = () => [
    {
        id: 1,
        name: 'juan'
    },
    {
        id: 2,
        name: 'Gary'
    }
]

export const Clients = () => {
    
    const [state, dispatch] = useReducer(stateReducer, second)

    useEffect(() => {
        dispatch({ type: 'setClients', payload: listClients })
    }, [])
    

    return (
        <div>Clients</div>
    )
}
