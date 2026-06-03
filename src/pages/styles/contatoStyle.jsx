import styled from "styled-components";

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const ContactInfo = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;

  @media (max-width: 576px) {
    padding: 1.5rem 1rem;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: var(--color-text-main);
  overflow-wrap: break-word;
  word-break: break-word;

  p {
    font-size: 1.1rem;
    overflow-wrap: break-word;
    word-break: break-word;

    @media (max-width: 576px) {
      font-size: 0.95rem;
    }
  }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;

  @media (max-width: 576px) {
    padding: 1.5rem 1rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
`;

export const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-family: inherit;
  
  &:focus {
    border-color: var(--color-primary-blue);
    outline: none;
  }
`;

export const TextArea = styled.textarea`
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;

  &:focus {
    border-color: var(--color-primary-blue);
    outline: none;
  }
`;

export const SubmitButton = styled.button`
  background: var(--color-primary-red);
  color: #fff;
  padding: 1rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1rem;
  margin-top: 1rem;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;