import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, Link } from 'react-router-dom';
import { Scale, BookOpen, PenTool, Mail, Menu, X } from 'lucide-react';

const HeaderContainer = styled.header`
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  display: flex;
  align-items: center;
`;

const NavContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Logo = styled(Link)`
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary-blue);
  text-decoration: none;
  padding-bottom: 3px;
  
  span {
    color: var(--color-primary-red);
  }

  &:hover {
    text-decoration: none;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  justify-self: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem;
  border-bottom: 2px solid transparent;
  white-space: nowrap;

  &:hover {
    color: var(--color-primary-blue);
    text-decoration: none;
  }

  &.active {
    color: var(--color-primary-blue);
    border-bottom: 2px solid var(--color-primary-red);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: var(--color-text-main);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLinks = styled.div`
  position: absolute;
  top: var(--header-height);
  left: 0;
  right: 0;
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  z-index: 99;

  @media (min-width: 769px) {
    display: none;
  }
`;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderContainer>
      <NavContent>
        <LogoContainer>
          <Logo to="/" onClick={() => setIsOpen(false)}>
            Sensibilidade <span>&</span> Razão
          </Logo>
        </LogoContainer>
        
        <NavLinks>
          <StyledNavLink to="/" end>
            Apresentação
          </StyledNavLink>
          <StyledNavLink to="/advogado">
            <Scale size={18} />
            Advogado
          </StyledNavLink>
          <StyledNavLink to="/professor">
            <BookOpen size={18} />
            Professor
          </StyledNavLink>
          <StyledNavLink to="/poeta">
            <PenTool size={18} />
            Poeta (Arte)
          </StyledNavLink>
          <StyledNavLink to="/contato">
            <Mail size={18} />
            Contato
          </StyledNavLink>
        </NavLinks>

        <RightContainer>
          <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </RightContainer>
      </NavContent>

      {isOpen && (
        <MobileNavLinks>
          <StyledNavLink to="/" end onClick={() => setIsOpen(false)}>
            Apresentação
          </StyledNavLink>
          <StyledNavLink to="/advogado" onClick={() => setIsOpen(false)}>
            <Scale size={18} />
            Advogado
          </StyledNavLink>
          <StyledNavLink to="/professor" onClick={() => setIsOpen(false)}>
            <BookOpen size={18} />
            Professor
          </StyledNavLink>
          <StyledNavLink to="/poeta" onClick={() => setIsOpen(false)}>
            <PenTool size={18} />
            Poeta (Arte)
          </StyledNavLink>
          <StyledNavLink to="/contato" onClick={() => setIsOpen(false)}>
            <Mail size={18} />
            Contato
          </StyledNavLink>
        </MobileNavLinks>
      )}
    </HeaderContainer>
  );
}
