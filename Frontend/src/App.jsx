import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import AuthLayout from './components/AuthLayout'
import Account from './features/Account'
import Login from './features/Login'
import Services from './pages/Services'
import Testimonies from './pages/Testimonies'
import Blog from './pages/Blog'
import AdminPanel from './features/AdminPanel'

const App = () => {
  return (
    <div className=' bg-white text-gray-900 dark:bg-[#0F172A] dark:text-gray-100 transition-colors duration-300'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/testimonies' element={<Testimonies />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path='/account' element={<Account />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App