import React, { useContext, useEffect, useReducer } from 'react'

import { StateContext } from '../../context/stateProvider'

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
    
    const {state, dispatch} = useContext(StateContext)

    useEffect(() => {
        dispatch({ type: 'setClients', payload: listClients })
    }, [])
    

    return (
        <div>Clients</div>
    )
}
