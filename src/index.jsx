import React from 'react'
import { createRoot } from 'react-dom/client'
import { MainView } from './components/main-view/main-view'
import { Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Container>
      <MainView />
    </Container>
  )
}

const container = document.querySelector('#root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
