import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Mail, Phone, MapPin } from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: var(--color-text-main);

  p {
    font-size: 1.1rem;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-family: inherit;
  
  &:focus {
    border-color: var(--color-primary-blue);
    outline: none;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;

  &:focus {
    border-color: var(--color-primary-blue);
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background: var(--color-primary-red);
  color: #fff;
  padding: 1rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

export function Contato() {
  return (
    <div>
      <Helmet>
        <title>Contato | Leonardo Caffaro</title>
        <meta name="description" content="Entre em contato com Leonardo Caffaro." />
      </Helmet>

      <PageHeader>
        <Mail size={32} color="var(--color-primary-blue)" />
        <h1 style={{color: '#1D3557'}}>Contato</h1>
      </PageHeader>

      <ContactGrid>
        <ContactInfo>
          <h3 style={{color: '#ff0000f1'}}>Informações Diretas</h3>
          <p style={{marginBottom: '2rem', color: 'var(--color-text-muted)'}}>
            Sinta-se à vontade para entrar em contato para consultas jurídicas, convites acadêmicos ou parcerias artísticas.
          </p>

          <InfoItem>
            <Mail color="var(--color-primary-blue)" />
            <p style={{color: '#1D3557'}}>contato@leonardocaffaro.com.br</p>
          </InfoItem>
          
          <InfoItem>
            <Phone color="var(--color-primary-blue)" />
            <p style={{color: '#1D3557'}}>(21) 99605-7925</p>
          </InfoItem>

          <InfoItem>
            <MapPin color="var(--color-primary-blue)" />
            <p style={{color: '#1D3557'}}>Endereço do Escritório (Opcional)</p>
          </InfoItem>
        </ContactInfo>

        <ContactForm onSubmit={(e) => e.preventDefault()}>
          <h3 style={{color: '#ff0000f1', }}>Envie uma mensagem</h3>
          
          <FormGroup>
            <Label htmlFor="name" style={{color: '#1D3557'}}>Nome Completo</Label>
            <Input type="text" id="name" placeholder="Seu nome" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email" style={{color: '#1D3557'}}>E-mail</Label>
            <Input type="email" id="email" placeholder="seu@email.com" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="assunto" style={{color: '#1D3557'}}>Assunto</Label>
            <Input type="text" id="assunto" placeholder="Ex: Consulta Jurídica" />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="message" style={{color: '#1D3557'}}>Mensagem</Label>
            <TextArea id="message" placeholder="Como posso ajudar?" />
          </FormGroup>

          <SubmitButton type="submit">Enviar Mensagem</SubmitButton>
        </ContactForm>
      </ContactGrid>
    </div>
  );
}
