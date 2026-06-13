import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchCategories, 
  fetchPostBySlug, 
  createPost, 
  updatePost, 
  uploadMedia,
  deleteMedia
} from '../services/api';
import { ArrowLeft, Save, Loader, Trash2, FileText, Paperclip, Video } from 'lucide-react';
import { FormContainer, Title, FeedbackMessage, FormGroup, Label, Input, Select, ActionButton, Button, SectionTitle, FormRow, TextArea, CheckboxRow, ButtonRow, MediaCardList, MediaCardItem, MediaThumbnail, MediaIconWrapper } from './styles/adminPostFormstyle';


export function AdminPostForm() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEdit = !!slug;

  const [categories, setCategories] = useState([]);
  const [flatCategories, setFlatCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  
  const [postId, setPostId] = useState(null);
  const [postMedia, setPostMedia] = useState([]);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [copiedMediaId, setCopiedMediaId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    status: 'DRAFT',
    categoryId: '',
    coverImage: '',
    allowComments: true,
  });

  useEffect(() => {
    async function init() {
      setLoading(true);
      try {
        const cats = await fetchCategories();
        setCategories(cats || []);
        
        const flattened = cats.reduce((acc, cat) => {
          acc.push(cat);
          if (cat.children && cat.children.length > 0) {
            cat.children.forEach(child => acc.push(child));
          }
          return acc;
        }, []);
        setFlatCategories(flattened);

        if (isEdit) {
          const post = await fetchPostBySlug(slug);
          setPostId(post.id);
          setPostMedia(post.media || []);

          setFormData({
            title: post.title || '',
            summary: post.summary || '',
            content: post.content || '',
            status: post.status || 'DRAFT',
            categoryId: post.categoryId || '',
            coverImage: post.coverImage || '',
            allowComments: post.allowComments !== false,
          });
        } else {
          if (flattened.length > 0) {
            setFormData(prev => ({ ...prev, categoryId: flattened[0].id }));
          }
        }
      } catch (err) {
        setFeedback({ type: 'error', message: err.message || 'Erro ao carregar dados da página.' });
      } finally {
        setLoading(false);
      }
    }

    init();
  }, [slug, isEdit]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title || !formData.summary || !formData.content) {
      setFeedback({ type: 'error', message: 'Preencha todos os campos obrigatórios (Título, Resumo e Conteúdo).' });
      window.scrollTo(0, 0);
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    const payload = {
      title: formData.title,
      summary: formData.summary,
      content: formData.content,
      status: formData.status,
      categoryId: formData.categoryId,
      coverImage: formData.coverImage || null,
      allowComments: formData.allowComments,
      mediaIds: postMedia.map(m => m.id),
    };

    try {
      if (isEdit) {
        await updatePost(postId, payload);
        setFeedback({ type: 'success', message: 'Publicação atualizada com sucesso!' });
      } else {
        const created = await createPost(payload);
        setFeedback({ type: 'success', message: 'Publicação criada com sucesso!' });
        setPostId(created.id);
        setTimeout(() => {
          navigate(`/admin/posts/editar/${created.slug}`, { replace: true });
        }, 1500);
      }
      window.scrollTo(0, 0);
    } catch (err) {
      let msg = err.message || 'Erro ao salvar publicação.';
      if (err.errors && Array.isArray(err.errors)) {
        msg = (
          <div>
            <strong>{err.message}</strong>
            <ul style={{ margin: '0.5rem 0 0 1.2rem', padding: 0, listStyleType: 'disc' }}>
              {err.errors.map((e, idx) => (
                <li key={idx}>{e.message}</li>
              ))}
            </ul>
          </div>
        );
      }
      setFeedback({ type: 'error', message: msg });
      window.scrollTo(0, 0);
    } finally {
      setSubmitting(false);
    }
  }



  async function handleMediaUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingMedia(true);
    try {
      const added = await uploadMedia(file, postId);
      setPostMedia(prev => [...prev, added]);
      const fileInput = document.getElementById('media-file-input');
      if (fileInput) fileInput.value = '';
    } catch (err) {
      alert(err.message || 'Erro ao carregar arquivo.');
    } finally {
      setUploadingMedia(false);
    }
  }

  async function handleMediaDelete(id) {
    if (!window.confirm('Deseja excluir este arquivo permanentemente?')) return;
    try {
      await deleteMedia(id);
      setPostMedia(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      alert(err.message || 'Erro ao excluir arquivo.');
    }
  }

  function handleCopyMediaUrl(id, url) {
    navigator.clipboard.writeText(url)
      .then(() => {
        setCopiedMediaId(id);
        setTimeout(() => setCopiedMediaId(null), 1500);
      })
      .catch(() => {
        alert('Erro ao copiar URL.');
      });
  }

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }

  if (loading) {
    return (
      <FormContainer style={{ textAlign: 'center', padding: '4rem 0' }}>
        <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '1rem' }}>Carregando dados...</p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
        <Button onClick={() => navigate('/admin')} title="Voltar ao Painel" style={{ padding: '0.4rem' }}>
          <ArrowLeft size={16} />
        </Button>
        <Title style={{ marginBottom: 0 }}>
          {isEdit ? 'Editar Publicação' : 'Nova Publicação'}
        </Title>
      </div>

      {feedback && (
        <FeedbackMessage type={feedback.type}>
          {feedback.message}
        </FeedbackMessage>
      )}

      <form onSubmit={handleSubmit}>
        <SectionTitle>
          <FileText size={18} /> Dados Principais
        </SectionTitle>

        <FormRow>
          <FormGroup>
            <Label htmlFor="title">Título *</Label>
            <Input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Digite o título da publicação..."
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="categoryId">Categoria *</Label>
            <Select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              {categories.map(cat => {
                const options = [];
                if (!cat.children || cat.children.length === 0) {
                  options.push(<option key={cat.id} value={cat.id}>{cat.name}</option>);
                } else {
                  options.push(
                    <optgroup key={cat.id} label={cat.name}>
                      {cat.children.map(child => (
                        <option key={child.id} value={child.id}>{child.name}</option>
                      ))}
                    </optgroup>
                  );
                }
                return options;
              })}
            </Select>
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="summary">Resumo / Subtítulo *</Label>
          <TextArea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Breve descrição da publicação para listagem..."
            height="60px"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="content">Conteúdo Principal *</Label>
          <TextArea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Conteúdo textual completo da publicação..."
            height="250px"
            required
          />
        </FormGroup>

        <FormRow>
          <FormGroup>
            <Label htmlFor="coverImage">URL da Imagem de Capa (Opcional)</Label>
            <Input
              type="text"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="DRAFT">Rascunho (Apenas Admin vê)</option>
              <option value="PUBLISHED">Publicado (Visível a todos)</option>
            </Select>
          </FormGroup>
        </FormRow>

        <CheckboxRow style={{ marginTop: '1rem' }}>
          <input
            type="checkbox"
            id="allowComments"
            name="allowComments"
            checked={formData.allowComments}
            onChange={handleChange}
          />
          <Label htmlFor="allowComments" style={{ cursor: 'pointer' }}>Permitir comentários nesta publicação</Label>
        </CheckboxRow>

        <div>
          <SectionTitle>
            <Paperclip size={18} /> Imagens e Arquivos PDF da Publicação
          </SectionTitle>

          <div style={{ background: 'var(--color-bg-secondary)', border: '1px dashed var(--color-border)', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
            <h4 style={{ marginBottom: '0.8rem', fontSize: '0.95rem' }}>Fazer Upload de Imagem ou PDF</h4>
            <FormRow>
              <FormGroup>
                <Label htmlFor="media-file-input">Selecionar Arquivo</Label>
                <Input
                  type="file"
                  id="media-file-input"
                  accept="image/*,application/pdf,video/*"
                  onChange={handleMediaUpload}
                  disabled={uploadingMedia}
                />
              </FormGroup>
            </FormRow>
            {uploadingMedia && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', color: 'var(--color-primary-blue)', fontSize: '0.85rem' }}>
                <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Enviando arquivo...</span>
              </div>
            )}
          </div>

          {postMedia.length > 0 ? (
            <MediaCardList>
              {postMedia.map(m => {
                const isImage = m.type === 'IMAGE';
                const isVideo = m.type === 'VIDEO';
                return (
                  <MediaCardItem key={m.id}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', minWidth: 0, flex: 1 }}>
                      {isImage ? (
                        <MediaThumbnail src={m.url} />
                      ) : isVideo ? (
                        <MediaIconWrapper style={{ color: 'var(--color-primary-blue)', backgroundColor: 'rgba(31, 59, 109, 0.08)' }}>
                          <Video size={20} />
                        </MediaIconWrapper>
                      ) : (
                        <MediaIconWrapper>
                          <FileText size={20} />
                        </MediaIconWrapper>
                      )}
                      <div style={{ minWidth: 0 }}>
                        <strong style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {m.originalName}
                        </strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {formatBytes(m.size)} | {new Date(m.createdAt).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                      <Button 
                        type="button" 
                        onClick={() => handleCopyMediaUrl(m.id, m.url)}
                        style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }}
                      >
                        {copiedMediaId === m.id ? 'Copiado!' : 'Copiar URL'}
                      </Button>
                      <ActionButton 
                        type="button" 
                        onClick={() => handleMediaDelete(m.id)}
                        bg="#fee2e2" 
                        color="var(--color-primary-red)"
                        border="#fca5a5"
                      >
                        <Trash2 size={14} />
                      </ActionButton>
                    </div>
                  </MediaCardItem>
                );
              })}
            </MediaCardList>
          ) : (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
              Nenhuma imagem ou PDF carregado para esta publicação.
            </p>
          )}
        </div>

        <ButtonRow>
          <Button 
            type="submit" 
            disabled={submitting} 
            bg="var(--color-primary-blue)" 
            color="white"
            border="var(--color-primary-blue)"
          >
            {submitting ? (
              <Loader size={18} style={{ animation: 'spin 1s linear infinite' }} />
            ) : (
              <Save size={18} />
            )}
            {submitting ? 'Salvando...' : 'Salvar Publicação'}
          </Button>
          <Button 
            type="button" 
            onClick={() => navigate('/admin')}
            disabled={submitting}
          >
            Cancelar
          </Button>
        </ButtonRow>
      </form>
    </FormContainer>
  );
}


