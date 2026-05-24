import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader, InfoBox } from '../styles/advogadostyle';
import { Feed } from '../components/Feed';
import { MOCK_POSTS } from '../data/mockData';
import { Scale } from 'lucide-react';



export function Advogado() {
  const posts = MOCK_POSTS.filter(post => post.category === 'advogado');

  return (
    <div>
      <Helmet>
        <title>Advogado | Leonardo Caffaro</title>
        <meta name="description" content="Artigos jurídicos, opiniões e atuações profissionais do advogado Leonardo Caffaro." />
      </Helmet>

      <PageHeader>
        <Scale size={32} color="var(--color-primary-blue)" />
        <h1 style={{ color: '#1D3557' }}>Atuação Jurídica</h1>
      </PageHeader>

      <InfoBox>
        <h3 style={{ color: '#E63946' }}>Credenciais</h3>
        <ul>
          <li><strong style={{ color: '#333C9B' }}>OAB:</strong> XX.XXX/UF</li>
          <li ><strong style={{ color: '#333C9B' }}>Lattes:</strong> <a href="#" target="_blank" rel="noreferrer">Acessar Currículo Lattes</a></li>
          <li><strong style={{ color: '#333C9B' }}>Especialidades:</strong> Direito Civil, Direito Digital, etc.</li>
        </ul>
      </InfoBox>
      <Feed posts={posts} />
    </div>
  );
}
