import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader, InfoBox } from './styles/advogadostyle';
import { Feed } from '../components/Feed';
import { usePosts } from '../hooks/usePosts';
import { Scale } from 'lucide-react';



export function Advogado() {
  const { posts, loading, error } = usePosts({ categorySlug: 'advogado' });

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
          <li ><strong style={{ color: '#333C9B' }}>Lattes:</strong> <a href="https://lattes.cnpq.br/4791462285750057" target="_blank" rel="noreferrer">Acessar Currículo Lattes</a></li>
          <li><strong style={{ color: '#333C9B' }}>Especialidades:</strong> Direito Civil, Direito Digital, etc.</li>
        </ul>
      </InfoBox>
      <Feed posts={posts} loading={loading} error={error} />
    </div>
  );
}
