import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Feed } from '../components/Feed';
import { MOCK_POSTS } from '../data/mockData';
import { PenTool, Music, Book } from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  background: ${props => props.active ? 'var(--color-primary-blue)' : 'var(--color-bg)'};
  color: ${props => props.active ? '#FFF' : 'var(--color-text-main)'};
  border: 1px solid ${props => props.active ? 'var(--color-primary-blue)' : 'var(--color-border)'};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? 'var(--color-primary-blue)' : 'var(--color-bg-secondary)'};
  }
`;

const SoundCloudPlaceholder = styled.div`
  background: #f2f2f2;
  border: 1px dashed #ccc;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
`;

export function Poeta() {
  const [activeTab, setActiveTab] = useState('poesia');

  const posts = MOCK_POSTS.filter(post => post.category === activeTab);

  return (
    <div>
      <Helmet>
        <title>Poeta (Arte) | Leonardo Caffaro</title>
        <meta name="description" content="Produções artísticas, poesias e músicas de Leonardo Caffaro." />
      </Helmet>

      <PageHeader>
        <PenTool size={32} color="var(--color-primary-blue)" />
        <h1 style={{color: '#1D3557'}}>Poeta (Arte)</h1>
      </PageHeader>

      <Tabs>
        <TabButton 
          active={activeTab === 'poesia'} 
          onClick={() => setActiveTab('poesia')}
        >
          <Book size={18} /> Poesia
        </TabButton>
        <TabButton 
          active={activeTab === 'musica'} 
          onClick={() => setActiveTab('musica')}
        >
          <Music size={18} /> Música
        </TabButton>
      </Tabs>

      {activeTab === 'musica' && (
        <SoundCloudPlaceholder>
          [Área reservada para Iframe do SoundCloud]<br/>
          As músicas serão integradas diretamente do SoundCloud aqui para reprodução na página.
        </SoundCloudPlaceholder>
      )}

      <Feed posts={posts} />
    </div>
  );
}
