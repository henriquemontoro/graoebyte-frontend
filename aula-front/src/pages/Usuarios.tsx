import { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../config/api'

interface Usuario {
  _id: string
  nome: string
  email: string
  role: string
}

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
  padding: 32px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #2c1a0e;
`

const Subtitle = styled.p`
  color: #7a5c3a;
`

const NovoBtn = styled.a`
  background: #2c1a0e;
  color: #f5c97a;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
`

const ErroMsg = styled.p`
  color: #c0392b;
  margin-bottom: 16px;
  background: #fff0f0;
  padding: 12px;
  border-radius: 8px;
`

const Lista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const UsuarioCard = styled.div`
  background: white;
  border-left: 4px solid #c8833b;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
`

const UsuarioInfo = styled.div``

const UsuarioNome = styled.h3`
  font-weight: bold;
  font-size: 16px;
  color: #2c1a0e;
  margin: 0 0 4px;
`

const UsuarioEmail = styled.p`
  color: #7a5c3a;
  font-size: 13px;
  margin: 0 0 6px;
`

const RoleBadge = styled.span<{ admin: boolean }>`
  font-size: 12px;
  background: ${p => p.admin ? '#f5c97a' : '#e8e8e8'};
  color: #2c1a0e;
  padding: 2px 8px;
  border-radius: 20px;
`

const Acoes = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const RoleSelect = styled.select`
  border: 1px solid #c8833b;
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  cursor: pointer;
`

const EditarLink = styled.a`
  background: #fdf6ee;
  color: #2c1a0e;
  border: 1px solid #c8833b;
  padding: 8px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
`

const DeletarBtn = styled.button`
  background: #fff0f0;
  color: #c0392b;
  border: 1px solid #c0392b;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalBox = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
`

const ModalTitle = styled.h3`
  color: #2c1a0e;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`

const ModalText = styled.p`
  color: #7a5c3a;
  margin-bottom: 24px;
`

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
`

const ModalCancelarBtn = styled.button`
  flex: 1;
  background: #fdf6ee;
  color: #2c1a0e;
  border: 1px solid #c8833b;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
`

const ModalConfirmarBtn = styled.button`
  flex: 1;
  background: #c0392b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
`

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [erro, setErro] = useState('')
  const [confirmarDeletar, setConfirmarDeletar] = useState<string | null>(null)
  const isAdmin = localStorage.getItem('role') === 'admin'
  const modoFuncionario = localStorage.getItem('modoFuncionario') === 'true'

  if (modoFuncionario) window.location.href = '/produtos'

  const fetchUsuarios = async () => {
    const res = await api.get('/usuarios')
    setUsuarios(res.data)
  }

  const deletar = async (id: string) => {
    await api.delete(`/usuarios/${id}`)
    fetchUsuarios()
    setConfirmarDeletar(null)
  }

  const alterarRole = async (id: string, role: string) => {
    try {
      setErro('')
      await api.put(`/usuarios/${id}`, { role })
      fetchUsuarios()
    } catch (err: any) {
      setErro(err.response?.data?.message || 'Erro ao alterar role')
    }
  }

  useEffect(() => { fetchUsuarios() }, [])

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
        <Header>
          <div>
            <Title>Usuários</Title>
            <Subtitle>{usuarios.length} usuários cadastrados</Subtitle>
          </div>
          <NovoBtn href="/usuarios/novo">+ Novo Usuário</NovoBtn>
        </Header>
        {erro && <ErroMsg>{erro}</ErroMsg>}
        <Lista>
          {usuarios.map((u) => (
            <UsuarioCard key={u._id}>
              <UsuarioInfo>
                <UsuarioNome>{u.nome}</UsuarioNome>
                <UsuarioEmail>{u.email}</UsuarioEmail>
                <RoleBadge admin={u.role === 'admin'}>{u.role}</RoleBadge>
              </UsuarioInfo>
              <Acoes>
                <RoleSelect value={u.role} onChange={(e) => alterarRole(u._id, e.target.value)}>
                  <option value="funcionario">Funcionário</option>
                  <option value="admin">Admin</option>
                </RoleSelect>
                <EditarLink href={`/usuarios/${u._id}/editar`}>Editar</EditarLink>
                <DeletarBtn onClick={() => setConfirmarDeletar(u._id)}>Deletar</DeletarBtn>
              </Acoes>
            </UsuarioCard>
          ))}
        </Lista>
        {confirmarDeletar && (
          <ModalOverlay>
            <ModalBox>
              <ModalTitle>Deletar usuário?</ModalTitle>
              <ModalText>Essa ação não pode ser desfeita.</ModalText>
              <ModalActions>
                <ModalCancelarBtn onClick={() => setConfirmarDeletar(null)}>Cancelar</ModalCancelarBtn>
                <ModalConfirmarBtn onClick={() => deletar(confirmarDeletar)}>Deletar</ModalConfirmarBtn>
              </ModalActions>
            </ModalBox>
          </ModalOverlay>
        )}
      </Main>
    </PageWrapper>
  )
}
