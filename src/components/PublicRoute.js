import React from 'react'
import { Route } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default ({ component: Component, roles, ...rest }) => {
  const auth = useAuth()

  return (
    <Route
      exact
      {...rest}
      render={(props) => {
        // If auth is null (still fetching data)
        if (auth.user === null) {
          return <div>Loading....</div>
        }
        return <Component {...props} />
      }}
    />
  )
}
