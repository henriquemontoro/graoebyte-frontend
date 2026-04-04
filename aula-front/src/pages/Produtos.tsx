import { useEffect, useState } from 'react'
import styled from 'styled-components'
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

const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #fdf6ee;
`

const Sidebar = styled.aside`
  background: #2c1a0e;
  width: 240px;
  min-width: 240px;
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
  min-width: 0;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #2c1a0e;
  margin: 0;
`

const Subtitle = styled.p`
  color: #7a5c3a;
  margin: 4px 0 0;
`

const NovoProdutoBtn = styled.a`
  background: #2c1a0e;
  color: #f5c97a;
  padding: 12px 20px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
`

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
`

const MetricCard = styled.div<{ borderColor: string }>`
  background: white;
  border-radius: 12px;
  padding: 24px 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  border-top: 4px solid ${p => p.borderColor};
`

const MetricLabel = styled.p`
  color: #7a5c3a;
  font-size: 12px;
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

const MetricValue = styled.p<{ color: string }>`
  font-size: 32px;
  font-weight: bold;
  color: ${p => p.color};
  margin: 0;
`

const CategoriaButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`

const CategoriaBtn = styled.button<{ ativo: boolean; cor: string }>`
  background: ${p => p.ativo ? p.cor : 'white'};
  color: ${p => p.ativo ? 'white' : '#2c1a0e'};
  border: 2px solid ${p => p.cor};
  border-radius: 12px;
  padding: 10px 16px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s;
`

const CategoriaNome = styled.div`
  font-weight: 600;
  font-size: 13px;
`

const CategoriaInfo = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-top: 2px;
`

const FiltersRow = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  align-items: center;
`

const BuscaInput = styled.input`
  flex: 1;
  border: 1px solid #c8833b;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 14px;
  box-sizing: border-box;
  background: white;
  height: 46px;
`

const FilterSelect = styled.select`
  border: 1px solid #c8833b;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  height: 46px;
`

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid #c8833b;
  border-radius: 10px;
  overflow: hidden;
  height: 46px;
`

const ViewBtn = styled.button<{ ativo: boolean }>`
  padding: 0 16px;
  background: ${p => p.ativo ? '#2c1a0e' : 'white'};
  color: ${p => p.ativo ? '#f5c97a' : '#2c1a0e'};
  border: none;
  cursor: pointer;
  font-size: 16px;
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`

const ProdutoCard = styled.div<{ borderColor: string; disponivel: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border-top: 4px solid ${p => p.borderColor};
  opacity: ${p => p.disponivel ? 1 : 0.7};
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`

const ProdutoNome = styled.h3`
  font-weight: bold;
  font-size: 16px;
  color: #2c1a0e;
  margin: 0;
`

const StatusBadge = styled.span<{ disponivel: boolean }>`
  font-size: 11px;
  background: ${p => p.disponivel ? '#d4edda' : '#f8d7da'};
  color: ${p => p.disponivel ? '#155724' : '#721c24'};
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 500;
  white-space: nowrap;
  margin-left: 8px;
`

const ProdutoDescricao = styled.p`
  color: #7a5c3a;
  font-size: 13px;
  margin: 0 0 12px;
`

const ProdutoPrecoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`

const Preco = styled.span`
  font-size: 22px;
  font-weight: bold;
  color: #c8833b;
`

const CategoriaBadge = styled.span<{ cor: string }>`
  font-size: 11px;
  background: ${p => p.cor};
  color: white;
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 500;
`

const AtualizadoText = styled.p`
  color: #a07850;
  font-size: 11px;
  margin: 0 0 12px;
`

const CardActions = styled.div`
  display: flex;
  gap: 8px;
`

const DisponibilidadeBtn = styled.button<{ disponivel: boolean }>`
  flex: 1;
  background: ${p => p.disponivel ? '#fff3cd' : '#d4edda'};
  color: ${p => p.disponivel ? '#856404' : '#155724'};
  border: 1px solid ${p => p.disponivel ? '#ffc107' : '#28a745'};
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
`

const EditarLink = styled.a`
  flex: 1;
  background: #fdf6ee;
  color: #2c1a0e;
  border: 1px solid #c8833b;
  padding: 8px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 12px;
  text-align: center;
`

const DeletarBtn = styled.button`
  background: #fff0f0;
  color: #c0392b;
  border: 1px solid #c0392b;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
`

const TabelaWrapper = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
`

const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const THead = styled.thead`
  background: #2c1a0e;
`

const Th = styled.th<{ clicavel?: boolean }>`
  padding: 14px 16px;
  text-align: left;
  color: #f5c97a;
  font-weight: 600;
  font-size: 13px;
  cursor: ${p => p.clicavel ? 'pointer' : 'default'};
  user-select: ${p => p.clicavel ? 'none' : 'auto'};
`

const Tr = styled.tr<{ par: boolean; disponivel: boolean }>`
  background: ${p => p.par ? 'white' : '#fdf6ee'};
  opacity: ${p => p.disponivel ? 1 : 0.6};
`

const Td = styled.td`
  padding: 14px 16px;
  border-bottom: 1px solid #f0e8dc;
`

const TabelaAcoes = styled.div`
  display: flex;
  gap: 6px;
`

const TabelaDisponibilidadeBtn = styled.button<{ disponivel: boolean }>`
  background: ${p => p.disponivel ? '#fff3cd' : '#d4edda'};
  color: ${p => p.disponivel ? '#856404' : '#155724'};
  border: 1px solid ${p => p.disponivel ? '#ffc107' : '#28a745'};
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
`

const TabelaEditarLink = styled.a`
  background: #fdf6ee;
  color: #2c1a0e;
  border: 1px solid #c8833b;
  padding: 6px 10px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 12px;
`

const TabelaDeletarBtn = styled.button`
  background: #fff0f0;
  color: #c0392b;
  border: 1px solid #c0392b;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
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
  border-radius: 16px;
  padding: 32px;
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
  background: #f5f5f5;
  color: #2c1a0e;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
`

const ModalConfirmarBtn = styled.button`
  flex: 1;
  background: #c0392b;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
`

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [busca, setBusca] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [disponivelFiltro, setDisponivelFiltro] = useState('Todos')
  const [view, setView] = useState<'cards' | 'tabela'>('cards')
  const [modalDeletar, setModalDeletar] = useState<{id: string, nome: string} | null>(null)
  const [ordemPreco, setOrdemPreco] = useState<'asc' | 'desc' | null>(null)
  const isAdmin = localStorage.getItem('role') === 'admin'
  const modoFuncionario = localStorage.getItem('modoFuncionario') === 'true'

  const ordemCategorias = ['Bebidas Quentes', 'Bebidas Frias', 'Lanches', 'Doces', 'Outros']

  const corCategoria = (categoria: string) => {
    const cores: {[key: string]: string} = {
      'Bebidas Quentes': '#c8833b',
      'Bebidas Frias': '#a07850',
      'Lanches': '#8a6340',
      'Doces': '#d4a96a',
      'Outros': '#7a5c3a'
    }
    return cores[categoria] || '#7a5c3a'
  }

  const fetchProdutos = async () => {
    const res = await api.get('/produtos')
    setProdutos(res.data)
  }

  const deletar = async (id: string) => {
    await api.delete(`/produtos/${id}`)
    fetchProdutos()
    setModalDeletar(null)
  }

  const toggleDisponivel = async (id: string, disponivel: boolean) => {
    await api.put(`/produtos/${id}`, { disponivel: !disponivel })
    fetchProdutos()
  }

  useEffect(() => { fetchProdutos() }, [])

  const produtosFiltrados = produtos
    .filter(p => {
      const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase()) || p.descricao.toLowerCase().includes(busca.toLowerCase())
      const matchCategoria = categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro
      const matchDisponivel = disponivelFiltro === 'Todos' || (disponivelFiltro === 'Disponíveis' ? p.disponivel : !p.disponivel)
      return matchBusca && matchCategoria && matchDisponivel
    })
    .sort((a, b) => {
      if (ordemPreco) return ordemPreco === 'asc' ? a.preco - b.preco : b.preco - a.preco
      const catA = ordemCategorias.indexOf(a.categoria) === -1 ? 99 : ordemCategorias.indexOf(a.categoria)
      const catB = ordemCategorias.indexOf(b.categoria) === -1 ? 99 : ordemCategorias.indexOf(b.categoria)
      if (catA !== catB) return catA - catB
      return a.nome.localeCompare(b.nome)
    })

  const totalDisponiveis = produtos.filter(p => p.disponivel).length
  const totalIndisponiveis = produtos.filter(p => !p.disponivel).length
  const precoMedio = produtos.length > 0 ? produtos.reduce((acc, p) => acc + p.preco, 0) / produtos.length : 0
  const formatarData = (data: string) => new Date(data).toLocaleDateString('pt-BR')

  const toggleOrdemPreco = () => {
    if (ordemPreco === null) setOrdemPreco('asc')
    else if (ordemPreco === 'asc') setOrdemPreco('desc')
    else setOrdemPreco(null)
  }
  const iconePreco = ordemPreco === 'asc' ? '↑' : ordemPreco === 'desc' ? '↓' : '↕'

  return (
    <PageWrapper>
      {modalDeletar && (
        <ModalOverlay>
          <ModalBox>
            <ModalTitle>Deletar produto?</ModalTitle>
            <ModalText>Tem certeza que deseja deletar <strong>{modalDeletar.nome}</strong>? Essa ação não pode ser desfeita.</ModalText>
            <ModalActions>
              <ModalCancelarBtn onClick={() => setModalDeletar(null)}>Cancelar</ModalCancelarBtn>
              <ModalConfirmarBtn onClick={() => deletar(modalDeletar.id)}>Deletar</ModalConfirmarBtn>
            </ModalActions>
          </ModalBox>
        </ModalOverlay>
      )}
      <Sidebar>
        <LogoWrapper>
          <LogoRow>
            <LogoSpan color="#f5c97a">Grão</LogoSpan>
            <LogoSpan color="white"> & </LogoSpan>
            <LogoSpan color="#c8833b">Byte</LogoSpan>
          </LogoRow>
          <SubText>Sistema de Gestão</SubText>
          {isAdmin && (
            <AdminBadge>{modoFuncionario ? '👁️ Modo Funcionário' : 'Admin'}</AdminBadge>
          )}
        </LogoWrapper>
        <NavLink href="/produtos" ativo>🧾 Produtos</NavLink>
        {isAdmin && !modoFuncionario && <NavLink href="/usuarios">👤 Usuários</NavLink>}
        {isAdmin && !modoFuncionario && <NavLink href="/historico">📋 Histórico</NavLink>}
        {isAdmin && !modoFuncionario && (
          <NavButton onClick={() => { localStorage.setItem('modoFuncionario', 'true'); window.location.reload() }}>
            👁️ Ver como funcionário
          </NavButton>
        )}
        {isAdmin && modoFuncionario && (
          <NavButton ativo onClick={() => { localStorage.removeItem('modoFuncionario'); window.location.reload() }}>
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
            <Title>Produtos</Title>
            <Subtitle>{produtosFiltrados.length} itens encontrados</Subtitle>
          </div>
          <NovoProdutoBtn href="/produtos/novo">+ Novo Produto</NovoProdutoBtn>
        </Header>
        <MetricsGrid>
          <MetricCard borderColor="#c8833b">
            <MetricLabel>Total</MetricLabel>
            <MetricValue color="#2c1a0e">{produtos.length}</MetricValue>
          </MetricCard>
          <MetricCard borderColor="#28a745">
            <MetricLabel>Disponíveis</MetricLabel>
            <MetricValue color="#28a745">{totalDisponiveis}</MetricValue>
          </MetricCard>
          <MetricCard borderColor="#dc3545">
            <MetricLabel>Indisponíveis</MetricLabel>
            <MetricValue color="#dc3545">{totalIndisponiveis}</MetricValue>
          </MetricCard>
          <MetricCard borderColor="#f5c97a">
            <MetricLabel>Preço Médio</MetricLabel>
            <MetricValue color="#c8833b" style={{ fontSize: '28px' }}>R$ {precoMedio.toFixed(2)}</MetricValue>
          </MetricCard>
        </MetricsGrid>
        <CategoriaButtons>
          {ordemCategorias.map(cat => {
            const total = produtos.filter(p => p.categoria === cat).length
            if (total === 0) return null
            const disponiveis = produtos.filter(p => p.categoria === cat && p.disponivel).length
            const ativo = categoriaFiltro === cat
            return (
              <CategoriaBtn key={cat} ativo={ativo} cor={corCategoria(cat)} onClick={() => setCategoriaFiltro(ativo ? 'Todas' : cat)}>
                <CategoriaNome>{cat}</CategoriaNome>
                <CategoriaInfo>{disponiveis} de {total} disponíveis</CategoriaInfo>
              </CategoriaBtn>
            )
          })}
        </CategoriaButtons>
        <FiltersRow>
          <BuscaInput placeholder="🔍 Buscar produto..." value={busca} onChange={(e) => setBusca(e.target.value)} />
          <FilterSelect value={disponivelFiltro} onChange={(e) => setDisponivelFiltro(e.target.value)}>
            <option value="Todos">Disponibilidade: Todas</option>
            <option value="Disponíveis">Disponíveis</option>
            <option value="Indisponíveis">Indisponíveis</option>
          </FilterSelect>
          <ViewToggle>
            <ViewBtn ativo={view === 'cards'} onClick={() => setView('cards')}>⊞</ViewBtn>
            <ViewBtn ativo={view === 'tabela'} onClick={() => setView('tabela')}>☰</ViewBtn>
          </ViewToggle>
        </FiltersRow>
        {view === 'cards' && (
          <CardsGrid>
            {produtosFiltrados.map((p) => (
              <ProdutoCard key={p._id} borderColor={p.disponivel ? corCategoria(p.categoria) : '#ccc'} disponivel={p.disponivel}>
                <CardHeader>
                  <ProdutoNome>{p.nome}</ProdutoNome>
                  <StatusBadge disponivel={p.disponivel}>{p.disponivel ? '● Disponível' : '● Indisponível'}</StatusBadge>
                </CardHeader>
                <ProdutoDescricao>{p.descricao}</ProdutoDescricao>
                <ProdutoPrecoRow>
                  <Preco>R$ {p.preco.toFixed(2)}</Preco>
                  <CategoriaBadge cor={corCategoria(p.categoria)}>{p.categoria || 'Outros'}</CategoriaBadge>
                </ProdutoPrecoRow>
                <AtualizadoText>Atualizado em {formatarData(p.updatedAt)}</AtualizadoText>
                <CardActions>
                  <DisponibilidadeBtn disponivel={p.disponivel} onClick={() => toggleDisponivel(p._id, p.disponivel)}>
                    {p.disponivel ? '✕ Indisponível' : '✓ Disponível'}
                  </DisponibilidadeBtn>
                  <EditarLink href={`/produtos/${p._id}/editar`}>Editar</EditarLink>
                  <DeletarBtn onClick={() => setModalDeletar({ id: p._id, nome: p.nome })}>🗑️</DeletarBtn>
                </CardActions>
              </ProdutoCard>
            ))}
          </CardsGrid>
        )}
        {view === 'tabela' && (
          <TabelaWrapper>
            <Tabela>
              <THead>
                <tr>
                  <Th>Produto</Th>
                  <Th>Categoria</Th>
                  <Th clicavel onClick={toggleOrdemPreco}>Preço {iconePreco}</Th>
                  <Th>Status</Th>
                  <Th>Atualizado</Th>
                  <Th>Ações</Th>
                </tr>
              </THead>
              <tbody>
                {produtosFiltrados.map((p, i) => (
                  <Tr key={p._id} par={i % 2 === 0} disponivel={p.disponivel}>
                    <Td>
                      <p style={{ fontWeight: 'bold', color: '#2c1a0e', margin: '0 0 2px', fontSize: '14px' }}>{p.nome}</p>
                      <p style={{ color: '#7a5c3a', margin: 0, fontSize: '12px' }}>{p.descricao}</p>
                    </Td>
                    <Td><CategoriaBadge cor={corCategoria(p.categoria)}>{p.categoria || 'Outros'}</CategoriaBadge></Td>
                    <Td><span style={{ fontWeight: 'bold', color: '#c8833b', fontSize: '16px' }}>R$ {p.preco.toFixed(2)}</span></Td>
                    <Td>
                      <StatusBadge disponivel={p.disponivel}>{p.disponivel ? '● Disponível' : '● Indisponível'}</StatusBadge>
                    </Td>
                    <Td style={{ color: '#a07850', fontSize: '13px' }}>{formatarData(p.updatedAt)}</Td>
                    <Td>
                      <TabelaAcoes>
                        <TabelaDisponibilidadeBtn disponivel={p.disponivel} onClick={() => toggleDisponivel(p._id, p.disponivel)}>
                          {p.disponivel ? '✕' : '✓'}
                        </TabelaDisponibilidadeBtn>
                        <TabelaEditarLink href={`/produtos/${p._id}/editar`}>Editar</TabelaEditarLink>
                        <TabelaDeletarBtn onClick={() => setModalDeletar({ id: p._id, nome: p.nome })}>🗑️</TabelaDeletarBtn>
                      </TabelaAcoes>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Tabela>
          </TabelaWrapper>
        )}
      </Main>
    </PageWrapper>
  )
}
