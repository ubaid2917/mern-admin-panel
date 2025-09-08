import React from 'react'
import { Route, Routes } from 'react-router'
import Dashboard from './components/Dashboard'
import List from './pages/User/List'
import ProductList from './pages/Product/List'
import Catgory from './pages/Category/List'

const RoutesComp = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<List />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/category" element={<Catgory />} />
      </Routes>

    </>
  )
}

export default RoutesComp
