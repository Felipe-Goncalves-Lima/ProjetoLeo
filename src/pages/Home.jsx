import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HomeContainer, ProfileSection, ProfileImagePlaceholder, Title, Subtitle, Bio } from '../styles/homeStyle.jsx';
import { Feed } from '../components/Feed';
import { MOCK_POSTS } from '../data/mockData';
import fotoPerfil from '../assets/imagemHomeLeo.jpg';



export function Home() {
  return (
    <HomeContainer>
      <Helmet>
        <title>Sensibilidade e Razão | Leonardo Caffaro</title>
        <meta name="description" content="Portal sociocultural, jurídico e artístico de Leonardo Caffaro - Advogado, Professor e Poeta." />
      </Helmet>

      <ProfileSection>
        <ProfileImagePlaceholder>
          <img src={fotoPerfil} alt="Foto de perfil de Leonardo Caffaro" style={{ width: '100%', height: '100%', borderRadius: '15%', objectFit: 'cover', border: '4px solid var(--color-border)' }} />
        </ProfileImagePlaceholder>
        <Title>Leonardo Caffaro</Title>
        <Subtitle style={{ color: '#101a8bd7' }}>Advogado, Professor e Poeta (Arte)</Subtitle>
        <Bio>
          Bem-vindo ao espaço <strong style={{ color: '#E63946' }}>Sensibilidade e Razão</strong>. Aqui compartilho minhas reflexões 
          jurídicas, materiais acadêmicos e produções poéticas e musicais. 
          Acredito que a verdadeira justiça só se alcança quando a razão e a sensibilidade andam de mãos dadas.
        </Bio>
      </ProfileSection>

      <section>
        <h2 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', color: '#333C9B' }}>
          Atualizações Recentes
        </h2>
        <Feed posts={MOCK_POSTS} />
      </section>
    </HomeContainer>
  );
}
