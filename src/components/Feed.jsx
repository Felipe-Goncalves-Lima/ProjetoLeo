import React from 'react';
import styled from 'styled-components';
import { PostCard } from './PostCard';

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

export function Feed({ posts }) {
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
