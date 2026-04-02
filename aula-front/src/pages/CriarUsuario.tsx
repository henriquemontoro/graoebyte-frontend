import { useState } from 'react'
import api from '../config/api'

export default function CriarUsuario() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [erro, setErro] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

  const criar = async () => {
    try {
      await api.post('/auth/register', { email, senha })
      setSucesso('Usuário criado com sucesso!')
      setErro('')
      setEmail('')
      setSenha('')
    } catch {
      setErro('Erro ao criar usuário')
      setSucesso('')
    }
  }

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
        </div>
        <a href="/produtos" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500' }}>
          🧾 Produtos
        </a>
        <a href="/usuarios" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>
          👤 Usuários
        </a>
        <a href="/historico" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>
          📋 Histórico
        </a>
        <div style={{ marginTop: 'auto' }}>
          <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); window.location.href = '/' }} style={{ color: '#a07850', background: 'none', border: 'none', cursor: 'pointer' }}>
            → Sair
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '48px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <a href="/usuarios" style={{ color: '#7a5c3a', fontSize: '14px', textDecoration: 'none', display: 'block', marginBottom: '24px' }}>
            ← Voltar
          </a>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c1a0e', marginBottom: '32px' }}>
            Criar Usuário
          </h2>
          {sucesso && <p style={{ color: '#27ae60', fontSize: '14px', marginBottom: '16px' }}>{sucesso}</p>}
          {erro && <p style={{ color: '#c0392b', fontSize: '14px', marginBottom: '16px' }}>{erro}</p>}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Email</label>
            <input
              style={{ width: '100%', border: '1px solid #c8833b', borderRadius: '8px', padding: '12px', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="funcionario@graoebyte.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Senha</label>
            <div style={{ position: 'relative' }}>
              <input
                style={{ width: '100%', border: '1px solid #c8833b', borderRadius: '8px', padding: '12px', paddingRight: '48px', fontSize: '14px', boxSizing: 'border-box' }}
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
            onClick={criar}
            style={{ width: '100%', background: '#2c1a0e', color: '#f5c97a', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
          >
            Criar Usuário
          </button>
        </div>
      </main>
    </div>
  )
}
