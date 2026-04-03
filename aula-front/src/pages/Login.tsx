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
    <div style={{ minHeight: '100vh', display: 'flex', background: '#2c1a0e' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px', background: 'linear-gradient(135deg, #2c1a0e 0%, #4a2c14 100%)' }}>
        <div style={{ marginBottom: '48px' }}>
          <span style={{ color: '#f5c97a', fontSize: '48px', fontWeight: 'bold' }}>Grão</span>
          <span style={{ color: 'white', fontSize: '48px', fontWeight: 'bold' }}> & </span>
          <span style={{ color: '#c8833b', fontSize: '48px', fontWeight: 'bold' }}>Byte</span>
        </div>
        <p style={{ color: '#a07850', fontSize: '18px', lineHeight: '1.8', maxWidth: '400px' }}>
          Sistema de gestão interna para controle de produtos, cardápio e equipe da cafeteria.
        </p>
        <div style={{ marginTop: '48px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🧾</span>
            <span style={{ color: '#c8833b', fontSize: '15px' }}>Gestão completa de produtos e cardápio</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>👥</span>
            <span style={{ color: '#c8833b', fontSize: '15px' }}>Controle de acesso por funcionário</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>📋</span>
            <span style={{ color: '#c8833b', fontSize: '15px' }}>Histórico completo de alterações</span>
          </div>
        </div>
      </div>
      <div style={{ width: '480px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px', background: '#fdf6ee' }}>
        <div style={{ width: '100%' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c1a0e', marginBottom: '8px' }}>Bem-vindo de volta</h2>
          <p style={{ color: '#7a5c3a', fontSize: '14px', marginBottom: '32px' }}>Entre com suas credenciais para acessar o sistema</p>
          {erro && <p style={{ color: '#c0392b', fontSize: '14px', marginBottom: '16px', background: '#fff0f0', padding: '12px', borderRadius: '8px' }}>{erro}</p>}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Email</label>
            <input
              style={{ width: '100%', border: '1px solid #c8833b', borderRadius: '8px', padding: '12px', fontSize: '14px', background: 'white', boxSizing: 'border-box' }}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Senha</label>
            <div style={{ position: 'relative' }}>
              <input
                style={{ width: '100%', border: '1px solid #c8833b', borderRadius: '8px', padding: '12px', paddingRight: '48px', fontSize: '14px', background: 'white', boxSizing: 'border-box' }}
                placeholder="••••••••"
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <button onClick={() => setMostrarSenha(!mostrarSenha)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7a5c3a', fontSize: '14px' }}>
                {mostrarSenha ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <button onClick={handleLogin} style={{ width: '100%', background: '#2c1a0e', color: '#f5c97a', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  )
}
