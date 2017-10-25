import App from './App'
import React from 'react'
import { hydrate } from 'react-dom'

hydrate(
  <App />,
  document.getElementById('app__root')
)

if (module.hot) { module.hot.accept() }
