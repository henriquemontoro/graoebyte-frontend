import { useState } from 'react'
import api from '../config/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, senha })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      localStorage.removeItem('modoFuncionario')
      window.location.href = '/produtos'
    } catch {
      setErro('Email ou senha incorretos')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#2c1a0e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fdf6ee', borderRadius: '20px', padding: '48px', width: '100%', maxWidth: '400px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#f5c97a', fontSize: '32px', fontWeight: 'bold' }}>Grão</span>
            <span style={{ color: '#2c1a0e', fontSize: '32px', fontWeight: 'bold' }}> & </span>
            <span style={{ color: '#c8833b', fontSize: '32px', fontWeight: 'bold' }}>Byte</span>
          </div>
          <p style={{ color: '#7a5c3a', fontSize: '14px' }}>Sistema de Gestão Interno</p>
        </div>
        {erro && <p style={{ color: '#c0392b', fontSize: '14px', marginBottom: '16px', textAlign: 'center', background: '#fff0f0', padding: '12px', borderRadius: '8px' }}>{erro}</p>}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Email</label>
          <input
            style={{ width: '100%', border: '1px solid #c8833b', borderRadius: '8px', padding: '12px', fontSize: '14px', background: 'white', boxSizing: 'border-box' }}
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Senha</label>
          <div style={{ position: 'relative' }}>
            <input
              style={{ width: '100%', border: '1px solid #c8833b', borderRadius: '8px', padding: '12px', paddingRight: '48px', fontSize: '14px', background: 'white', boxSizing: 'border-box' }}
              placeholder="••••••••"
              type={mostrarSenha ? 'text' : 'password'}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button
              onClick={() => setMostrarSenha(!mostrarSenha)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7a5c3a', fontSize: '14px' }}
            >
              {mostrarSenha ? '🙈' : '👁️'}
            </button>
          </div>
        </div>
        <button
          onClick={handleLogin}
          style={{ width: '100%', background: '#2c1a0e', color: '#f5c97a', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
        >
          Entrar
        </button>
      </div>
    </div>
  )
}
