import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ProfileSection = styled.section`
  background: var(--color-bg); 
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
`;

export const ProfileImagePlaceholder = styled.div`
  width: 450px;
  height: 600px;
  border-radius: 20%;
  background-color: var(--color-bg-secondary);
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: var(--color-text-main);
  margin-bottom: 0.5rem;
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
`;

export const Bio = styled.p`
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;