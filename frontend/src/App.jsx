import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Home from '../src/game/home'
import Play from '../src/game/play'
function App() {
 

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/play" element={<Play/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
