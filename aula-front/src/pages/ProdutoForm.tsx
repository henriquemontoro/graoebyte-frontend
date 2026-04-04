import { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../config/api'

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  background: #fdf6ee;
`

const Sidebar = styled.aside`
  background: #2c1a0e;
  width: 240px;
  padding: 24px;
  display: flex;
  flex-direction: column;
`

const LogoWrapper = styled.div`
  margin-bottom: 40px;
`

const LogoRow = styled.div`
  margin-bottom: 8px;
`

const LogoSpan = styled.span<{ color: string }>`
  color: ${p => p.color};
  font-size: 22px;
  font-weight: bold;
`

const SubText = styled.p`
  color: #a07850;
  font-size: 12px;
  margin-bottom: 8px;
`

const AdminBadge = styled.span`
  font-size: 11px;
  background: #f5c97a;
  color: #2c1a0e;
  padding: 3px 10px;
  border-radius: 20px;
  font-weight: 700;
  letter-spacing: 0.3px;
`

const NavLink = styled.a<{ ativo?: boolean }>`
  background: ${p => p.ativo ? '#3d2510' : 'none'};
  color: ${p => p.ativo ? '#f5c97a' : '#a07850'};
  padding: 12px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  margin-top: ${p => p.ativo ? '0' : '8px'};
`

const NavButton = styled.button<{ ativo?: boolean }>`
  color: ${p => p.ativo ? '#f5c97a' : '#a07850'};
  background: ${p => p.ativo ? '#3d2510' : 'none'};
  border: ${p => p.ativo ? 'none' : '1px solid #a07850'};
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 13px;
  margin-top: 8px;
  text-align: left;
`

const SairButton = styled.button`
  color: #a07850;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: auto;
`

const Main = styled.main`
  flex: 1;
  padding: 48px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

const FormCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
`

const VoltarLink = styled.a`
  color: #7a5c3a;
  font-size: 14px;
  text-decoration: none;
  display: block;
  margin-bottom: 24px;
`

const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #2c1a0e;
  margin-bottom: 32px;
`

const ErroGeral = styled.p`
  color: #c0392b;
  font-size: 14px;
  margin-bottom: 16px;
  background: #fff0f0;
  padding: 12px;
  border-radius: 8px;
`

const FormGroup = styled.div`
  margin-bottom: 20px;
`

const FormGroupLast = styled.div`
  margin-bottom: 32px;
`

const Label = styled.label`
  display: block;
  color: #2c1a0e;
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 14px;
`

const Input = styled.input<{ erro?: boolean }>`
  width: 100%;
  border: 1px solid ${p => p.erro ? '#c0392b' : '#c8833b'};
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  box-sizing: border-box;
  appearance: none;
`

const Textarea = styled.textarea<{ erro?: boolean }>`
  width: 100%;
  border: 1px solid ${p => p.erro ? '#c0392b' : '#c8833b'};
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  box-sizing: border-box;
  resize: vertical;
  min-height: 80px;
`

const Select = styled.select`
  width: 100%;
  border: 1px solid #c8833b;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  cursor: pointer;
`

const ErroMsg = styled.p`
  color: #c0392b;
  font-size: 12px;
  margin-top: 4px;
`

const SalvarBtn = styled.button`
  width: 100%;
  background: #2c1a0e;
  color: #f5c97a;
  padding: 14px;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`

export default function ProdutoForm() {
  const [nome, setNome] = useState('')
  const [descricao, setDescricao] = useState('')
  const [preco, setPreco] = useState('')
  const [categoria, setCategoria] = useState('Bebidas Quentes')
  const [erros, setErros] = useState<{nome?: string, descricao?: string, preco?: string}>({})
  const [erroGeral, setErroGeral] = useState('')
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
    setErroGeral('')
    try {
      if (editando) {
        await api.put(`/produtos/${id}`, { nome, descricao, preco: Number(preco), categoria })
      } else {
        await api.post('/produtos', { nome, descricao, preco: Number(preco), categoria })
      }
      window.location.href = '/produtos'
    } catch (e: any) {
      setErroGeral(e.response?.data?.message || 'Erro ao salvar produto')
    }
  }

  const categorias = ['Bebidas Quentes', 'Bebidas Frias', 'Lanches', 'Doces', 'Outros']

  return (
    <PageWrapper>
      <Sidebar>
        <LogoWrapper>
          <LogoRow>
            <LogoSpan color="#f5c97a">Grão</LogoSpan>
            <LogoSpan color="white"> & </LogoSpan>
            <LogoSpan color="#c8833b">Byte</LogoSpan>
          </LogoRow>
          <SubText>Sistema de Gestão</SubText>
          {isAdmin && <AdminBadge>{modoFuncionario ? '👁️ Modo Funcionário' : 'Admin'}</AdminBadge>}
        </LogoWrapper>
        <NavLink href="/produtos" ativo>🧾 Produtos</NavLink>
        {isAdmin && !modoFuncionario && <NavLink href="/usuarios">👤 Usuários</NavLink>}
        {isAdmin && !modoFuncionario && <NavLink href="/historico">📋 Histórico</NavLink>}
        {isAdmin && !modoFuncionario && (
          <NavButton onClick={() => { localStorage.setItem('modoFuncionario', 'true'); window.location.href = '/produtos' }}>
            👁️ Ver como funcionário
          </NavButton>
        )}
        {isAdmin && modoFuncionario && (
          <NavButton ativo onClick={() => { localStorage.removeItem('modoFuncionario'); window.location.href = '/produtos' }}>
            ← Sair da visualização
          </NavButton>
        )}
        <SairButton onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); localStorage.removeItem('modoFuncionario'); window.location.href = '/' }}>
          → Sair
        </SairButton>
      </Sidebar>
      <Main>
        <FormCard>
          <VoltarLink href="/produtos">← Voltar</VoltarLink>
          <FormTitle>{editando ? 'Editar Produto' : 'Novo Produto'}</FormTitle>
          {erroGeral && <ErroGeral>{erroGeral}</ErroGeral>}
          <FormGroup>
            <Label>Nome</Label>
            <Input erro={!!erros.nome} placeholder="Ex: Cappuccino" value={nome} onChange={(e) => setNome(e.target.value)} />
            {erros.nome && <ErroMsg>{erros.nome}</ErroMsg>}
          </FormGroup>
          <FormGroup>
            <Label>Descrição</Label>
            <Textarea erro={!!erros.descricao} placeholder="Descreva o produto..." value={descricao} onChange={(e) => setDescricao(e.target.value)} />
            {erros.descricao && <ErroMsg>{erros.descricao}</ErroMsg>}
          </FormGroup>
          <FormGroup>
            <Label>Categoria</Label>
            <Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              {categorias.map((c) => (<option key={c} value={c}>{c}</option>))}
            </Select>
          </FormGroup>
          <FormGroupLast>
            <Label>Preço (R$)</Label>
            <Input erro={!!erros.preco} placeholder="0,00" type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} />
            {erros.preco && <ErroMsg>{erros.preco}</ErroMsg>}
          </FormGroupLast>
          <SalvarBtn onClick={salvar}>{editando ? 'Salvar Alterações' : 'Adicionar Produto'}</SalvarBtn>
        </FormCard>
      </Main>
    </PageWrapper>
  )
}
