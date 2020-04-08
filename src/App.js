import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import NotFoundPage from './pages/not-found/NotFoundPage'
import ConsolePage from './pages/console/ConsolePage'
import LoginPage from './pages/auth/LoginPage'

function App () {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/console' exact component={ConsolePage} />
        <Route path='/login' exact component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default App
