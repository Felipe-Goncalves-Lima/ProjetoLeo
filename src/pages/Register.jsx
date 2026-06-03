import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../contexts/AuthContext';
import { Loader, UserPlus, Mail, Lock, User, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { RegisterContainer, FormHeader, Form, FormGroup, Label, InputWrapper, IconContainer, Input, FieldError, SubmitButton, ErrorAlert, SuccessAlert, FooterLinks, PasswordHint } from './styles/registerstyle';


export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  }

  function validate() {
    const errors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'O nome deve ter pelo menos 2 caracteres.';
    }

    if (!formData.email.trim()) {
      errors.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Formato de e-mail inválido.';
    }

    if (!formData.password) {
      errors.password = 'A senha é obrigatória.';
    } else if (formData.password.length < 6) {
      errors.password = 'A senha deve ter pelo menos 6 caracteres.';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Confirme a senha.';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'As senhas não coincidem.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!validate()) return;

    setSubmitting(true);

    try {
      await register(formData.name.trim(), formData.email.trim(), formData.password);
      setSuccessMsg('Conta criada com sucesso! Redirecionando...');
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1200);
    } catch (err) {
      setErrorMsg(err.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Criar Conta | Sensibilidade e Razão</title>
        <meta name="description" content="Crie sua conta no portal Sensibilidade e Razão para interagir com o conteúdo." />
      </Helmet>

      <RegisterContainer>
        <FormHeader>
          <h2>
            <UserPlus size={26} />
            Criar Conta
          </h2>
          <p>Cadastre-se para comentar publicações e interagir no portal.</p>
        </FormHeader>

        {errorMsg && (
          <ErrorAlert>
            <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{errorMsg}</span>
          </ErrorAlert>
        )}

        {successMsg && (
          <SuccessAlert>
            <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{successMsg}</span>
          </SuccessAlert>
        )}

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="register-name">Nome completo</Label>
            <InputWrapper>
              <IconContainer>
                <User size={16} />
              </IconContainer>
              <Input
                id="register-name"
                name="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                disabled={submitting || !!successMsg}
                $hasError={!!fieldErrors.name}
              />
            </InputWrapper>
            {fieldErrors.name && <FieldError>{fieldErrors.name}</FieldError>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="register-email">E-mail</Label>
            <InputWrapper>
              <IconContainer>
                <Mail size={16} />
              </IconContainer>
              <Input
                id="register-email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={submitting || !!successMsg}
                $hasError={!!fieldErrors.email}
              />
            </InputWrapper>
            {fieldErrors.email && <FieldError>{fieldErrors.email}</FieldError>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="register-password">Senha</Label>
            <InputWrapper>
              <IconContainer>
                <Lock size={16} />
              </IconContainer>
              <Input
                id="register-password"
                name="password"
                type="password"
                placeholder="Crie uma senha"
                value={formData.password}
                onChange={handleChange}
                disabled={submitting || !!successMsg}
                $hasError={!!fieldErrors.password}
              />
            </InputWrapper>
            {fieldErrors.password && <FieldError>{fieldErrors.password}</FieldError>}
            {!fieldErrors.password && <PasswordHint>Mínimo de 6 caracteres.</PasswordHint>}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="register-confirm">Confirmar Senha</Label>
            <InputWrapper>
              <IconContainer>
                <Lock size={16} />
              </IconContainer>
              <Input
                id="register-confirm"
                name="confirmPassword"
                type="password"
                placeholder="Repita a senha"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={submitting || !!successMsg}
                $hasError={!!fieldErrors.confirmPassword}
              />
            </InputWrapper>
            {fieldErrors.confirmPassword && <FieldError>{fieldErrors.confirmPassword}</FieldError>}
          </FormGroup>

          <SubmitButton type="submit" disabled={submitting || !!successMsg}>
            {submitting ? (
              <>
                <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Criando conta...
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Criar Conta
              </>
            )}
          </SubmitButton>
        </Form>

        <FooterLinks>
          Já possui uma conta?{' '}
          <Link to="/login" state={location.state}>
            Fazer Login
          </Link>
        </FooterLinks>
      </RegisterContainer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
