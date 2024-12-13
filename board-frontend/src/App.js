import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
   return (
      <div>
         <h1>Board Application</h1>
         <Routes>
            <Route path="/" element={<Home />} /> {/* 초기 화면 */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
         </Routes>
      </div>
   )
}

export default App
