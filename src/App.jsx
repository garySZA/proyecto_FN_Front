import React from 'react';
import { StateProvider } from './context/stateProvider';
import { Container } from './Container';
import AuthProvider from './context/AuthProvider';

import './index.css';

export const App = () => {
    return (
      <AuthProvider>
        <StateProvider>
          <Container />
        </StateProvider>
      </AuthProvider>
    )
}