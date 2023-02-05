import React from 'react'
import { AppRouter } from './router/AppRouter'
import './index.css'
import { UserProvider } from './context/UserProvider'
import { StateProvider } from './context/stateProvider'
import AuthProvider from './context/AuthProvider'

export const App = () => {
    return (
      <AuthProvider>
        <StateProvider>
          <AppRouter />
        </StateProvider>
      </AuthProvider>
    )
}
