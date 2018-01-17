import ReactDOM from 'react-dom'
import React from 'react'
import App from './app.jsx'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(App),
    document.querySelector('#app'),
  )
})
