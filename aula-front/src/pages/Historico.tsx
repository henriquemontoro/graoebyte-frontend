import { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../config/api'

interface Log {
  _id: string
  usuario: string
  acao: string
  detalhe: string
  data: string
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

const NavButton = styled.button`
  color: #a07850;
  background: none;
  border: 1px solid #a07850;
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

const LimparBtn = styled.button`
  background: #fff0f0;
  color: #c0392b;
  border: 1px solid #c0392b;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
`

const Lista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const LogCard = styled.div`
  background: white;
  border-left: 4px solid #c8833b;
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const LogTexto = styled.div``

const LogUsuario = styled.span`
  font-weight: bold;
  color: #2c1a0e;
`

const LogAcao = styled.span`
  color: #7a5c3a;
`

const LogDetalhe = styled.span`
  color: #c8833b;
  font-weight: 500;
`

const LogData = styled.span`
  color: #a07850;
  font-size: 13px;
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

export default function Historico() {
  const [logs, setLogs] = useState<Log[]>([])
  const [confirmarLimpar, setConfirmarLimpar] = useState(false)
  const isAdmin = localStorage.getItem('role') === 'admin'
  const modoFuncionario = localStorage.getItem('modoFuncionario') === 'true'

  if (modoFuncionario) window.location.href = '/produtos'

  const fetchLogs = async () => {
    const res = await api.get('/logs')
    setLogs(res.data)
  }

  useEffect(() => { fetchLogs() }, [])

  const formatarData = (data: string) => new Date(data).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

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
          {isAdmin && <AdminBadge>Admin</AdminBadge>}
        </LogoWrapper>
        <NavLink href="/produtos">🧾 Produtos</NavLink>
        {isAdmin && <NavLink href="/usuarios">👤 Usuários</NavLink>}
        {isAdmin && <NavLink href="/historico" ativo>📋 Histórico</NavLink>}
        {isAdmin && (
          <NavButton onClick={() => { localStorage.setItem('modoFuncionario', 'true'); window.location.href = '/produtos' }}>
            👁️ Ver como funcionário
          </NavButton>
        )}
        <SairButton onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); localStorage.removeItem('modoFuncionario'); window.location.href = '/' }}>
          → Sair
        </SairButton>
      </Sidebar>
      <Main>
        <Header>
          <div>
            <Title>Histórico</Title>
            <Subtitle>{logs.length} registros</Subtitle>
          </div>
          <LimparBtn onClick={() => setConfirmarLimpar(true)}>🗑️ Limpar histórico</LimparBtn>
        </Header>
        <Lista>
          {logs.map((log) => (
            <LogCard key={log._id}>
              <LogTexto>
                <LogUsuario>{log.usuario}</LogUsuario>
                <LogAcao> {log.acao} </LogAcao>
                {log.detalhe && <LogDetalhe>{log.detalhe}</LogDetalhe>}
              </LogTexto>
              <LogData>{formatarData(log.data)}</LogData>
            </LogCard>
          ))}
        </Lista>
        {confirmarLimpar && (
          <ModalOverlay>
            <ModalBox>
              <ModalTitle>Limpar histórico?</ModalTitle>
              <ModalText>Todos os registros serão removidos permanentemente. Essa ação não pode ser desfeita.</ModalText>
              <ModalActions>
                <ModalCancelarBtn onClick={() => setConfirmarLimpar(false)}>Cancelar</ModalCancelarBtn>
                <ModalConfirmarBtn onClick={async () => { await api.delete('/logs'); setConfirmarLimpar(false); fetchLogs() }}>Limpar tudo</ModalConfirmarBtn>
              </ModalActions>
            </ModalBox>
          </ModalOverlay>
        )}
      </Main>
    </PageWrapper>
  )
}
