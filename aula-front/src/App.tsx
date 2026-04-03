import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Produtos from './pages/Produtos'
import ProdutoForm from './pages/ProdutoForm'
import CriarUsuario from './pages/CriarUsuario'
import Usuarios from './pages/Usuarios'
import Historico from './pages/Historico'

function RotaProtegida({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/" />
  return children
}

function RotaAdmin({ children }: { children: React.ReactElement }) {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  if (!token) return <Navigate to="/" />
  if (role !== 'admin') return <Navigate to="/produtos" />
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
        <Route path="/usuarios" element={<RotaAdmin><Usuarios /></RotaAdmin>} />
        <Route path="/usuarios/novo" element={<RotaAdmin><CriarUsuario /></RotaAdmin>} />
        <Route path="/usuarios/:id/editar" element={<RotaAdmin><CriarUsuario /></RotaAdmin>} />
        <Route path="/historico" element={<RotaAdmin><Historico /></RotaAdmin>} />
      </Routes>
    </BrowserRouter>
  )
}
