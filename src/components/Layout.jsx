import React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { Footer } from './Footer';

const MainContent = styled.main`
  max-width: var(--max-width-content);
  margin: 2rem auto;
  padding: 0 1rem;
  min-height: calc(100vh - var(--header-height) - 150px);
`;

export function Layout({ children }) {
  return (
    <>
      <Header />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </>
  );
}
