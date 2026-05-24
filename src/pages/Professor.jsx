import React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Feed } from '../components/Feed';
import { MOCK_POSTS } from '../data/mockData';
import { BookOpen, Book } from 'lucide-react';

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
`;

const BooksSection = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const BookItem = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg-secondary);
`;

const BookCover = styled.div`
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

export function Professor() {
  const posts = MOCK_POSTS.filter(post => post.category === 'professor');

  return (
    <div>
      <Helmet>
        <title>Professor | Leonardo Caffaro</title>
        <meta name="description" content="Materiais acadêmicos, livros e publicações de Leonardo Caffaro." />
      </Helmet>

      <PageHeader>
        <BookOpen size={32} color="var(--color-primary-blue)" />
        <h1 style={{ color: '#1D3557' }}>Acadêmico & Professor</h1>
      </PageHeader>

      <BooksSection>
        <h3 style={{ color: '#1D3557'}}><Book size={20} style={{display:'inline', verticalAlign:'middle', marginRight:'0.5rem'}}/> Livros Publicados</h3>
        <BookItem>
          <BookCover>Capa do Livro (Em breve)</BookCover>
          <div>
            <h4 style={{ color: '#E63946' }}>Ensaio sobre a Justiça Contemporânea</h4>
            <p style={{ color: '#1D3557' }}><strong>Editora:</strong> Dialética Editora</p>
            <p style={{marginTop:'0.5rem', fontSize:'0.9rem'}}>
              Uma obra focada em desmistificar a aplicação do direito na era moderna, com foco em jurisprudência atual.
            </p>
            <a href="#" style={{display:'inline-block', marginTop:'1rem', color:'var(--color-primary-red)', fontWeight:'bold'}}>
              Adquirir Livro
            </a>
          </div>
        </BookItem>
      </BooksSection>

      <h2 style={{color: '#1D3557'}}>Materiais de Aula & Artigos</h2>
      <div style={{marginTop: '1rem'}}>
        <Feed posts={posts} />
      </div>
    </div>
  );
}
