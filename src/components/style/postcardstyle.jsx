import styled from "styled-components";
import { Link } from "react-router-dom";

export const Card = styled.article`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AuthorName = styled.span`
  font-weight: 600;
  color: var(--color-text-main);
`;

export const PostDate = styled.span`
  font-size: 0.85rem;
  color: var(--color-text-muted);
`;

export const CategoryBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-primary-blue);
  background: var(--color-bg-secondary);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  height: fit-content;
`;

export const PostTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  
  a {
    color: var(--color-text-main);
    text-decoration: none;
    
    &:hover {
      color: var(--color-primary-blue);
    }
  }
`;

export const PostPreview = styled.p`
  color: var(--color-text-main);
  margin-bottom: 1rem;
  white-space: pre-line;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ReadMore = styled(Link)`
  color: var(--color-primary-red);
  font-weight: 600;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1rem;
`;

export const InteractionBar = styled.div`
  display: flex;
  border-top: 1px solid var(--color-border);
  padding-top: 1rem;
  gap: 1.5rem;
`;

export const InteractionButton = styled.button`
  background: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem;
  border-radius: 4px;

  &:hover {
    background: var(--color-bg-secondary);
  }
`;