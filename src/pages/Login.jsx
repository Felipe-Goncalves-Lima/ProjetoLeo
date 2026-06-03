import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { Loader, Lock, Mail, AlertCircle } from 'lucide-react';
import { LoginContainer, FormHeader, Form, FormGroup, Label, InputWrapper, IconContainer, Input, SubmitButton, ErrorAlert } from './styles/loginstyle';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Preencha o e-mail e a senha.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || 'Erro ao realizar login. Verifique suas credenciais.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Acesso Restrito | Sensibilidade e Razão</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <LoginContainer>
        <FormHeader>
          <h2>Acesso ao Portal</h2>
          <p>Digite seus dados para se identificar e comentar no site.</p>
        </FormHeader>

        {errorMsg && (
          <ErrorAlert>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errorMsg}</span>
          </ErrorAlert>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">E-mail</Label>
            <InputWrapper>
              <IconContainer>
                <Mail size={16} />
              </IconContainer>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={submitting}
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">Senha</Label>
            <InputWrapper>
              <IconContainer>
                <Lock size={16} />
              </IconContainer>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={submitting}
              />
            </InputWrapper>
          </FormGroup>

          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Entrando...
              </>
            ) : (
              'Entrar'
            )}
          </SubmitButton>
        </Form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
          Não possui uma conta?{' '}
          <Link to="/cadastro" state={location.state} style={{ color: 'var(--color-primary-blue)', fontWeight: '600' }}>
            Criar Conta
          </Link>
        </div>
      </LoginContainer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
