import React from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Schedule from './components/Schedule';
import Links from './components/Links';
import Rules from './components/Rules';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <About />
        <Schedule />
        <Links />
        <Rules />
      </main>
      <Footer />
    </div>
  );
}

export default App;
