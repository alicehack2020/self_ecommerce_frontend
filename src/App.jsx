import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import Register from './auth/Register'
import Login from './auth/Login'
import Footer from './footer/Footer'
import { Route, Routes } from 'react-router-dom'
import LandingPage from './landing/LandingPage'
import ProductDetails from './product/ProductDetails'
import NavBar from './navbar/Navbar'
import ProductListPage from './landing/ProductListPage'
 

const App = () => {
  return (
    <>
      <NavBar/>
      <Routes>
      <Route element={<LandingPage/>} path='/' />
      <Route element={<ProductListPage/>} path='/ProductListPage' />
      <Route element={<Login/>} path='/login' />
      <Route element={<Register/>} path='/register' />
      <Route element={<ProductDetails/>} path='/ProductDetails/:id' />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App