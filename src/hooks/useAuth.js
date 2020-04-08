import React, { createContext, useContext, useEffect } from 'react'
import useProvideAuth from './useProvideAuth'
import { useRouter } from './useRouter'

/**
 * Inspired by:
 * https://usehooks.com/useAuth/
 */

// Default context value
const AuthContext = createContext()

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext)
}

// redirect the user if they are signed out and trying to view
// a page that should require them to be authenticated.
export function useRequireAuth (redirectUrl = '/auth/login') {
  const auth = useAuth()
  const router = useRouter()
  useEffect(() => {
    if (auth.isAuthenticated === false) {
      router.push(redirectUrl)
    }
  }, [auth, router, redirectUrl])
  return auth
}

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth ({ children }) {
  const auth = useProvideAuth()
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}
