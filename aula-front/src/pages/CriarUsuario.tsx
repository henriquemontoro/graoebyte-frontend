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
`

const SenhaWrapper = styled.div`
  position: relative;
`

const SenhaInput = styled.input<{ erro?: boolean }>`
  width: 100%;
  border: 1px solid ${p => p.erro ? '#c0392b' : '#c8833b'};
  border-radius: 8px;
  padding: 12px;
  padding-right: 48px;
  font-size: 14px;
  box-sizing: border-box;
`

const MostrarSenhaBtn = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #7a5c3a;
  font-size: 14px;
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

export default function CriarUsuario() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erros, setErros] = useState<{nome?: string, email?: string, senha?: string}>({})
  const isAdmin = localStorage.getItem('role') === 'admin'
  const modoFuncionario = localStorage.getItem('modoFuncionario') === 'true'

  const id = window.location.pathname.split('/')[2]
  const editando = id !== 'novo'

  useEffect(() => {
    if (editando) {
      api.get(`/usuarios/${id}`).then((res) => {
        setNome(res.data.nome)
        setEmail(res.data.email)
      })
    }
  }, [])

  const validarSenha = (s: string) => {
    const errosSenha = []
    if (s.length < 8) errosSenha.push('mínimo 8 caracteres')
    if (!/[A-Z]/.test(s)) errosSenha.push('1 letra maiúscula')
    if (!/[0-9]/.test(s)) errosSenha.push('1 número')
    if (!/[^A-Za-z0-9]/.test(s)) errosSenha.push('1 símbolo')
    return errosSenha
  }

  const salvar = async () => {
    const novosErros: {nome?: string, email?: string, senha?: string} = {}
    if (!nome.trim()) novosErros.nome = 'Nome é obrigatório'
    if (!email.trim()) novosErros.email = 'Email é obrigatório'
    if (!editando && !senha.trim()) {
      novosErros.senha = 'Senha é obrigatória'
    } else if (senha.trim()) {
      const errosSenha = validarSenha(senha)
      if (errosSenha.length > 0) novosErros.senha = `Senha deve ter: ${errosSenha.join(', ')}`
    }
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros)
      return
    }
    setErros({})
    setErro('')
    try {
      if (editando) {
        const update: Record<string, string> = { nome, email }
        if (senha.trim()) update.senha = senha
        await api.put(`/usuarios/${id}`, update)
      } else {
        await api.post('/auth/register', { nome, email, senha })
      }
      window.location.href = '/usuarios'
    } catch (e: any) {
      setErro(e.response?.data?.message || (editando ? 'Erro ao editar usuário' : 'Erro ao criar usuário'))
    }
  }

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
        <NavLink href="/produtos">🧾 Produtos</NavLink>
        {isAdmin && !modoFuncionario && <NavLink href="/usuarios" ativo>👤 Usuários</NavLink>}
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
          <VoltarLink href="/usuarios">← Voltar</VoltarLink>
          <FormTitle>{editando ? 'Editar Usuário' : 'Criar Usuário'}</FormTitle>
          {erro && <ErroGeral>{erro}</ErroGeral>}
          <FormGroup>
            <Label>Nome</Label>
            <Input erro={!!erros.nome} placeholder="João Silva" value={nome} onChange={(e) => setNome(e.target.value)} />
            {erros.nome && <ErroMsg>{erros.nome}</ErroMsg>}
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input erro={!!erros.email} placeholder="funcionario@graoebyte.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            {erros.email && <ErroMsg>{erros.email}</ErroMsg>}
          </FormGroup>
          <FormGroupLast>
            <Label>{editando ? 'Nova Senha (opcional)' : 'Senha'}</Label>
            <SenhaWrapper>
              <SenhaInput
                erro={!!erros.senha}
                placeholder="••••••••"
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <MostrarSenhaBtn onClick={() => setMostrarSenha(!mostrarSenha)}>
                {mostrarSenha ? '🙈' : '👁️'}
              </MostrarSenhaBtn>
            </SenhaWrapper>
            {erros.senha && <ErroMsg>{erros.senha}</ErroMsg>}
          </FormGroupLast>
          <SalvarBtn onClick={salvar}>{editando ? 'Salvar Alterações' : 'Criar Usuário'}</SalvarBtn>
        </FormCard>
      </Main>
    </PageWrapper>
  )
}
