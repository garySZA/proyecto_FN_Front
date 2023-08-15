import React from 'react'
import './index.css'
import { StateProvider } from './context/stateProvider'
import AuthProvider from './context/AuthProvider'
import { Container } from './Container'

export const App = () => {
    return (
      <AuthProvider>
        <StateProvider>
          <Container />
        </StateProvider>
      </AuthProvider>
    )
}
