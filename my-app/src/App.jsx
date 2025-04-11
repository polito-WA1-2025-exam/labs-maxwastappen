import { useState } from 'react'
import './styles/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'  // Aggiungo Bootstrap Icons
import Navigation from './components/Navigation.jsx'
import Hero from './components/Hero.jsx'
import Bases from './components/Bases.jsx'
import Proteins from './components/Proteins.jsx'
import Ingredients from './components/Ingredients.jsx'
import Footer from './components/Footer.jsx'  // Importo il nuovo componente Footer

function App() {
  return (
    <div className="App dark-mode">
      <Navigation />
      <main>
        <section className="section-darker"><Hero /></section>
        <section className="section-lighter"><Bases /></section>
        <section className="section-darker"><Proteins /></section>
        <section className="section-lighter"><Ingredients /></section>
      </main>
      <Footer />
    </div>
  )
}

export default App
