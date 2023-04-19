import React from 'react'
import { BrowserRouter , Route , Routes } from 'react-router-dom'
import SigninPage from './pages/SigninPage'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>

        <Route path='/' element={<SigninPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
