import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import DesignProvider from './DesignProvider'
import { ProvideAuth } from './hooks/useAuth'
import './config/pace'
import './config/toast'

const root = document.getElementById('root')

ReactDOM.render(
  <DesignProvider>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </DesignProvider>
  , root
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
