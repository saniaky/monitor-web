import useLocalStorage from './useLocalStorage'
import api from '../config/api'
import { useEffect, useState } from 'react'

const TOKEN_KEY = 'monitor_token'

// Provider hook that creates auth object and handles state
export default function useProvideAuth () {
  const [user, setUser] = useState(null)
  const [token, setToken] = useLocalStorage(TOKEN_KEY, null)

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    if (!token) {
      setUser(false)
      console.log('Resetting token.')
      api.defaults.headers.common.Authorization = ''
      return
    }
    console.log('Setting token.')
    api.defaults.headers.common.Authorization = `Bearer ${token}`
    api.get('/me')
      .then((userProfile) => {
        setUser(userProfile)
      })
      .catch(() => {
        setUser(false)
      })
  }, [token])

  const createAccount = (data) => {
    return api.post('/register', data)
      .then(res => res.data)
  }

  const login = (email, password, rememberMe) => {
    return api.post('/login', { email, password })
      .then(res => {
        setToken(res.data.accessToken)
      })
  }

  const logout = () => {
    setToken(null)
    return api.post('/logout')
  }

  const socialLogin = (provider) => {
    window.location = `${process.env.REACT_APP_API_URL}/auth/${provider}`
  }

  const socialLoginCallback = (user) => {
    setUser(user)
  }

  const sendPasswordResetEmail = (email) => {
    return api.post('/forgot', { email })
      .then(res => res.data)
      .then(() => {
        return true
      })
  }

  const resetPassword = (body) => {
    return api.post('/auth/reset-password', body)
      .then(res => res.data)
      .then(() => {
        return true
      })
  }

  const confirmAccount = (email) => {
    return api.post('/auth/verify', { email })
      .then(res => res.data)
  }

  const sendConfirmationCode = () => {
    return api.get('/auth/verify/:token')
      .then(res => res.data)
  }

  // Return the user object and auth methods
  return {
    user,
    updateUser: (newVals) => setUser((prevVals) => ({ ...prevVals, ...newVals })),
    isAuthenticated: user !== false,
    login,
    logout,
    createAccount,
    socialLogin,
    socialLoginCallback,
    sendPasswordResetEmail,
    resetPassword,
    confirmAccount,
    sendConfirmationCode
  }
}
