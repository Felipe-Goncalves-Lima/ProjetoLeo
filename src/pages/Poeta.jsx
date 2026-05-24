import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PageHeader, Tabs, TabButton, SoundCloudPlaceholder } from '../styles/poetaStyle.jsx';
import { Feed } from '../components/Feed';
import { MOCK_POSTS } from '../data/mockData';
import { PenTool, Music, Book } from 'lucide-react';



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
