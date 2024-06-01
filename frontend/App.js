// App.js
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {AuthProvider} from './src/authContext';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
