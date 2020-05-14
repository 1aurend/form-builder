import React from 'react'
import ReactDOM from 'react-dom'
import Data from './Data'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <Data />
  </React.StrictMode>,
  document.getElementById('root')
)

serviceWorker.unregister()
