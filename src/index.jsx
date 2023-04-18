import React from 'react' // Import React
import { createRoot } from 'react-dom/client'
import { MainView } from './components/main-view/main-view'
import { Container } from 'react-bootstrap' // Import the Container component
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

const App = () => {
  return (
    <Container>
      {/* Wrap the MainView component with the Container component */}
      <MainView />
    </Container>
  )
}

const container = document.querySelector('#root')
const root = createRoot(container)
root.render(<App />)
