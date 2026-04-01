import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Produtos from './pages/Produtos'
import ProdutoForm from './pages/ProdutoForm'

function RotaProtegida({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/" />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/produtos" element={<RotaProtegida><Produtos /></RotaProtegida>} />
        <Route path="/produtos/novo" element={<RotaProtegida><ProdutoForm /></RotaProtegida>} />
        <Route path="/produtos/:id/editar" element={<RotaProtegida><ProdutoForm /></RotaProtegida>} />
      </Routes>
    </BrowserRouter>
  )
}