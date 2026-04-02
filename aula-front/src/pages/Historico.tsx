import { useEffect, useState } from 'react'
import api from '../config/api'

interface Log {
  _id: string
  usuario: string
  acao: string
  detalhe: string
  data: string
}

export default function Historico() {
  const [logs, setLogs] = useState<Log[]>([])
  const isAdmin = localStorage.getItem('role') === 'admin'
  const [modoFuncionario, setModoFuncionario] = useState(localStorage.getItem('modoFuncionario') === 'true')
  const fetchLogs = async () => {
    const res = await api.get('/logs')
    setLogs(res.data)
  }
if (modoFuncionario) {
  window.location.href = '/produtos'
}
  const limpar = async () => {
    if (!confirm('Tem certeza que deseja limpar todo o histórico?')) return
    await api.delete('/logs')
    fetchLogs()
  }

  useEffect(() => {
  if (modoFuncionario) {
    window.location.href = '/produtos'
    return
  }
  fetchLogs()
}, [])

  const formatarData = (data: string) => {
    return new Date(data).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
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
          <a href="/usuarios" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>
            👤 Usuários
          </a>
        )}
        {isAdmin && !modoFuncionario && (
          <a href="/historico" style={{ background: '#3d2510', color: '#f5c97a', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>
            📋 Histórico
          </a>
        )}
        {isAdmin && !modoFuncionario && (
          <button
            onClick={() => { localStorage.setItem('modoFuncionario', 'true'); setModoFuncionario(true) }}
            style={{ color: '#a07850', background: 'none', border: '1px solid #a07850', borderRadius: '8px', padding: '10px 16px', cursor: 'pointer', fontSize: '13px', marginTop: '8px', textAlign: 'left' }}
          >
            👁️ Ver como funcionário
          </button>
        )}
        {isAdmin && modoFuncionario && (
          <button
            onClick={() => { localStorage.removeItem('modoFuncionario'); setModoFuncionario(false) }}
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
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c1a0e' }}>Histórico</h2>
            <p style={{ color: '#7a5c3a' }}>{logs.length} registros</p>
          </div>
          <button
            onClick={limpar}
            style={{ background: '#fff0f0', color: '#c0392b', border: '1px solid #c0392b', padding: '12px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: '500' }}
          >
            🗑️ Limpar histórico
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {logs.map((log) => (
            <div key={log._id} style={{ background: 'white', borderLeft: '4px solid #c8833b', borderRadius: '12px', padding: '16px 20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 'bold', color: '#2c1a0e' }}>{log.usuario}</span>
                  <span style={{ color: '#7a5c3a' }}> {log.acao} </span>
                  {log.detalhe && <span style={{ color: '#c8833b', fontWeight: '500' }}>{log.detalhe}</span>}
                </div>
                <span style={{ color: '#a07850', fontSize: '13px' }}>{formatarData(log.data)}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
