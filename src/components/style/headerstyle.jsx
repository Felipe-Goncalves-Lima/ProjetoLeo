import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const HeaderContainer = styled.header`
  background-color: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
  height: var(--header-height);
  display: flex;
  align-items: center;
`;

export const NavContent = styled.div`
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

export const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const RightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Logo = styled(Link)`
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

export const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  justify-self: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledNavLink = styled(NavLink)`
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

export const MobileMenuButton = styled.button`
  display: none;
  background: none;
  color: var(--color-text-main);
  
  @media (max-width: 768px) {
    display: block;
  }
`;

export const AuthLink = styled(Link)`
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  transition: all 0.2s;

  &:hover {
    color: var(--color-primary-blue);
    border-color: var(--color-primary-blue);
    text-decoration: none;
  }

  @media (max-width: 768px) {
    display: none !important;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: var(--color-text-main);

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: 1px solid transparent;
  color: var(--color-primary-red);
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #fee2e2;
  }
`;

export const MobileNavLinks = styled.div`
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