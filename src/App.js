import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import PricingPage from './pages/home/PricingPage'
import NotFoundPage from './pages/not-found/NotFoundPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import PrivateRoute from './components/PrivateRoute'

function App () {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/pricing' exact component={PricingPage} />
        <PrivateRoute path='/dashboard' exact component={DashboardPage} />
        <Route path='/login' exact component={LoginPage} />
        <Route path='/signup' exact component={SignupPage} />
        <Route path='/forgot-password' exact component={SignupPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default App
