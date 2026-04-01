import { useEffect, useState } from 'react'
import api from '../config/api'

export default function ProdutoForm() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')

  const id = window.location.pathname.split('/')[2]
  const editando = id !== 'novo'

  useEffect(() => {
    if (editando) {
      api.get(`/produtos/${id}`).then((res) => {
        setNome(res.data.nome)
        setDescricao(res.data.descricao)
        setPreco(res.data.preco)
      })
    }
  }, [])

  const salvar = async () => {
    if (editando) {
      await api.put(`/produtos/${id}`, { nome, descricao, preco: Number(preco) })
    } else {
      await api.post('/produtos', { nome, descricao, preco: Number(preco) })
    }
    window.location.href = '/produtos'
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
        <a href="/produtos" style={{ background: '#3d2510', color: '#f5c97a', padding: '12px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500' }}>
          🧾 Produtos
        </a>
        <div style={{ marginTop: 'auto' }}>
          <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/' }} style={{ color: '#a07850', background: 'none', border: 'none', cursor: 'pointer' }}>
            → Sair
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '48px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
        <div style={{ background: 'white', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '500px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <a href="/produtos" style={{ color: '#7a5c3a', fontSize: '14px', textDecoration: 'none', display: 'block', marginBottom: '24px' }}>
            ← Voltar
          </a>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2c1a0e', marginBottom: '32px' }}>
            {editando ? 'Editar Produto' : 'Novo Produto'}
          </h2>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Nome</label>
            <input
              style={{ width: '100%', border: '1px solid #c8833b', borderRadius: '8px', padding: '12px', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="Ex: Cappuccino"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Descrição</label>
            <textarea
              style={{ width: '100%', border: '1px solid #c8833b', borderRadius: '8px', padding: '12px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical', minHeight: '80px' }}
              placeholder="Descreva o produto..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div style={{ marginBottom: '32px' }}>
            <label style={{ display: 'block', color: '#2c1a0e', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Preço (R$)</label>
            <input
              style={{ width: '100%', border: '1px solid #c8833b', borderRadius: '8px', padding: '12px', fontSize: '14px', boxSizing: 'border-box' }}
              placeholder="0,00"
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />
          </div>
          <button
            onClick={salvar}
            style={{ width: '100%', background: '#2c1a0e', color: '#f5c97a', padding: '14px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
          >
            {editando ? 'Salvar Alterações' : 'Adicionar Produto'}
          </button>
        </div>
      </main>
    </div>
  )
}
