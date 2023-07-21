
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Coint from './components/Coint';
import React from 'react'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/coint/:id" element={<Coint />} />
      </Routes>
    </>
  );
}

export default App;
