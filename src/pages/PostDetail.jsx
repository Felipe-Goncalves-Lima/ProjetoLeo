import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { fetchPostBySlug, likePost, unlikePost, postComment, deleteComment, updateComment, deletePost } from '../services/api';
import { ArrowLeft, MessageCircle, Share2, ThumbsUp, Send, Loader, LogIn, Edit2, Trash2, Check, X, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const PostContainer = styled.article`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  margin-top: 1rem;

  @media (max-width: 576px) {
    padding: 1.5rem 1rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  color: var(--color-text-muted);
  font-weight: 600;
  margin-bottom: 2rem;
  
  &:hover {
    color: var(--color-primary-blue);
  }
`;

const PostHeader = styled.header`
  margin-bottom: 2rem;
`;

const CategoryBadge = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--color-primary-red);
  margin-bottom: 1rem;
  display: inline-block;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  color: var(--color-text-main);
  margin-bottom: 1rem;

  @media (max-width: 576px) {
    font-size: 1.6rem;
  }
`;

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
`;

const Content = styled.div`
  line-height: 1.8;
  font-size: 1.1rem;
  color: var(--color-text-main);
  white-space: pre-wrap;
  margin-bottom: 3rem;
`;

const InteractionBar = styled.div`
  display: flex;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 0;
  margin-bottom: 2rem;
  gap: 1.5rem;
`;

const InteractionButton = styled.button.attrs({ type: 'button' })`
  background: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.$active ? 'var(--color-primary-blue)' : 'var(--color-text-muted)'};
  font-weight: 600;
  transition: color 0.2s;
  
  &:hover {
    color: var(--color-primary-blue);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const CommentsSection = styled.section`
  margin-top: 2rem;
`;

const Comment = styled.div`
  background: var(--color-bg-secondary);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;

  h4 {
    margin-bottom: 0.3rem;
    font-size: 0.95rem;
    color: var(--color-primary-blue);
  }

  p {
    font-size: 0.9rem;
    color: var(--color-text-main);
  }

  small {
    color: var(--color-text-muted);
    font-size: 0.8rem;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const CommentActions = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const ActionButton = styled.button.attrs({ type: 'button' })`
  background: none;
  border: none;
  padding: 0.2rem;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: color 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.color || 'var(--color-primary-blue)'};
  }
`;

const EditArea = styled.textarea`
  width: 100%;
  padding: 0.6rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg);
  color: var(--color-text-main);
  font-size: 0.9rem;
  min-height: 80px;
  resize: vertical;
  margin-bottom: 0.6rem;

  &:focus {
    outline: none;
    border-color: var(--color-primary-blue);
  }
`;


const CommentForm = styled.form`
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--color-border);
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text-main);
`;

const Input = styled.input`
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg);
  color: var(--color-text-main);
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: var(--color-primary-blue);
  }
`;

const TextArea = styled.textarea`
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg);
  color: var(--color-text-main);
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--color-primary-blue);
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-primary-blue);
  color: white;
  padding: 0.6rem 1.4rem;
  border-radius: 6px;
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const AlertBox = styled.div`
  padding: 0.8rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  background: ${props => props.type === 'error' ? '#fee2e2' : '#d1fae5'};
  color: ${props => props.type === 'error' ? '#991b1b' : '#065f46'};
  border: 1px solid ${props => props.type === 'error' ? '#fca5a5' : '#6ee7b7'};
`;

const LoginBanner = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  background: var(--color-bg-secondary);
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  h4 {
    font-size: 1.1rem;
    color: var(--color-text-main);
  }

  p {
    font-size: 0.9rem;
    color: var(--color-text-muted);
    max-width: 400px;
    line-height: 1.5;
  }
`;

const LoginButtonLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-primary-blue);
  color: white !important;
  padding: 0.6rem 1.4rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: opacity 0.2s, transform 0.1s;
  text-decoration: none;

  &:hover {
    opacity: 0.9;
    text-decoration: none;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: var(--color-text-muted);
`;

export function PostDetail() {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likingLoading, setLikingLoading] = useState(false);

  const [commentForm, setCommentForm] = useState({ authorName: '', authorEmail: '', content: '' });
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentFeedback, setCommentFeedback] = useState(null);
  const [localComments, setLocalComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editSubmitting, setEditSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLiked(false);

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPostBySlug(slug);
        if (!cancelled) {
          setPost(data);
          setLikes(data.likes || 0);
          setLocalComments(data.comments || []);
          try {
            const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
            if (likedPosts.includes(data.id)) {
              setLiked(true);
            }
          } catch {}
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Publicação não encontrada.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [slug]);

  async function handleLike() {
    if (likingLoading) return;
    setLikingLoading(true);
    try {
      if (liked) {
        const updated = await unlikePost(post.id);
        setLikes(updated.likes);
        setLiked(false);
        try {
          const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
          const updatedLikedPosts = likedPosts.filter(id => id !== post.id);
          localStorage.setItem('liked_posts', JSON.stringify(updatedLikedPosts));
        } catch {}
      } else {
        const updated = await likePost(post.id);
        setLikes(updated.likes);
        setLiked(true);
        try {
          const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
          if (!likedPosts.includes(post.id)) {
            likedPosts.push(post.id);
            localStorage.setItem('liked_posts', JSON.stringify(likedPosts));
          }
        } catch {}
      }
    } catch {
    } finally {
      setLikingLoading(false);
    }
  }

  function handleCommentChange(e) {
    setCommentForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();
    
    if (isAuthenticated) {
      if (!commentForm.content.trim()) {
        setCommentFeedback({ type: 'error', message: 'Preencha o campo do comentário.' });
        return;
      }
    } else {
      if (!commentForm.authorName || !commentForm.authorEmail || !commentForm.content.trim()) {
        setCommentFeedback({ type: 'error', message: 'Preencha todos os campos.' });
        return;
      }
    }

    setCommentSubmitting(true);
    setCommentFeedback(null);

    const payload = isAuthenticated
      ? { content: commentForm.content }
      : { authorName: commentForm.authorName, authorEmail: commentForm.authorEmail, content: commentForm.content };

    try {
      await postComment(post.id, payload);
      setCommentFeedback({
        type: 'success',
        message: 'Comentário enviado! Ele ficará visível após aprovação.',
      });
      setCommentForm({ authorName: '', authorEmail: '', content: '' });
    } catch (err) {
      setCommentFeedback({ type: 'error', message: err.message || 'Erro ao enviar comentário.' });
    } finally {
      setCommentSubmitting(false);
    }
  }

  async function handleDeleteComment(commentId) {
    
    try {
      await deleteComment(commentId);
      setLocalComments(prev => prev.filter(c => c.id !== commentId));
      setCommentFeedback({ type: 'success', message: 'Comentário excluído com sucesso.' });
    } catch (err) {
      setCommentFeedback({ type: 'error', message: err.message || 'Erro ao excluir comentário.' });
    }
  }
  async function handleUpdateComment(commentId) {
    if (!editContent.trim()) {
      alert('O comentário não pode ser vazio.');
      return;
    }
    
    setEditSubmitting(true);
    try {
      const updated = await updateComment(commentId, editContent);
      
      const isAdmin = user?.role === 'ADMIN';
      if (isAdmin) {
        setLocalComments(prev => prev.map(c => c.id === commentId ? { ...c, content: updated.content } : c));
        setCommentFeedback({ type: 'success', message: 'Comentário atualizado com sucesso.' });
      } else {
        setLocalComments(prev => prev.filter(c => c.id !== commentId));
        setCommentFeedback({ type: 'success', message: 'Comentário atualizado! Ele passará por moderação.' });
      }
      
      setEditingCommentId(null);
      setEditContent('');
    } catch (err) {
      alert(err.message || 'Erro ao editar comentário.');
    } finally {
      setEditSubmitting(false);
    }
  }

  function startEditing(comment) {
    setEditingCommentId(comment.id);
    setEditContent(comment.content || comment.text);
  }

  if (loading) {
    return (
      <LoadingState>
        <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '1rem' }}>Carregando publicação...</p>
      </LoadingState>
    );
  }

  if (error || !post) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h2>Publicação não encontrada</h2>
        <p style={{ marginTop: '0.5rem', color: 'var(--color-text-muted)' }}>
          {error || 'A URL pode estar incorreta ou a postagem foi removida.'}
        </p>
        <Link to="/" style={{ display: 'inline-block', marginTop: '1.5rem', color: 'var(--color-primary-red)', fontWeight: '600' }}>
          Voltar ao Início
        </Link>
      </div>
    );
  }

  const categoryName = post.category?.name || post.category?.slug || category;

  const images = post.media?.filter(m => m.type === 'IMAGE') || [];
  const pdfs = post.media?.filter(m => m.type === 'PDF') || [];

  return (
    <div>
      <Helmet>
        <title>{post.title} | Sensibilidade e Razão</title>
        <meta name="description" content={(post.summary || post.content || '').substring(0, 155) + '...'} />
      </Helmet>

      <BackButton onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Voltar
      </BackButton>

      <PostContainer>
        <PostHeader>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <CategoryBadge>{categoryName}</CategoryBadge>
            {isAuthenticated && user?.role === 'ADMIN' && (
              <div style={{ display: 'flex', gap: '0.8rem' }}>
                <Link 
                  to={`/admin/posts/editar/${post.slug}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    color: 'var(--color-primary-blue)',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    textDecoration: 'none'
                  }}
                  title="Editar publicação"
                >
                  <Edit2 size={16} /> Editar
                </Link>
                <button 
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (window.confirm(`Tem certeza de que deseja excluir a publicação "${post.title}"?`)) {
                      try {
                        await deletePost(post.id);
                        alert('Publicação excluída com sucesso.');
                        navigate('/admin');
                      } catch (err) {
                        alert(err.message || 'Erro ao excluir publicação.');
                      }
                    }
                  }} 
                  style={{
                    background: 'none',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    color: 'var(--color-primary-red)',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                  }}
                  title="Excluir publicação"
                >
                  <Trash2 size={16} /> Excluir
                </button>
              </div>
            )}
          </div>
          <Title style={{ marginTop: '0.5rem' }}>{post.title}</Title>
          <Meta>
            <span>Por {post.author?.name || 'Leonardo Caffaro'}</span>
            <span>•</span>
            <span>{new Date(post.createdAt || post.date).toLocaleDateString('pt-BR')}</span>
          </Meta>
        </PostHeader>

        {post.soundcloudUrl && (
          <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center' }}>
            [Embed do SoundCloud para {post.soundcloudUrl}]
          </div>
        )}

        <Content>{post.content}</Content>

        {images.map(img => (
          <div key={img.id} style={{ marginBottom: '2rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--color-border)', textAlign: 'center', background: 'var(--color-bg-secondary)' }}>
            <img src={img.url} alt={img.originalName} style={{ display: 'block', margin: '0 auto', maxHeight: '600px', maxWidth: '100%', objectFit: 'contain' }} />
          </div>
        ))}

        {pdfs.length > 0 && (
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--color-bg-secondary)', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary-blue)', borderBottom: 'none', paddingBottom: 0 }}>
              <FileText size={18} /> Documentos Anexos (PDF)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {pdfs.map(pdf => (
                <a
                  key={pdf.id}
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.8rem 1rem',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: 'var(--color-text-main)',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-primary-blue)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--color-border)'}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <FileText size={16} style={{ color: 'var(--color-primary-red)', flexShrink: 0 }} />
                    {pdf.originalName}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', flexShrink: 0 }}>
                    Visualizar PDF
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}

        <InteractionBar>
          <InteractionButton
            onClick={handleLike}
            disabled={likingLoading}
            $active={liked}
            title={liked ? 'Remover curtida' : 'Curtir publicação'}
          >
            <ThumbsUp size={18} /> {likes}
          </InteractionButton>
          <InteractionButton>
            <MessageCircle size={18} /> {localComments.length}
          </InteractionButton>
          <InteractionButton onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Link copiado!'))}>
            <Share2 size={18} /> Compartilhar URL
          </InteractionButton>
        </InteractionBar>

        <CommentsSection>
          <h3>Comentários ({localComments.length})</h3>
          <div style={{ marginTop: '1.5rem' }}>
            {localComments.length > 0 ? (
              localComments.map(c => {
                const isEditing = editingCommentId === c.id;
                const canManage = isAuthenticated && (user?.role === 'ADMIN' || user?.email === c.authorEmail);

                return (
                  <Comment key={c.id}>
                    <CommentHeader>
                      <div>
                        <h4>{c.authorName || c.author}</h4>
                        <small>{c.createdAt ? new Date(c.createdAt).toLocaleDateString('pt-BR') : ''}</small>
                      </div>
                      
                      {canManage && !isEditing && (
                        <CommentActions>
                          <ActionButton 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              startEditing(c);
                            }} 
                            title="Editar comentário"
                            color="var(--color-primary-blue)"
                          >
                            <Edit2 size={15} />
                          </ActionButton>
                          <ActionButton 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleDeleteComment(c.id);
                            }} 
                            title="Excluir comentário"
                            color="var(--color-primary-red)"
                          >
                            <Trash2 size={15} />
                          </ActionButton>
                        </CommentActions>
                      )}
                    </CommentHeader>

                    {isEditing ? (
                      <div>
                        <EditArea
                          value={editContent}
                          onChange={e => setEditContent(e.target.value)}
                          disabled={editSubmitting}
                          placeholder="Edite seu comentário..."
                        />
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <ActionButton 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleUpdateComment(c.id);
                            }} 
                            disabled={editSubmitting}
                            color="#10b981"
                            style={{ background: '#d1fae5', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}
                          >
                            <Check size={14} style={{ marginRight: '0.2rem' }} /> Salvar
                          </ActionButton>
                          <ActionButton 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setEditingCommentId(null);
                            }} 
                            disabled={editSubmitting}
                            color="#6b7280"
                            style={{ background: '#f3f4f6', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '600' }}
                          >
                            <X size={14} style={{ marginRight: '0.2rem' }} /> Cancelar
                          </ActionButton>
                        </div>
                      </div>
                    ) : (
                      <p style={{ marginTop: '0.4rem', whiteSpace: 'pre-wrap' }}>{c.content || c.text}</p>
                    )}
                  </Comment>
                );
              })
            ) : (
              <p style={{ color: 'var(--color-text-muted)' }}>Nenhum comentário ainda. Seja o primeiro!</p>
            )}
          </div>

          {post.allowComments !== false && (
            isAuthenticated ? (
              <CommentForm onSubmit={handleCommentSubmit}>
                <h4 style={{ marginBottom: '0.2rem', color: 'var(--color-text-main)' }}>Deixe seu comentário</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.2rem' }}>
                  Comentando como <strong>{user?.name}</strong> ({user?.email})
                </p>

                {commentFeedback && (
                  <AlertBox type={commentFeedback.type}>
                    {commentFeedback.message}
                  </AlertBox>
                )}

                <FormGroup>
                  <Label htmlFor="content">Comentário</Label>
                  <TextArea
                    id="content"
                    name="content"
                    placeholder="Escreva seu comentário..."
                    value={commentForm.content}
                    onChange={handleCommentChange}
                  />
                </FormGroup>

                <SubmitButton type="submit" disabled={commentSubmitting}>
                  {commentSubmitting ? (
                    <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <Send size={16} />
                  )}
                  {commentSubmitting ? 'Enviando...' : 'Enviar Comentário'}
                </SubmitButton>
              </CommentForm>
            ) : (
              <LoginBanner>
                <h4>Quer participar da conversa?</h4>
                <p>Faça login no portal para enviar um comentário de forma rápida e segura.</p>
                <LoginButtonLink to="/login" state={{ from: location }}>
                  <LogIn size={16} /> Fazer Login
                </LoginButtonLink>
              </LoginBanner>
            )
          )}
        </CommentsSection>

      </PostContainer>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
