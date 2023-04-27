import React from 'react'
 import Register from './auth/Register'
import Login from './auth/Login'
import Footer from './footer/Footer'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './landing/LandingPage'
import ProductDetails from './product/ProductDetails'
 

const App = () => {
  return (
    <>
      <Routes>
      <Route element={<LandingPage/>} path='/' />
      <Route element={<Login/>} path='/login' />
      <Route element={<Register/>} path='/register' />
      <Route element={<ProductDetails/>} path='/ProductDetails/:id' />
      </Routes>
      <Footer/>
    </>
  )
}

export default App