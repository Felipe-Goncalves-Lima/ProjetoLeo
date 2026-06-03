import React from 'react';
import styled, { keyframes } from 'styled-components';
import { PostCard } from './PostCard';

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--color-text-muted);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: var(--color-text-muted);
  flex-direction: column;
  gap: 1rem;
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary-blue);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #991b1b;
  background: #fee2e2;
  border: 1px solid #fca5a5;
  border-radius: 8px;
`;

export function Feed({ posts, loading, error }) {
  if (loading) {
    return (
      <LoadingWrapper>
        <Spinner />
        <span>Carregando publicações...</span>
      </LoadingWrapper>
    );
  }

  if (error) {
    return (
      <ErrorState>
        <p><strong>Não foi possível carregar as publicações.</strong></p>
        <p style={{ marginTop: '0.4rem', fontSize: '0.9rem' }}>{error}</p>
      </ErrorState>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <EmptyState>
        <p>Nenhuma publicação encontrada no momento.</p>
      </EmptyState>
    );
  }

  return (
    <FeedContainer>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </FeedContainer>
  );
}
