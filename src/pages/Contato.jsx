import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageHeader, ContactGrid, ContactInfo, InfoItem, ContactForm, FormGroup, Label, Input, TextArea, SubmitButton } from './styles/contatoStyle';
import { Mail, Phone, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { sendContactMessage } from '../services/api';
import styled from 'styled-components';

const AlertBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.9rem 1.1rem;
  border-radius: 8px;
  margin-bottom: 1.2rem;
  font-size: 0.95rem;
  font-weight: 500;
  background: ${props => props.type === 'error' ? '#fee2e2' : '#d1fae5'};
  color: ${props => props.type === 'error' ? '#991b1b' : '#065f46'};
  border: 1px solid ${props => props.type === 'error' ? '#fca5a5' : '#6ee7b7'};
`;

export function Contato() {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: searchParams.get('subject') || '',
    message: searchParams.get('message') || ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setFeedback({ type: 'error', message: 'Por favor, preencha todos os campos.' });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      await sendContactMessage(form);
      setFeedback({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Responderei em breve.',
      });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Erro ao enviar mensagem. Tente novamente.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <Helmet>
        <title>Contato | Leonardo Caffaro</title>
        <meta name="description" content="Entre em contato com Leonardo Caffaro." />
      </Helmet>

      <PageHeader>
        <Mail size={32} color="var(--color-primary-blue)" />
        <h1 style={{ color: '#1D3557' }}>Contato</h1>
      </PageHeader>

      <ContactGrid>
        <ContactInfo>
          <h3 style={{ color: '#ff0000f1' }}>Informações Diretas</h3>
          <p style={{ marginBottom: '2rem', color: 'var(--color-text-muted)' }}>
            Sinta-se à vontade para entrar em contato para consultas jurídicas, convites acadêmicos ou parcerias artísticas.
          </p>

          <InfoItem>
            <Mail color="var(--color-primary-blue)" />
            <p style={{ color: '#1D3557' }}>contato@leonardocaffaro.com.br</p>
          </InfoItem>

          <InfoItem>
            <Phone color="var(--color-primary-blue)" />
            <p style={{ color: '#1D3557' }}>(21) 99605-7925</p>
          </InfoItem>
        </ContactInfo>

        <ContactForm onSubmit={handleSubmit}>
          <h3 style={{ color: '#ff0000f1' }}>Envie uma mensagem</h3>

          {feedback && (
            <AlertBox type={feedback.type}>
              {feedback.type === 'success'
                ? <CheckCircle size={18} />
                : <AlertCircle size={18} />
              }
              {feedback.message}
            </AlertBox>
          )}

          <FormGroup>
            <Label htmlFor="name" style={{ color: '#1D3557' }}>Nome Completo</Label>
            <Input
              type="text"
              id="name"
              placeholder="Seu nome"
              value={form.name}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email" style={{ color: '#1D3557' }}>E-mail</Label>
            <Input
              type="email"
              id="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="subject" style={{ color: '#1D3557' }}>Assunto</Label>
            <Input
              type="text"
              id="subject"
              placeholder="Ex: Consulta Jurídica"
              value={form.subject}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message" style={{ color: '#1D3557' }}>Mensagem</Label>
            <TextArea
              id="message"
              placeholder="Como posso ajudar?"
              value={form.message}
              onChange={handleChange}
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Enviando...
              </>
            ) : (
              'Enviar Mensagem'
            )}
          </SubmitButton>
        </ContactForm>
      </ContactGrid>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
