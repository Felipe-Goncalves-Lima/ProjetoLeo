import styled from "styled-components";

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

export const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const TabButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  background: ${props => props.$active ? 'var(--color-primary-blue)' : 'var(--color-bg)'};
  color: ${props => props.$active ? '#FFF' : 'var(--color-text-main)'};
  border: 1px solid ${props => props.$active ? 'var(--color-primary-blue)' : 'var(--color-border)'};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.$active ? 'var(--color-primary-blue)' : 'var(--color-bg-secondary)'};
  }
`;

export const SoundCloudPlaceholder = styled.div`
  background: #f2f2f2;
  border: 1px dashed #ccc;
  padding: 2rem;
  text-align: center;
  border-radius: 8px;
  margin-bottom: 2rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
`;