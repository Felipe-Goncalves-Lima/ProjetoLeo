import styled from "styled-components";

export const LoginContainer = styled.div`
  max-width: 420px;
  width: 100%;
  margin: 4rem auto;
  padding: 2.5rem;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);

  @media (max-width: 576px) {
    padding: 1.5rem;
    margin: 2rem auto;
  }
`;

export const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h2 {
    font-family: var(--font-serif);
    font-size: 1.8rem;
    color: var(--color-primary-blue);
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: var(--color-text-muted);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
`;

export const Label = styled.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-main);
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.div`
  position: absolute;
  left: 0.8rem;
  color: var(--color-text-muted);
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.7rem 0.8rem 0.7rem 2.4rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-bg);
  color: var(--color-text-main);
  font-size: 0.95rem;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: var(--color-primary-blue);
    box-shadow: 0 0 0 3px rgba(29, 53, 87, 0.15);
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: var(--color-primary-blue);
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  transition: opacity 0.2s, transform 0.1s;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorAlert = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  background-color: #fee2e2;
  border: 1px solid #fca5a5;
  color: #991b1b;
  border-radius: 8px;
  font-size: 0.88rem;
  line-height: 1.4;
`;