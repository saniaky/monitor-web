import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DashboardRouter from './pages/dashboard/DashboardRouter'
import StatusPage from './pages/status-page/StatusPage'

const HomePage = lazy(() => import('./pages/home/HomePage'))
const PricingPage = lazy(() => import('./pages/home/PricingPage'))
const NotFoundPage = lazy(() => import('./pages/not-found/NotFoundPage'))
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))
const SignupPage = lazy(() => import('./pages/auth/SignupPage'))
const PrivateRoute = lazy(() => import('./components/PrivateRoute'))
const ConfirmEmailPage = lazy(() => import('./pages/auth/ConfirmEmailPage'))
const PublicRoute = lazy(() => import('./components/PublicRoute'))

function App () {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <PublicRoute path='/' exact component={HomePage} />
          <PublicRoute path='/pricing' exact component={PricingPage} />
          <PublicRoute path='/login' exact component={LoginPage} />
          <PublicRoute path='/signup' exact component={SignupPage} />
          <PublicRoute path='/confirm-email' exact component={ConfirmEmailPage} />
          <PublicRoute path='/forgot-password' exact component={SignupPage} />
          <PublicRoute path='/status-page/:projectId' exact component={StatusPage} />
          <PrivateRoute path='/dashboard' component={DashboardRouter} />
          <Route component={NotFoundPage} />
        </Switch>
      </Suspense>
    </Router>
  )
}

export default App
