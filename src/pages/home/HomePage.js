import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div>
      <header>
        Home
        <Link to='/console'>Console</Link>
        <Link to='/login'>Login</Link>
        <Link to='/logout'>Logout</Link>
      </header>

      Welcome to our Monitor Service

      Want to monitor your webservice? Create account here.

      Last 5 added apps:

      <footer>
        <Link to='/admin'>Admin area</Link>
      </footer>
    </div>
  )
}
