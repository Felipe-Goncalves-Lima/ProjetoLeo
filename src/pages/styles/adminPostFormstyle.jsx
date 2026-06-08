import styled from 'styled-components';


export const FormContainer = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  margin-top: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: var(--color-primary-blue);
  font-family: var(--font-serif);
  margin-bottom: 2rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.2rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-main);
`;

export const Input = styled.input`
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg-secondary);
  color: var(--color-text-main);
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: var(--color-primary-blue);
  }
`;

export const Select = styled.select`
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg-secondary);
  color: var(--color-text-main);
  font-size: 0.9rem;
  font-weight: 600;

  &:focus {
    outline: none;
    border-color: var(--color-primary-blue);
  }
`;

export const TextArea = styled.textarea`
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg-secondary);
  color: var(--color-text-main);
  font-size: 0.9rem;
  min-height: ${props => props.height || '100px'};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--color-primary-blue);
  }
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.2rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-main);
`;

export const SectionTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--color-primary-blue);
  margin: 2rem 0 1rem 0;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.4rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: opacity 0.2s;
  cursor: pointer;
  background: ${props => props.bg || 'var(--color-bg-secondary)'};
  color: ${props => props.color || 'var(--color-text-main)'};
  border: 1px solid ${props => props.border || 'var(--color-border)'};

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const FeedbackMessage = styled.div`
  padding: 0.8rem 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  background: ${props => props.type === 'error' ? '#fee2e2' : '#d1fae5'};
  color: ${props => props.type === 'error' ? '#991b1b' : '#065f46'};
  border: 1px solid ${props => props.type === 'error' ? '#fca5a5' : '#6ee7b7'};
`;

export const AttachmentCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  padding: 0.8rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
`;

export const ActionButton = styled.button`
  background: ${props => props.bg || 'var(--color-bg-secondary)'};
  border: 1px solid ${props => props.border || 'var(--color-border)'};
  color: ${props => props.color || 'var(--color-text-main)'};
  padding: 0.4rem;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.85;
    background: ${props => props.hoverBg || 'var(--color-border)'};
  }
`;

export const MediaCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1rem;
`;

export const MediaCardItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  gap: 1rem;
`;

export const MediaThumbnail = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid var(--color-border);
`;

export const MediaIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  background: #fdf2f2;
  color: var(--color-primary-red);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid var(--color-border);
`;