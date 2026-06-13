import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HomeContainer, ProfileSection, ProfileImagePlaceholder, Title, Subtitle, Bio } from './styles/homeStyle';
import { Feed } from '../components/Feed';
import { usePosts } from '../hooks/usePosts';
import fotoPerfil from '../assets/leoHome.webp';



export function Home() {
  const { posts, loading, error } = usePosts({ limit: 10 });

  return (
    <HomeContainer>
      <Helmet>
        <title>Sensibilidade e Razão | Leonardo Caffaro</title>
        <meta name="description" content="Portal sociocultural, jurídico e artístico de Leonardo Caffaro - Advogado, Professor e Poeta." />
      </Helmet>

      <ProfileSection>
        <ProfileImagePlaceholder>
          <img src={fotoPerfil} alt="Foto de perfil de Leonardo Caffaro" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </ProfileImagePlaceholder>
        <Title>Leonardo Caffaro</Title>
        <Subtitle style={{ color: '#101a8bd7' }}>Advogado, Professor e Poeta (Arte)</Subtitle>
        <Bio style={{ textAlign: 'center', fontSize: '1.2rem' }}>
          Bem-vindo ao espaço <strong style={{ color: '#E63946' }}>Sensibilidade e Razão</strong>. Aqui compartilho minhas reflexões
          jurídicas, materiais acadêmicos e produções poéticas e musicais.
          Acredito que a verdadeira justiça só se alcança quando a razão e a sensibilidade andam de mãos dadas<br /><br />
          <strong style={{ color: '#E63946' }}>Do Autor:</strong> Leonardo de Mello Caffaro é Advogado Público,
          na condição de Procurador Federal da Advocacia Geral da União-AGU, vindo ampliando continuamente
          sua participação acadêmica, social e cultural, como Professor e Poeta (Arte) <br /><br />
          <span style={{ color: '#E63946', marginRight: '119px' }}><strong>Meu lattes:</strong> <a href="https://lattes.cnpq.br/4791462285750057" target="_blank">Lattes Leonardo Caffaro (clique aqui)</a></span><br />
          <span style={{ color: '#E63946', marginRight: '120px' }}><strong>Meu Orcid: </strong><a href="https://orcid.org/0009-0006-9960-6556" target="_blank">Orcid Leonardo Caffaro (clique aqui)</a></span>
        </Bio>
      </ProfileSection>

      <section>
        <h2 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem', color: '#333C9B' }}>
          Atualizações Recentes
        </h2>
        <Feed posts={posts} loading={loading} error={error} />
      </section>
    </HomeContainer>
  );
}
