import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import AppRoutes from '/src/components/AppRoutes.jsx'
import NavBar from '/src/components/NavBar.jsx'

function App() {

  return (
  <Router>
      <div className="app">
        <h1>React on Rails Blog</h1>
        <NavBar />
        <p>Find this application layout in client/src/App.jsx</p>
        <AppRoutes />
      </div>
  </Router>
  )
}

export default App
