import { useEffect, useState } from 'react'
import api from '../config/api'

interface Usuario {
  _id: string
  email: string
  role: string
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [erro, setErro] = useState('')
  const isAdmin = localStorage.getItem('role') === 'admin'
  const modoFuncionario = localStorage.getItem('modoFuncionario') === 'true'

  if (modoFuncionario) {
    window.location.href = '/produtos'
  }

  const fetchUsuarios = async () => {
    const res = await api.get('/usuarios')
    setUsuarios(res.data)
  }

  const deletar = async (id: string) => {
    if (!confirm('Deletar usuário?')) return
    await api.delete(`/usuarios/${id}`)
    fetchUsuarios()
  }

  const alterarRole = async (id: string, role: string) => {
    try {
      setErro('')
      await api.put(`/usuarios/${id}`, { role })
      fetchUsuarios()
    } catch (err: any) {
      setErro(err.response?.data?.message || 'Erro ao alterar role')
    }
  }

  useEffect(() => { fetchUsuarios() }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#fdf6ee' }}>
      <aside style={{ background: '#2c1a0e', width: '240px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#f5c97a', fontSize: '22px', fontWeight: 'bold' }}>Grão</span>
            <span style={{ color: 'white', fontSize: '22px', fontWeight: 'bold' }}> & </span>
            <span style={{ color: '#c8833b', fontSize: '22px', fontWeight: 'bold' }}>Byte</span>
          </div>
          <p style={{ color: '#a07850', fontSize: '12px' }}>Sistema de Gestão</p>
          {isAdmin && (
            <span style={{ fontSize: '11px', background: '#f5c97a', color: '#2c1a0e', padding: '2px 8px', borderRadius: '20px', fontWeight: '600' }}>
              {modoFuncionario ? '👁️ Modo Funcionário' : '⭐ Admin'}
            </span>
          )}
        </div>
        <a href="/produtos" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500' }}>
          🧾 Produtos
        </a>
        {isAdmin && !modoFuncionario && (
          <a href="/usuarios" style={{ background: '#3d2510', color: '#f5c97a', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>
            👤 Usuários
          </a>
        )}
        {isAdmin && !modoFuncionario && (
          <a href="/historico" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>
            📋 Histórico
          </a>
        )}
        {isAdmin && !modoFuncionario && (
          <button
            onClick={() => { localStorage.setItem('modoFuncionario', 'true'); window.location.href = '/produtos' }}
            style={{ color: '#a07850', background: 'none', border: '1px solid #a07850', borderRadius: '8px', padding: '10px 16px', cursor: 'pointer', fontSize: '13px', marginTop: '8px', textAlign: 'left' }}
          >
            👁️ Ver como funcionário
          </button>
        )}
        {isAdmin && modoFuncionario && (
          <button
            onClick={() => { localStorage.removeItem('modoFuncionario'); window.location.href = '/produtos' }}
            style={{ color: '#f5c97a', background: '#3d2510', border: 'none', borderRadius: '8px', padding: '10px 16px', cursor: 'pointer', fontSize: '13px', marginTop: '8px', textAlign: 'left' }}
          >
            ← Sair da visualização
          </button>
        )}
        <div style={{ marginTop: 'auto' }}>
          <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); window.location.href = '/' }} style={{ color: '#a07850', background: 'none', border: 'none', cursor: 'pointer' }}>
            → Sair
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c1a0e' }}>Usuários</h2>
            <p style={{ color: '#7a5c3a' }}>{usuarios.length} usuários cadastrados</p>
          </div>
          <a href="/usuarios/novo" style={{ background: '#2c1a0e', color: '#f5c97a', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', fontWeight: '500' }}>
            + Novo Usuário
          </a>
        </div>
        {erro && <p style={{ color: '#c0392b', marginBottom: '16px', background: '#fff0f0', padding: '12px', borderRadius: '8px' }}>{erro}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {usuarios.map((u) => (
            <div key={u._id} style={{ background: 'white', borderLeft: '4px solid #c8833b', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <div>
                <h3 style={{ fontWeight: 'bold', fontSize: '16px', color: '#2c1a0e' }}>{u.email}</h3>
                <span style={{ fontSize: '12px', background: u.role === 'admin' ? '#f5c97a' : '#e8e8e8', color: '#2c1a0e', padding: '2px 8px', borderRadius: '20px' }}>
                  {u.role}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <select
                  value={u.role}
                  onChange={(e) => alterarRole(u._id, e.target.value)}
                  style={{ border: '1px solid #c8833b', borderRadius: '8px', padding: '8px', fontSize: '14px', cursor: 'pointer' }}
                >
                  <option value="funcionario">Funcionário</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={() => deletar(u._id)}
                  style={{ background: '#fff0f0', color: '#c0392b', border: '1px solid #c0392b', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
