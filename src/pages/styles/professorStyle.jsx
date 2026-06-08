import styled from "styled-components";

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

export const BooksSection = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

export const BookItem = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg-secondary);

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const BookCover = styled.div`
  width: 100px;
  height: 150px;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 0.8rem;
`;

export const BookCoverPlaceholder = styled.div`
  width: 100px;
  height: 150px;
  background: linear-gradient(135deg, #1d3557 0%, #e63946 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
  user-select: none;
  flex-shrink: 0;
`;

export const BookCoverImage = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
`;

export const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-top: 1rem;
`;

export const CarouselTrack = styled.div`
  display: flex;
  transition: transform 0.4s ease-in-out;
  transform: translateX(${props => props.$translate}%);
`;

export const CarouselSlide = styled.div`
  min-width: 100%;
  box-sizing: border-box;
`;

export const CarouselControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 0 0.5rem;
`;

export const CarouselButton = styled.button`
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--color-text-main);
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: var(--color-bg-secondary);
    border-color: var(--color-primary-blue);
    color: var(--color-primary-blue);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const CarouselDots = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const CarouselDot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$active ? 'var(--color-primary-blue)' : 'var(--color-border)'};
  cursor: pointer;
  transition: background-color 0.2s;
  padding: 0;

  &:hover {
    background: var(--color-primary-blue);
  }
`;