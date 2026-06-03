import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`;

export const ProfileSection = styled.section`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  width: 100%;

  @media (max-width: 992px) {
    padding: 1.8rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem 1.2rem;
    border-radius: 6px;
  }

  @media (max-width: 576px) {
    padding: 1.2rem 1rem;
  }
`;

export const ProfileImagePlaceholder = styled.div`
  width: 100%;
  max-width: 450px;
  aspect-ratio: 3 / 4;
  margin: 0 auto 1.5rem;
  border-radius: 40%;
  overflow: hidden;
  position: relative;

  color: var(--color-text-muted);
  font-size: 0.9rem;

  @media (max-width: 992px) {
    max-width: 380px;
  }

  @media (max-width: 768px) {
    max-width: 300px;
    border-radius: 16%;
  }

  @media (max-width: 576px) {
    max-width: 230px;
    font-size: 0.8rem;
    margin-bottom: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: var(--color-text-main);
  margin-bottom: 0.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 576px) {
    font-size: 1.5rem;
  }

  @media (max-width: 400px) {
    font-size: 1.3rem;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1rem;
  color: var(--color-text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 576px) {
    font-size: 0.95rem;
    margin-bottom: 1.2rem;
  }
`;

export const Bio = styled.p`
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
  font-size: 1rem;
  word-break: break-word;

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 0.95rem;
  }

  @media (max-width: 576px) {
    font-size: 0.9rem;
    text-align: left;
  }
`;

