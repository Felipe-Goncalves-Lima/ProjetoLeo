import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Scale, BookOpen, PenTool, Mail, Menu, X, LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { HeaderContainer, NavContent, LogoContainer, RightContainer, Logo, NavLinks, StyledNavLink, MobileMenuButton, AuthLink, UserInfo, LogoutButton, MobileNavLinks } from './style/headerstyle';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

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

        <RightContainer style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <UserInfo>
              {user?.role === 'ADMIN' && (
                <Link 
                  to="/admin" 
                  style={{ 
                    color: 'var(--color-primary-red)', 
                    fontWeight: 'bold', 
                    fontSize: '0.9rem', 
                    marginRight: '0.8rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  Painel Admin
                </Link>
              )}
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary-blue)', fontWeight: '600' }}>
                <User size={16} /> {user?.name}
              </span>
              <LogoutButton onClick={logout}>
                <LogOut size={16} /> Sair
              </LogoutButton>
            </UserInfo>
          ) : (
            <AuthLink to="/login">
              <LogIn size={16} /> Entrar
            </AuthLink>
          )}

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
          
          {isAuthenticated ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0.5rem 0', borderTop: '1px solid var(--color-border)' }}>
              {user?.role === 'ADMIN' && (
                <StyledNavLink to="/admin" onClick={() => setIsOpen(false)} style={{ color: 'var(--color-primary-red)' }}>
                  Painel Admin
                </StyledNavLink>
              )}
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary-blue)', fontWeight: '600', padding: '0.5rem' }}>
                <User size={18} /> {user?.name}
              </span>
              <LogoutButton onClick={() => { logout(); setIsOpen(false); }} style={{ alignSelf: 'flex-start' }}>
                <LogOut size={18} /> Sair
              </LogoutButton>
            </div>
          ) : (
            <StyledNavLink to="/login" onClick={() => setIsOpen(false)} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '0.8rem' }}>
              <LogIn size={18} /> Entrar
            </StyledNavLink>
          )}
        </MobileNavLinks>
      )}
    </HeaderContainer>
  );
}
