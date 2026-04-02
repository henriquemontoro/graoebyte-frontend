import { useEffect, useState } from 'react'
import api from '../config/api'

interface Produto {
  _id: string
  nome: string
  descricao: string
  preco: number
  categoria: string
  disponivel: boolean
  updatedAt: string
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [busca, setBusca] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [view, setView] = useState<'cards' | 'tabela'>('cards')
  const isAdmin = localStorage.getItem('role') === 'admin'
  const [modoFuncionario, setModoFuncionario] = useState(localStorage.getItem('modoFuncionario') === 'true')

  const categorias = ['Todas', 'Bebidas Quentes', 'Bebidas Frias', 'Lanches', 'Doces', 'Outros']

  const fetchProdutos = async () => {
    const res = await api.get('/produtos')
    setProdutos(res.data)
  }

  const deletar = async (id: string) => {
    if (!confirm('Deletar?')) return
    await api.delete(`/produtos/${id}`)
    fetchProdutos()
  }

  const toggleDisponivel = async (id: string, disponivel: boolean) => {
    await api.put(`/produtos/${id}`, { disponivel: !disponivel })
    fetchProdutos()
  }

  useEffect(() => { fetchProdutos() }, [])

  const ordemCategorias = ['Bebidas Quentes', 'Bebidas Frias', 'Lanches', 'Doces', 'Outros']

const produtosFiltrados = produtos
  .filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase()) || p.descricao.toLowerCase().includes(busca.toLowerCase())
    const matchCategoria = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro
    return matchBusca && matchCategoria
  })
  .sort((a, b) => {
    const catA = ordemCategorias.indexOf(a.categoria) === -1 ? 99 : ordemCategorias.indexOf(a.categoria)
    const catB = ordemCategorias.indexOf(b.categoria) === -1 ? 99 : ordemCategorias.indexOf(b.categoria)
    if (catA !== catB) return catA - catB
    return a.nome.localeCompare(b.nome)
  })

  const totalDisponiveis = produtos.filter(p => p.disponivel).length
  const totalIndisponiveis = produtos.filter(p => !p.disponivel).length
  const precoMedio = produtos.length > 0 ? produtos.reduce((acc, p) => acc + p.preco, 0) / produtos.length : 0

  const formatarData = (data: string) => new Date(data).toLocaleDateString('pt-BR')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fdf6ee' }}>
      <aside style={{ background: '#2c1a0e', width: '240px', minWidth: '240px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
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
        <a href="/produtos" style={{ background: '#3d2510', color: '#f5c97a', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500' }}>
          🧾 Produtos
        </a>
        {isAdmin && !modoFuncionario && (
          <a href="/usuarios" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>
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
      <main style={{ flex: 1, padding: '32px', minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c1a0e', margin: 0 }}>Produtos</h2>
            <p style={{ color: '#7a5c3a', margin: '4px 0 0' }}>{produtosFiltrados.length} itens encontrados</p>
          </div>
          <a href="/produtos/novo" style={{ background: '#2c1a0e', color: '#f5c97a', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', fontWeight: '500', whiteSpace: 'nowrap' }}>
            + Novo Produto
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderTop: '4px solid #c8833b' }}>
            <p style={{ color: '#7a5c3a', fontSize: '12px', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#2c1a0e', margin: 0 }}>{produtos.length}</p>
          </div>
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderTop: '4px solid #28a745' }}>
            <p style={{ color: '#7a5c3a', fontSize: '12px', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Disponíveis</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745', margin: 0 }}>{totalDisponiveis}</p>
          </div>
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderTop: '4px solid #dc3545' }}>
            <p style={{ color: '#7a5c3a', fontSize: '12px', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Indisponíveis</p>
            <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#dc3545', margin: 0 }}>{totalIndisponiveis}</p>
          </div>
          <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', borderTop: '4px solid #f5c97a' }}>
            <p style={{ color: '#7a5c3a', fontSize: '12px', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preço Médio</p>
            <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#c8833b', margin: 0 }}>R$ {precoMedio.toFixed(2)}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
          <input
            style={{ flex: 1, border: '1px solid #c8833b', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', boxSizing: 'border-box', background: 'white' }}
            placeholder="🔍 Buscar produto..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <select
            style={{ border: '1px solid #c8833b', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', background: 'white', cursor: 'pointer' }}
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            {categorias.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div style={{ display: 'flex', border: '1px solid #c8833b', borderRadius: '10px', overflow: 'hidden' }}>
            <button onClick={() => setView('cards')} style={{ padding: '12px 16px', background: view === 'cards' ? '#2c1a0e' : 'white', color: view === 'cards' ? '#f5c97a' : '#2c1a0e', border: 'none', cursor: 'pointer', fontSize: '16px' }}>⊞</button>
            <button onClick={() => setView('tabela')} style={{ padding: '12px 16px', background: view === 'tabela' ? '#2c1a0e' : 'white', color: view === 'tabela' ? '#f5c97a' : '#2c1a0e', border: 'none', cursor: 'pointer', fontSize: '16px' }}>☰</button>
          </div>
        </div>
        {view === 'cards' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {produtosFiltrados.map((p) => (
              <div key={p._id} style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', borderTop: `4px solid ${p.disponivel ? '#c8833b' : '#ccc'}`, opacity: p.disponivel ? 1 : 0.7 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h3 style={{ fontWeight: 'bold', fontSize: '16px', color: '#2c1a0e', margin: 0 }}>{p.nome}</h3>
                  <span style={{ fontSize: '11px', background: p.disponivel ? '#d4edda' : '#f8d7da', color: p.disponivel ? '#155724' : '#721c24', padding: '2px 8px', borderRadius: '20px', fontWeight: '500', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                    {p.disponivel ? '● Disponível' : '● Indisponível'}
                  </span>
                </div>
                <p style={{ color: '#7a5c3a', fontSize: '13px', margin: '0 0 12px' }}>{p.descricao}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#c8833b' }}>R$ {p.preco.toFixed(2)}</span>
                  <span style={{ fontSize: '11px', background: '#f5c97a', color: '#2c1a0e', padding: '2px 8px', borderRadius: '20px', fontWeight: '500' }}>{p.categoria || 'Outros'}</span>
                </div>
                <p style={{ color: '#a07850', fontSize: '11px', margin: '0 0 12px' }}>Atualizado em {formatarData(p.updatedAt)}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => toggleDisponivel(p._id, p.disponivel)} style={{ flex: 1, background: p.disponivel ? '#fff3cd' : '#d4edda', color: p.disponivel ? '#856404' : '#155724', border: `1px solid ${p.disponivel ? '#ffc107' : '#28a745'}`, padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                    {p.disponivel ? '✕ Indisponível' : '✓ Disponível'}
                  </button>
                  <a href={`/produtos/${p._id}/editar`} style={{ flex: 1, background: '#fdf6ee', color: '#2c1a0e', border: '1px solid #c8833b', padding: '8px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', textAlign: 'center' }}>
                    Editar
                  </a>
                  <button onClick={() => deletar(p._id)} style={{ background: '#fff0f0', color: '#c0392b', border: '1px solid #c0392b', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {view === 'tabela' && (
          <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#2c1a0e' }}>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#f5c97a', fontWeight: '600', fontSize: '13px' }}>Produto</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#f5c97a', fontWeight: '600', fontSize: '13px' }}>Categoria</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#f5c97a', fontWeight: '600', fontSize: '13px' }}>Preço</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#f5c97a', fontWeight: '600', fontSize: '13px' }}>Status</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#f5c97a', fontWeight: '600', fontSize: '13px' }}>Atualizado</th>
                  <th style={{ padding: '14px 16px', textAlign: 'left', color: '#f5c97a', fontWeight: '600', fontSize: '13px' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map((p, i) => (
                  <tr key={p._id} style={{ background: i % 2 === 0 ? 'white' : '#fdf6ee', opacity: p.disponivel ? 1 : 0.6 }}>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid #f0e8dc' }}>
                      <p style={{ fontWeight: 'bold', color: '#2c1a0e', margin: '0 0 2px', fontSize: '14px' }}>{p.nome}</p>
                      <p style={{ color: '#7a5c3a', margin: 0, fontSize: '12px' }}>{p.descricao}</p>
                    </td>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid #f0e8dc' }}>
                      <span style={{ fontSize: '12px', background: '#f5c97a', color: '#2c1a0e', padding: '3px 10px', borderRadius: '20px', fontWeight: '500' }}>{p.categoria || 'Outros'}</span>
                    </td>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid #f0e8dc' }}>
                      <span style={{ fontWeight: 'bold', color: '#c8833b', fontSize: '16px' }}>R$ {p.preco.toFixed(2)}</span>
                    </td>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid #f0e8dc' }}>
                      <span style={{ fontSize: '12px', background: p.disponivel ? '#d4edda' : '#f8d7da', color: p.disponivel ? '#155724' : '#721c24', padding: '3px 10px', borderRadius: '20px', fontWeight: '500' }}>
                        {p.disponivel ? '● Disponível' : '● Indisponível'}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid #f0e8dc', color: '#a07850', fontSize: '13px' }}>
                      {formatarData(p.updatedAt)}
                    </td>
                    <td style={{ padding: '14px 16px', borderBottom: '1px solid #f0e8dc' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button onClick={() => toggleDisponivel(p._id, p.disponivel)} style={{ background: p.disponivel ? '#fff3cd' : '#d4edda', color: p.disponivel ? '#856404' : '#155724', border: `1px solid ${p.disponivel ? '#ffc107' : '#28a745'}`, padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', whiteSpace: 'nowrap' }}>
                          {p.disponivel ? '✕' : '✓'}
                        </button>
                        <a href={`/produtos/${p._id}/editar`} style={{ background: '#fdf6ee', color: '#2c1a0e', border: '1px solid #c8833b', padding: '6px 10px', borderRadius: '6px', textDecoration: 'none', fontSize: '12px' }}>
                          Editar
                        </a>
                        <button onClick={() => deletar(p._id)} style={{ background: '#fff0f0', color: '#c0392b', border: '1px solid #c0392b', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
