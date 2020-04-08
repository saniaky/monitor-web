import api from '../config/api'
import useLocalStorage from './useLocalStorage'

const USER_KEY = 'picpad_user'

// Provider hook that creates auth object and handles state
export default function useProvideAuth () {
  const [user, setUser] = useLocalStorage(USER_KEY, null)

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  // useEffect(() => {
  //   const savedUser = _getUser()
  //   if (savedUser) {
  //     setUser(savedUser)
  //   } else {
  //     setUser(false)
  //   }
  // }, [])

  const login = ({ email, password, rememberMe }) => {
    const body = { email, password }
    return api.post('/auth/login', body)
      .then(res => {
        setUser(res.data)
        return res
      })
  }

  const socialLogin = (provider) => {
    window.location = `${process.env.REACT_APP_API_URL}/auth/${provider}`
  }

  const socialLoginCallback = (user) => {
    setUser(user)
  }

  const createAccount = (data) => {
    return api.post('/auth/create-account', data)
      .then(res => res.data)
  }

  const logout = () => {
    setUser(false)
    return api.post('/auth/logout')
      .then(res => {
        return res
      })
  }

  const sendPasswordResetEmail = (email) => {
    return api.post('/auth/forgot', { email })
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
    socialLogin,
    socialLoginCallback,
    createAccount,
    sendPasswordResetEmail,
    resetPassword,
    confirmAccount,
    sendConfirmationCode
  }
}
