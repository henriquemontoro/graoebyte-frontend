import { useEffect, useState } from 'react'
import api from '../config/api'

export default function ProdutoForm() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [categoria, setCategoria] = useState('Bebidas Quentes')
  const [erros, setErros] = useState<{nome?: string, descricao?: string, preco?: string}>({})
  const isAdmin = localStorage.getItem('role') === 'admin'
  const modoFuncionario = localStorage.getItem('modoFuncionario') === 'true'

  const id = window.location.pathname.split('/')[2]
  const editando = id !== 'novo'

  useEffect(() => {
    if (editando) {
      api.get(`/produtos/${id}`).then((res) => {
        setNome(res.data.nome)
        setDescricao(res.data.descricao)
        setPreco(res.data.preco)
        setCategoria(res.data.categoria || 'Bebidas Quentes')
      })
    }
  }, [])

  const salvar = async () => {
    const novosErros: {nome?: string, descricao?: string, preco?: string} = {}
    if (!nome.trim()) novosErros.nome = 'Nome é obrigatório'
    if (!descricao.trim()) novosErros.descricao = 'Descrição é obrigatória'
    if (!preco) novosErros.preco = 'Preço é obrigatório'
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }
    setErros({})
    if (editando) {
      await api.put(`/produtos/${id}`, { nome, descricao, preco: Number(preco), categoria })
    } else {
      await api.post('/produtos', { nome, descricao, preco: Number(preco), categoria })
    }
    window.location.href = '/produtos'
  }

  const categorias = ['Bebidas Quentes', 'Bebidas Frias', 'Lanches', 'Doces', 'Outros']

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#fdf6ee' }}>
      <aside style={{ background: '#2c1a0e', width: '240px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ color: '#f5c97a', fontSize: '22px', fontWeight: 'bold' }}>Grão</span>
            <span style={{ color: 'white', fontSize: '22px', fontWeight: 'bold' }}> & </span>
            <span style={{ color: '#c8833b', fontSize: '22px', fontWeight: 'bold' }}>Byte</span>
          </div>
          <p style={{ color: '#a07850', fontSize: '12px', marginBottom: '8px' }}>Sistema de Gestão</p>
          {isAdmin && (
            <span style={{ fontSize: '11px', background: '#f5c97a', color: '#2c1a0e', border: 'none', padding: '3px 10px', borderRadius: '20px', fontWeight: '700', letterSpacing: '0.3px' }}>
              {modoFuncionario ? '👁️ Modo Funcionário' : 'Admin'}
            </span>
          )}
        </div>
        <a href="/produtos" style={{ background: '#3d2510', color: '#f5c97a', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500' }}>🧾 Produtos</a>
        {isAdmin && !modoFuncionario && (
          <a href="/usuarios" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>👤 Usuários</a>
        )}
        {isAdmin && !modoFuncionario && (
          <a href="/historico" style={{ color: '#a07850', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500', marginTop: '8px' }}>📋 Histórico</a>
        )}
        {isAdmin && !modoFuncionario && (
          <button onClick={() => { localStorage.setItem('modoFuncionario', 'true'); window.location.href = '/produtos' }} style={{ color: '#a07850', background: 'none', border: '1px solid #a07850', borderRadius: '8px', padding: '10px 16px', cursor: 'pointer', fontSize: '13px', marginTop: '8px', textAlign: 'left' }}>
            👁️ Ver como funcionário
          </button>
        )}
        {isAdmin && modoFuncionario && (
          <button onClick={() => { localStorage.removeItem('modoFuncionario'); window.location.href = '/produtos' }} style={{ color: '#f5c97a', background: '#3d2510', border: 'none', borderRadius: '8px', padding: '10px 16px', cursor: 'pointer', fontSize: '13px', marginTop: '8px', textAlign: 'left' }}>
            ← Sair da visualização
          </button>
        )}
        <div style={{ marginTop: 'auto' }}>
          <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); localStorage.removeItem('modoFuncionario'); window.location.href = '/' }} style={{ color: '#a07850', background: 'none', border: 'none', cursor: 'pointer' }}>
            → Sair
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '48px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <a href="/produtos" style={{ color: '#7a5c3a', fontSize: '14px', textDecoration: 'none', display: 'block', marginBottom: '24px' }}>← Voltar</a>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c1a0e', marginBottom: '32px' }}>
            {editando ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Nome</label>
            <input
              style={{ width: '100%', border: `1px solid ${erros.nome ? '#c0392b' : '#c8833b'}`, borderRadius: '8px', padding: '12px', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="Ex: Cappuccino"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            {erros.nome && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px' }}>{erros.nome}</p>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Descrição</label>
            <textarea
              style={{ width: '100%', border: `1px solid ${erros.descricao ? '#c0392b' : '#c8833b'}`, borderRadius: '8px', padding: '12px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical', minHeight: '80px' }}
              placeholder="Descreva o produto..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            {erros.descricao && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px' }}>{erros.descricao}</p>}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Categoria</label>
            <select
              style={{ width: '100%', border: '1px solid #c8833b', borderRadius: '8px', padding: '12px', fontSize: '14px', boxSizing: 'border-box', background: 'white', cursor: 'pointer' }}
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map((c) => (<option key={c} value={c}>{c}</option>))}
            </select>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Preço (R$)</label>
            <input
              style={{ width: '100%', border: `1px solid ${erros.preco ? '#c0392b' : '#c8833b'}`, borderRadius: '8px', padding: '12px', fontSize: '14px', boxSizing: 'border-box', appearance: 'none' } as React.CSSProperties}
              placeholder="0,00"
              type="number"
              step="0.01"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
            {erros.preco && <p style={{ color: '#c0392b', fontSize: '12px', marginTop: '4px' }}>{erros.preco}</p>}
          </div>
          <button onClick={salvar} style={{ width: '100%', background: '#2c1a0e', color: '#f5c97a', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
            {editando ? 'Salvar Alterações' : 'Adicionar Produto'}
          </button>
        </div>
      </main>
    </div>
  )
}
