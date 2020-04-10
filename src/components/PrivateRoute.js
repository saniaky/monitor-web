import React from 'react'
import { Redirect, Route } from 'react-router-dom'
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

        // Check authentication
        if (auth.isAuthenticated === false) {
          // console.log(`User not authenticated, redirect him.`);
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // Check authorization
        // const currentUser = authService.getCurrentUser();
        // if (roles && roles.indexOf(currentUser.role) === -1) {
        //     return <Redirect to={{pathname: '/'}}/>;
        // }

        return <Component {...props} />
      }}
    />
  )
}
