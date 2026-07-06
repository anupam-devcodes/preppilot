import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import router from './app/router';

/**
 * Root component that wraps the application in the AuthProvider and RouterProvider.
 */
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
