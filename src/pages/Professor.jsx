import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Feed } from '../components/Feed';
import { usePosts } from '../hooks/usePosts';
import { BookOpen, Book } from 'lucide-react';
import { PageHeader, BooksSection, BookItem, BookCover } from './styles/professorStyle.jsx';


export function Professor() {
  const { posts, loading, error } = usePosts({ categorySlug: 'professor' });

  return (
    <div>
      <Helmet>
        <title>Professor | Leonardo Caffaro</title>
        <meta name="description" content="Materiais acadêmicos, livros e publicações de Leonardo Caffaro." />
      </Helmet>

      <PageHeader>
        <BookOpen size={32} color="var(--color-primary-blue)" />
        <h1 style={{ color: '#1D3557' }}>Acadêmico &amp; Professor</h1>
      </PageHeader>

      <BooksSection>
        <h3 style={{ color: '#1D3557' }}><Book size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} /> Livros Publicados</h3>
        <BookItem>
          <BookCover>Capa do Livro (Em breve)</BookCover>
          <div>
            <h4 style={{ color: '#E63946' }}>Ensaio sobre a Justiça Contemporânea</h4>
            <p style={{ color: '#1D3557' }}><strong>Editora:</strong> Dialética Editora</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              Uma obra focada em desmistificar a aplicação do direito na era moderna, com foco em jurisprudência atual.
            </p>
            <a href="#" style={{ display: 'inline-block', marginTop: '1rem', color: 'var(--color-primary-red)', fontWeight: 'bold' }}>
              Adquirir Livro
            </a>
          </div>
        </BookItem>
      </BooksSection>

      <h2 style={{ color: '#1D3557' }}>Materiais de Aula &amp; Artigos</h2>
      <div style={{ marginTop: '1rem' }}>
        <Feed posts={posts} loading={loading} error={error} />
      </div>
    </div>
  );
}
