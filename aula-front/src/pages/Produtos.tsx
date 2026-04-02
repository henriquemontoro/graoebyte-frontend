import { useEffect, useState } from 'react'
import api from '../config/api'

interface Produto {
  _id: string
  nome: string
  descricao: string
  preco: number
  categoria: string
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [busca, setBusca] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')

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

  useEffect(() => { fetchProdutos() }, [])

  const produtosFiltrados = produtos.filter(p => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase()) || p.descricao.toLowerCase().includes(busca.toLowerCase())
    const matchCategoria = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro
    return matchBusca && matchCategoria
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#fdf6ee' }}>
      <aside style={{ background: '#2c1a0e', width: '240px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#f5c97a', fontSize: '22px', fontWeight: 'bold' }}>Grão</span>
            <span style={{ color: 'white', fontSize: '22px', fontWeight: 'bold' }}> & </span>
            <span style={{ color: '#c8833b', fontSize: '22px', fontWeight: 'bold' }}>Byte</span>
          </div>
          <p style={{ color: '#a07850', fontSize: '12px' }}>Sistema de Gestão</p>
        </div>
        <a href="/produtos" style={{ background: '#3d2510', color: '#f5c97a', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500' }}>
          🧾 Produtos
        </a>
        {localStorage.getItem('role') === 'admin' && (
          <a href="/usuarios" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>
            👤 Usuários
          </a>
        )}
        {localStorage.getItem('role') === 'admin' && (
          <a href="/historico" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>
            📋 Histórico
          </a>
        )}
        <div style={{ marginTop: 'auto' }}>
          <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); window.location.href = '/' }} style={{ color: '#a07850', background: 'none', border: 'none', cursor: 'pointer' }}>
            → Sair
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#2c1a0e' }}>Produtos</h2>
            <p style={{ color: '#7a5c3a' }}>{produtosFiltrados.length} itens no cardápio</p>
          </div>
          <a href="/produtos/novo" style={{ background: '#2c1a0e', color: '#f5c97a', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', fontWeight: '500' }}>
            + Novo Produto
          </a>
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
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {produtosFiltrados.map((p) => (
            <div key={p._id} style={{ background: 'white', borderLeft: '4px solid #c8833b', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontWeight: 'bold', fontSize: '18px', color: '#2c1a0e' }}>{p.nome}</h3>
                  <span style={{ fontSize: '11px', background: '#f5c97a', color: '#2c1a0e', padding: '2px 8px', borderRadius: '20px', fontWeight: '500' }}>{p.categoria || 'Outros'}</span>
                </div>
                <p style={{ color: '#7a5c3a' }}>{p.descricao}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#c8833b' }}>R$ {p.preco.toFixed(2)}</span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <a href={`/produtos/${p._id}/editar`} style={{ background: '#fdf6ee', color: '#2c1a0e', border: '1px solid #c8833b', padding: '8px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px' }}>
                    Editar
                  </a>
                  <button onClick={() => deletar(p._id)} style={{ background: '#fff0f0', color: '#c0392b', border: '1px solid #c0392b', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
