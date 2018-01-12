import { h, render } from 'preact'
import App from './app'

let renderApp = () => render(<App />, document.body, document.body.firstElementChild)
renderApp()

if (module.hot) { module.hot.accept('./app', renderApp) }
