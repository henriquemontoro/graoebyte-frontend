import { useState } from 'react'
import styled from 'styled-components'
import api from '../config/api'

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  background: #2c1a0e;
`

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 64px;
  background: linear-gradient(135deg, #2c1a0e 0%, #4a2c14 100%);
`

const LogoRow = styled.div`
  margin-bottom: 48px;
`

const LogoSpan = styled.span<{ color: string }>`
  color: ${p => p.color};
  font-size: 48px;
  font-weight: bold;
`

const Tagline = styled.p`
  color: #a07850;
  font-size: 18px;
  line-height: 1.8;
  max-width: 400px;
`

const FeatureList = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const FeatureText = styled.span`
  color: #c8833b;
  font-size: 15px;
`

const RightPanel = styled.div`
  width: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
  background: #fdf6ee;
`

const FormWrapper = styled.div`
  width: 100%;
`

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #2c1a0e;
  margin-bottom: 8px;
`

const Subtitle = styled.p`
  color: #7a5c3a;
  font-size: 14px;
  margin-bottom: 32px;
`

const ErroMsg = styled.p`
  color: #c0392b;
  font-size: 14px;
  margin-bottom: 16px;
  background: #fff0f0;
  padding: 12px;
  border-radius: 8px;
`

const FormGroup = styled.div`
  margin-bottom: 16px;
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

const Input = styled.input`
  width: 100%;
  border: 1px solid #c8833b;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  background: white;
  box-sizing: border-box;
`

const SenhaWrapper = styled.div`
  position: relative;
`

const SenhaInput = styled.input`
  width: 100%;
  border: 1px solid #c8833b;
  border-radius: 8px;
  padding: 12px;
  padding-right: 48px;
  font-size: 14px;
  background: white;
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

const EntrarBtn = styled.button`
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

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, senha })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.role)
      localStorage.setItem('nome', res.data.nome || res.data.email)
      localStorage.removeItem('modoFuncionario')
      window.location.href = '/produtos'
    } catch {
      setErro('Email ou senha incorretos')
    }
  }

  return (
    <PageWrapper>
      <LeftPanel>
        <LogoRow>
          <LogoSpan color="#f5c97a">Grão</LogoSpan>
          <LogoSpan color="white"> & </LogoSpan>
          <LogoSpan color="#c8833b">Byte</LogoSpan>
        </LogoRow>
        <Tagline>Sistema de gestão interna para controle de produtos, cardápio e equipe da cafeteria.</Tagline>
        <FeatureList>
          <FeatureItem>
            <span style={{ fontSize: '24px' }}>🧾</span>
            <FeatureText>Gestão completa de produtos e cardápio</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <span style={{ fontSize: '24px' }}>👥</span>
            <FeatureText>Controle de acesso por funcionário</FeatureText>
          </FeatureItem>
          <FeatureItem>
            <span style={{ fontSize: '24px' }}>📋</span>
            <FeatureText>Histórico completo de alterações</FeatureText>
          </FeatureItem>
        </FeatureList>
      </LeftPanel>
      <RightPanel>
        <FormWrapper>
          <Title>Bem-vindo de volta</Title>
          <Subtitle>Entre com suas credenciais para acessar o sistema</Subtitle>
          {erro && <ErroMsg>{erro}</ErroMsg>}
          <FormGroup>
            <Label>Email</Label>
            <Input placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroupLast>
            <Label>Senha</Label>
            <SenhaWrapper>
              <SenhaInput
                placeholder="••••••••"
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <MostrarSenhaBtn onClick={() => setMostrarSenha(!mostrarSenha)}>
                {mostrarSenha ? '🙈' : '👁️'}
              </MostrarSenhaBtn>
            </SenhaWrapper>
          </FormGroupLast>
          <EntrarBtn onClick={handleLogin}>Entrar</EntrarBtn>
        </FormWrapper>
      </RightPanel>
    </PageWrapper>
  )
}
