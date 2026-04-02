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

  const fetchLogs = async () => {
    const res = await api.get('/logs')
    setLogs(res.data)
  }

  useEffect(() => { fetchLogs() }, [])

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
        </div>
        <a href="/produtos" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500' }}>
          🧾 Produtos
        </a>
        <a href="/usuarios" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>
          👤 Usuários
        </a>
        <a href="/historico" style={{ background: '#3d2510', color: '#f5c97a', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>
          📋 Histórico
        </a>
        <div style={{ marginTop: 'auto' }}>
          <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); window.location.href = '/' }} style={{ color: '#a07850', background: 'none', border: 'none', cursor: 'pointer' }}>
            → Sair
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c1a0e' }}>Histórico</h2>
          <p style={{ color: '#7a5c3a' }}>{logs.length} registros</p>
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
