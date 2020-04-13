import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const HomePage = lazy(() => import( './pages/home/HomePage'))
const PricingPage = lazy(() => import( './pages/home/PricingPage'))
const NotFoundPage = lazy(() => import( './pages/not-found/NotFoundPage'))
const DashboardPage = lazy(() => import( './pages/dashboard/DashboardPage'))
const LoginPage = lazy(() => import( './pages/auth/LoginPage'))
const SignupPage = lazy(() => import( './pages/auth/SignupPage'))
const PrivateRoute = lazy(() => import( './components/PrivateRoute'))
const ConfirmEmailPage = lazy(() => import( './pages/auth/ConfirmEmailPage'))
const PublicRoute = lazy(() => import( './components/PublicRoute'))

function App () {
  return (
    <Router>
      <Switch>
        <PublicRoute path='/' exact component={HomePage} />
        <PublicRoute path='/pricing' exact component={PricingPage} />
        <PrivateRoute path='/dashboard' exact component={DashboardPage} />
        <PublicRoute path='/login' exact component={LoginPage} />
        <PublicRoute path='/signup' exact component={SignupPage} />
        <PublicRoute path='/confirm-email' exact component={ConfirmEmailPage} />
        <PublicRoute path='/forgot-password' exact component={SignupPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  )
}

export default App
