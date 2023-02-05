import React from 'react'
import { AppRouter } from './router/AppRouter'
import './index.css'
import { UserProvider } from './context/UserProvider'
import { StateProvider } from './context/stateProvider'

export const App = () => {
    return (
      <StateProvider>
        <AppRouter />
      </StateProvider>
    )
}
