import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Feed } from '../components/Feed';
import { usePosts } from '../hooks/usePosts';
import { BookOpen, Book, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  PageHeader, 
  BooksSection, 
  BookItem, 
  BookCoverPlaceholder, 
  BookCoverImage,
  CarouselContainer,
  CarouselTrack,
  CarouselSlide,
  CarouselControls,
  CarouselButton,
  CarouselDots,
  CarouselDot
} from './styles/professorStyle.jsx';
import capaLivro1 from '../assets/capaLivro1.png'
import capaLivro2 from '../assets/capaLivro2.png'

const initialBooks = [
  { 
    id: 1,
    title: 'Temas Emergentes em Ciências Sociais Aplicadas.',
    publisher: 'Dialética Editora',
    description: 'Uma Abordagem Multidisciplinar.',
    coverImage: capaLivro1,
    buyLink: '#',
    pdfUrl: '/9786528800056_NUVEM_260331_181312.pdf',
  },
  {
    id: 2,
    title: 'O Pós-Positivismo Como Expressão Do Direito Ético.',
    publisher: 'All Print Editora',
    description: 'O Direito Como Experiência (Historicidade Da Positivação) E Legítimas Expectativas De Normatividade (Comunicação Normativa).',
    coverImage: capaLivro2,
    buyLink: '#',
    pdfUrl: '/9786525474507_NUVEM_260307_161331.pdf',
  },
  {
    id: 3,
    title: 'A Função Constitucional E Democrática Da Advogacia Pública E Sua Essencialidade Ético-Jurídica',
    publisher: 'Migalhas',
    description: 'Uma Breve Síntese.',
    coverImage: '',
    buyLink: '#',
    pdfUrl: 'https://www.migalhas.com.br/depeso/430103/a-funcao-constitucional-e-democratica-da-advocacia-publica',
  }
];

export function Professor() {
  const navigate = useNavigate();
  const { posts, loading, error } = usePosts({ categorySlug: 'professor' });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? initialBooks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === initialBooks.length - 1 ? 0 : prev + 1));
  };

  const translateValue = -currentIndex * 100;

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
        <h3 style={{ color: '#1D3557' }}>
          <Book size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '0.5rem' }} /> 
          Livros e Artigos Publicados
        </h3>
        
        <CarouselContainer>
          <CarouselTrack $translate={translateValue}>
            {initialBooks.map(book => (
              <CarouselSlide key={book.id}>
                <BookItem>
                  {book.coverImage ? (
                    <BookCoverImage src={book.coverImage} alt={book.title} />
                  ) : (
                    <BookCoverPlaceholder>
                      <BookOpen size={24} style={{ marginBottom: '0.5rem' }} />
                      <span style={{ fontSize: '0.7rem' }}>Capa em Breve</span>
                    </BookCoverPlaceholder>
                  )}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    <h4 style={{ color: '#E63946', fontSize: '1.15rem', margin: 0 }}>{book.title}</h4>
                    <p style={{ color: '#1D3557', margin: 0, fontSize: '0.9rem' }}><strong>Editora:</strong> {book.publisher}</p>
                    <p style={{ marginTop: '0.4rem', fontSize: '0.85rem', lineHeight: '1.4', color: 'var(--color-text-main)' }}>
                      {book.description}
                    </p>
                    <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '0.6rem', alignItems: 'center' }}>
                      <button 
                        onClick={() => {
                          const subject = `Interesse no livro: ${book.title}`;
                          const message = `Olá, tenho interesse em adquirir o livro "${book.title}" (${book.publisher}). Gostaria de saber mais informações sobre disponibilidade e valor.`;
                          navigate(`/contato?subject=${encodeURIComponent(subject)}&message=${encodeURIComponent(message)}`);
                        }}
                        style={{ 
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'var(--color-primary-blue)', 
                          color: 'white', 
                          padding: '0.4rem 0.8rem', 
                          borderRadius: '4px', 
                          fontSize: '0.8rem', 
                          fontWeight: '600', 
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Adquirir Livro
                      </button>
                      {book.pdfUrl ? (
                        <a 
                          href={book.pdfUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--color-primary-red)', 
                            color: 'var(--color-primary-red)', 
                            padding: '0.4rem 0.8rem', 
                            borderRadius: '4px', 
                            fontSize: '0.8rem', 
                            fontWeight: '600', 
                            textDecoration: 'none'
                          }}
                        >
                          Visualizar PDF
                        </a>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                          [PDF pendente - adicione o arquivo em `initialBooks` no Professor.jsx]
                        </span>
                      )}
                    </div>
                  </div>
                </BookItem>
              </CarouselSlide>
            ))}
          </CarouselTrack>

          <CarouselControls>
            <CarouselButton onClick={handlePrev} disabled={initialBooks.length <= 1}>
              <ChevronLeft size={16} />
            </CarouselButton>
            
            <CarouselDots>
              {initialBooks.map((_, index) => (
                <CarouselDot 
                  key={index} 
                  $active={index === currentIndex} 
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </CarouselDots>

            <CarouselButton onClick={handleNext} disabled={initialBooks.length <= 1}>
              <ChevronRight size={16} />
            </CarouselButton>
          </CarouselControls>
        </CarouselContainer>
      </BooksSection>

      <h2 style={{ color: '#1D3557' }}>Materiais de Aula &amp; Artigos</h2>
      <div style={{ marginTop: '1rem' }}>
        <Feed posts={posts} loading={loading} error={error} />
      </div>
    </div>
  );
}
