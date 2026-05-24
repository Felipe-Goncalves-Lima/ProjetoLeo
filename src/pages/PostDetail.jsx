import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { MOCK_POSTS } from '../data/mockData';
import { ArrowLeft, MessageCircle, Share2, ThumbsUp } from 'lucide-react';

const PostContainer = styled.article`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  margin-top: 1rem;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  color: var(--color-text-muted);
  font-weight: 600;
  margin-bottom: 2rem;
  
  &:hover {
    color: var(--color-primary-blue);
  }
`;

const PostHeader = styled.header`
  margin-bottom: 2rem;
`;

const CategoryBadge = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-primary-red);
  margin-bottom: 1rem;
  display: inline-block;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: var(--color-text-main);
  margin-bottom: 1rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
`;

const Content = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--color-text-main);
  white-space: pre-wrap;
  margin-bottom: 3rem;
`;

const InteractionBar = styled.div`
  display: flex;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
  margin-bottom: 2rem;
  gap: 1.5rem;
`;

const InteractionButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-muted);
  font-weight: 600;
  
  &:hover {
    color: var(--color-primary-blue);
  }
`;

const CommentsSection = styled.section`
  margin-top: 2rem;
`;

const Comment = styled.div`
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;

  h4 {
    margin-bottom: 0.3rem;
    font-size: 0.95rem;
  }

  p {
    font-size: 0.9rem;
  }
`;

export function PostDetail() {
  const { category, slug } = useParams();
  const navigate = useNavigate();

  const post = MOCK_POSTS.find(p => p.slug === slug && p.category === category);

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Publicação não encontrada</h2>
        <p>A URL pode estar incorreta ou a postagem foi removida.</p>
        <Link to="/">Voltar ao Início</Link>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{post.title} | Sensibilidade e Razão</title>
        <meta name="description" content={post.content.substring(0, 150) + '...'} />
      </Helmet>

      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Voltar
      </BackButton>

      <PostContainer>
        <PostHeader>
          <CategoryBadge>{post.category}</CategoryBadge>
          <Title>{post.title}</Title>
          <Meta>
            <span>Por {post.author}</span>
            <span>•</span>
            <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
          </Meta>
        </PostHeader>

        {post.soundcloudUrl && (
          <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
            [Embed do SoundCloud para {post.soundcloudUrl}]
          </div>
        )}

        <Content>{post.content}</Content>

        <InteractionBar>
          <InteractionButton>
            <ThumbsUp size={18} /> {post.likes}
          </InteractionButton>
          <InteractionButton onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Link copiado!'))}>
            <Share2 size={18} /> Compartilhar URL
          </InteractionButton>
        </InteractionBar>

        <CommentsSection>
          <h3>Comentários ({post.comments?.length || 0})</h3>
          <div style={{ marginTop: '1.5rem' }}>
            {post.comments?.length > 0 ? (
              post.comments.map(c => (
                <Comment key={c.id}>
                  <h4>{c.author}</h4>
                  <p>{c.text}</p>
                </Comment>
              ))
            ) : (
              <p style={{ color: 'var(--color-text-muted)' }}>Nenhum comentário ainda. Seja o primeiro!</p>
            )}
          </div>
        </CommentsSection>

      </PostContainer>
    </div>
  );
}
