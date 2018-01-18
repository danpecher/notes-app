import ReactDOM from 'react-dom'
import React from 'react'
import App from '../components/app.jsx'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    React.createElement(App),
    document.querySelector('#app'),
  )
})
