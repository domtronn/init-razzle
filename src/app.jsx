/** @jsx h */
import { h } from 'preact'

import reducer from './redux/reducer'
import thunk from 'redux-thunk'
import { Provider } from 'preact-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import Main from './components/main'
import './app.css'

const App = (props) => {
  const initialState = props.isServer
    ? props.initialState
    : window.__initialState__

  const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

  return (
    <Provider store={store} >
      <Main />
    </Provider>
  )
}

export default App
