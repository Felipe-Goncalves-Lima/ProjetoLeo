import styled from "styled-components";

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-main);
`;

export const InfoBox = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  font-size: 0.95rem;

  ul {
    list-style: none;
    margin-top: 0.5rem;
    
    li {
      margin-bottom: 0.5rem;
    }
  }
`;