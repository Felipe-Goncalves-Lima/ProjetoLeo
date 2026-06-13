import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { PageHeader, Tabs, TabButton, SoundCloudPlaceholder } from './styles/poetaStyle.jsx';
import { Feed } from '../components/Feed';
import { usePosts } from '../hooks/usePosts';
import { PenTool, Music, Book } from 'lucide-react';



export function Poeta() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    return (location.state && location.state.tab) || 'poesia';
  });

  const { posts, loading, error } = usePosts({ categoryType: 'POETA' });

  const filteredPosts = posts.filter(post => {
    const categorySlug = typeof post.category === 'object' ? post.category?.slug : post.category;
    if (!categorySlug) return false;
    if (activeTab === 'poesia') {
      return categorySlug.includes('poesia');
    } else {
      return categorySlug.includes('musica');
    }
  });

  return (
    <div>
      <Helmet>
        <title>Poeta (Arte) | Leonardo Caffaro</title>
        <meta name="description" content="Produções artísticas, poesias e músicas de Leonardo Caffaro." />
      </Helmet>

      <PageHeader>
        <PenTool size={32} color="var(--color-primary-blue)" />
        <h1 style={{ color: '#1D3557' }}>Poeta (Arte)</h1>
      </PageHeader>

      <Tabs>
        <TabButton
          $active={activeTab === 'poesia'}
          onClick={() => setActiveTab('poesia')}
        >
          <Book size={18} /> Poesia
        </TabButton>
        <TabButton
          $active={activeTab === 'musica'}
          onClick={() => setActiveTab('musica')}
        >
          <Music size={18} /> Música
        </TabButton>
      </Tabs>

      <Feed posts={filteredPosts} loading={loading} error={error} />
    </div>
  );
}
