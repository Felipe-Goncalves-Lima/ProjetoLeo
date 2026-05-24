import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--color-bg);
  padding: 2rem 1rem;
  text-align: center;
  border-top: 1px solid var(--color-border);
  margin-top: 3rem;
`;

const FooterText = styled.p`
  color: var(--color-text-muted);
  font-size: 0.9rem;
`;

export function Footer() {
  return (
    <FooterContainer>
      <FooterText>
        © {new Date().getFullYear()} Leonardo Caffaro - Advogado, Professor e Poeta.<br />
        Todos os direitos reservados.
      </FooterText>
    </FooterContainer>
  );
}
