import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import NavBar from './components/NavBar'
import Ingredients from './components/Ingredients'

function App() {
  const [theme, setTheme] = useState('dark')  
  const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  useEffect(() => {
      document.body.setAttribute('data-bs-theme', theme)
  }, [theme])

  return (
    <div className= "App">
      <NavBar/>
      <Ingredients/>
    </div>
  )
}

export default App
