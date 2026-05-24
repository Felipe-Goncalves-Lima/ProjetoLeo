import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader, ContactGrid, ContactInfo, InfoItem, ContactForm, FormGroup, Label, Input, TextArea, SubmitButton } from '../styles/contatoStyle';
import { Mail, Phone, MapPin } from 'lucide-react';

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
