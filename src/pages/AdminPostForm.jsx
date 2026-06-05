import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  fetchCategories, 
  fetchPostBySlug, 
  createPost, 
  updatePost, 
  uploadAttachment, 
  deleteAttachment 
} from '../services/api';
import { ArrowLeft, Save, Loader, Paperclip, Trash2, Plus, FileText, Music, BookOpen, Scale } from 'lucide-react';
import { FormContainer, Title, FeedbackMessage, FormGroup, Label, Input, Select, ActionButton, Button, SectionTitle, FormRow, TextArea, CheckboxRow, ButtonRow } from './styles/adminPostFormstyle';


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
  const [attachments, setAttachments] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    status: 'DRAFT',
    categoryId: '',
    subtype: '',
    coverImage: '',
    allowComments: true,

    journal: '',
    coauthors: '',
    citationLink: '',

    subject: '',
    semester: '',
    institution: '',
    hasEvaluation: false,

    soundcloudUrl: '',
    lyrics: '',
    duration: '',
  });
  const [newAttachment, setNewAttachment] = useState({
    file: null,
    title: '',
    type: 'MATERIAL',
    description: ''
  });
  const [uploadingAttachment, setUploadingAttachment] = useState(false);

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
          setAttachments(post.attachments || []);

          setFormData({
            title: post.title || '',
            summary: post.summary || '',
            content: post.content || '',
            status: post.status || 'DRAFT',
            categoryId: post.categoryId || '',
            subtype: post.subtype || '',
            coverImage: post.coverImage || '',
            allowComments: post.allowComments !== false,

            journal: post.article?.journal || '',
            coauthors: post.article?.coauthors || '',
            citationLink: post.article?.citationLink || '',

            subject: post.professorMaterial?.subject || '',
            semester: post.professorMaterial?.semester || '',
            institution: post.professorMaterial?.institution || '',
            hasEvaluation: post.professorMaterial?.hasEvaluation || false,

            soundcloudUrl: post.soundcloudUrl || post.music?.soundcloudUrl || '',
            lyrics: post.lyrics || post.music?.lyrics || '',
            duration: post.music?.duration || '',
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

  const selectedCategory = flatCategories.find(c => c.id === formData.categoryId);
  const selectedType = selectedCategory ? selectedCategory.type : '';
  const isMusic = selectedCategory && selectedCategory.slug.includes('musica');

  useEffect(() => {
    if (selectedCategory) {
      if (selectedCategory.slug === 'poesia-popular' || selectedCategory.slug === 'poesia-religiosa') {
        setFormData(prev => ({ ...prev, subtype: selectedCategory.name }));
      } else if (selectedCategory.slug === 'musica-popular' || selectedCategory.slug === 'musica-religiosa') {
        setFormData(prev => ({ ...prev, subtype: selectedCategory.name }));
      }
    }
  }, [formData.categoryId, selectedCategory]);

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
      subtype: formData.subtype || null,
      coverImage: formData.coverImage || null,
      allowComments: formData.allowComments,
    };

    if (selectedType === 'ADVOGADO') {
      payload.article = {
        journal: formData.journal || null,
        coauthors: formData.coauthors || null,
        citationLink: formData.citationLink || null,
      };
    } else if (selectedType === 'PROFESSOR') {
      payload.professorMaterial = {
        subject: formData.subject || null,
        semester: formData.semester || null,
        institution: formData.institution || null,
        hasEvaluation: formData.hasEvaluation,
      };
    } else if (selectedType === 'POETA') {
      payload.subtype = formData.subtype;
      if (isMusic) {
        payload.music = {
          soundcloudUrl: formData.soundcloudUrl || null,
          lyrics: formData.lyrics || null,
          duration: formData.duration || null,
        };
        payload.soundcloudUrl = formData.soundcloudUrl || null;
        payload.lyrics = formData.lyrics || null;
      }
    }

    try {
      if (isEdit) {
        await updatePost(postId, payload);
        setFeedback({ type: 'success', message: 'Publicação atualizada com sucesso!' });
      } else {
        const created = await createPost(payload);
        setFeedback({ type: 'success', message: 'Publicação criada com sucesso!' });
        
        if (selectedType === 'PROFESSOR') {
          setPostId(created.id);
          navigate(`/admin/posts/editar/${created.slug}`, { replace: true });
        } else {
          setTimeout(() => navigate('/admin'), 1500);
        }
      }
      window.scrollTo(0, 0);
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Erro ao salvar publicação.' });
      window.scrollTo(0, 0);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleAddAttachment(e) {
    e.preventDefault();
    if (!newAttachment.file || !newAttachment.title) {
      alert('Selecione um arquivo PDF e defina um título para o anexo.');
      return;
    }

    setUploadingAttachment(true);
    try {
      const added = await uploadAttachment(
        newAttachment.file,
        postId,
        newAttachment.title,
        newAttachment.type,
        newAttachment.description
      );
      setAttachments(prev => [...prev, added]);
      setNewAttachment({ file: null, title: '', type: 'MATERIAL', description: '' });
      const fileInput = document.getElementById('attachment-file');
      if (fileInput) fileInput.value = '';
      alert('Anexo carregado com sucesso!');
    } catch (err) {
      alert(err.message || 'Erro ao carregar anexo.');
    } finally {
      setUploadingAttachment(false);
    }
  }

  async function handleDeleteAttachment(id) {
    if (!window.confirm('Deseja excluir este anexo permanentemente?')) return;
    try {
      await deleteAttachment(id);
      setAttachments(prev => prev.filter(att => att.id !== id));
    } catch (err) {
      alert(err.message || 'Erro ao excluir anexo.');
    }
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


        {selectedType === 'ADVOGADO' && (
          <div>
            <SectionTitle>
              <Scale size={18} /> Detalhes de Artigo Jurídico (Advogado)
            </SectionTitle>
            <FormRow>
              <FormGroup>
                <Label htmlFor="journal">Periódico / Revista (Opcional)</Label>
                <Input
                  type="text"
                  id="journal"
                  name="journal"
                  value={formData.journal}
                  onChange={handleChange}
                  placeholder="Ex: Consultor Jurídico (ConJur)"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="coauthors">Coautores (Opcional)</Label>
                <Input
                  type="text"
                  id="coauthors"
                  name="coauthors"
                  value={formData.coauthors}
                  onChange={handleChange}
                  placeholder="Ex: Dra. Patrícia Silva, Dr. Felipe G."
                />
              </FormGroup>
            </FormRow>
            <FormGroup>
              <Label htmlFor="citationLink">Link de Citação / Link Externo (Opcional)</Label>
              <Input
                type="text"
                id="citationLink"
                name="citationLink"
                value={formData.citationLink}
                onChange={handleChange}
                placeholder="https://exemplo.com/artigo-completo"
              />
            </FormGroup>
          </div>
        )}

        {selectedType === 'PROFESSOR' && (
          <div>
            <SectionTitle>
              <BookOpen size={18} /> Detalhes Pedagógicos (Professor)
            </SectionTitle>
            <FormRow>
              <FormGroup>
                <Label htmlFor="subject">Disciplina / Matéria</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Ex: Direito Constitucional II"
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="semester">Semestre Letivo</Label>
                <Input
                  type="text"
                  id="semester"
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                  placeholder="Ex: 2026.1"
                />
              </FormGroup>
            </FormRow>
            <FormRow>
              <FormGroup>
                <Label htmlFor="institution">Instituição de Ensino</Label>
                <Input
                  type="text"
                  id="institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Ex: Universidade Federal"
                />
              </FormGroup>
              <CheckboxRow style={{ alignSelf: 'center', marginTop: '1.2rem' }}>
                <input
                  type="checkbox"
                  id="hasEvaluation"
                  name="hasEvaluation"
                  checked={formData.hasEvaluation}
                  onChange={handleChange}
                />
                <Label htmlFor="hasEvaluation" style={{ cursor: 'pointer' }}>Este material representa uma Avaliação / Prova</Label>
              </CheckboxRow>
            </FormRow>

            {isEdit && postId ? (
              <div style={{ marginTop: '2rem' }}>
                <SectionTitle>
                  <Paperclip size={18} /> Anexos Didáticos (Arquivos PDF)
                </SectionTitle>

                {attachments.length > 0 ? (
                  attachments.map(att => (
                    <AttachmentCard key={att.id}>
                      <div>
                        <strong>{att.title}</strong>{' '}
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-primary-blue)', background: 'var(--color-bg)', padding: '0.1rem 0.4rem', borderRadius: '4px', marginLeft: '0.5rem' }}>
                          {att.type}
                        </span>
                        {att.description && <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{att.description}</p>}
                      </div>
                      <ActionButton 
                        type="button" 
                        onClick={() => handleDeleteAttachment(att.id)}
                        bg="#fee2e2" 
                        color="var(--color-primary-red)"
                        border="#fca5a5"
                      >
                        <Trash2 size={14} />
                      </ActionButton>
                    </AttachmentCard>
                  ))
                ) : (
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Nenhum arquivo PDF anexado a esta publicação ainda.
                  </p>
                )}

                <div style={{ background: 'var(--color-bg-secondary)', border: '1px dashed var(--color-border)', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>
                  <h4 style={{ marginBottom: '0.8rem', fontSize: '0.95rem' }}>Anexar Novo Arquivo PDF</h4>
                  <FormRow>
                    <FormGroup>
                      <Label htmlFor="attachment-title">Título do Anexo *</Label>
                      <Input
                        type="text"
                        id="attachment-title"
                        value={newAttachment.title}
                        onChange={e => setNewAttachment(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Ex: Slides - Aula 05"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="attachment-type">Tipo de Material</Label>
                      <Select
                        id="attachment-type"
                        value={newAttachment.type}
                        onChange={e => setNewAttachment(prev => ({ ...prev, type: e.target.value }))}
                      >
                        <option value="MATERIAL">Material Didático</option>
                        <option value="PROVA">Prova / Avaliação</option>
                        <option value="LIVRO">Livro</option>
                        <option value="ARTIGO">Artigo Acadêmico</option>
                        <option value="RESUMO">Resumo de Estudos</option>
                      </Select>
                    </FormGroup>
                  </FormRow>

                  <FormGroup>
                    <Label htmlFor="attachment-desc">Descrição Breve (Opcional)</Label>
                    <Input
                      type="text"
                      id="attachment-desc"
                      value={newAttachment.description}
                      onChange={e => setNewAttachment(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Ex: Slides apresentados em sala sobre Obrigações."
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="attachment-file">Arquivo PDF *</Label>
                    <Input
                      type="file"
                      id="attachment-file"
                      accept=".pdf"
                      onChange={e => setNewAttachment(prev => ({ ...prev, file: e.target.files[0] }))}
                    />
                  </FormGroup>

                  <Button 
                    type="button" 
                    onClick={handleAddAttachment}
                    disabled={uploadingAttachment}
                    bg="var(--color-primary-blue)"
                    color="white"
                    style={{ marginTop: '0.5rem' }}
                  >
                    {uploadingAttachment ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Plus size={16} />}
                    {uploadingAttachment ? 'Carregando Arquivo...' : 'Anexar PDF'}
                  </Button>
                </div>
              </div>
            ) : (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '1rem', fontStyle: 'italic' }}>
                * Salve a publicação inicialmente para poder realizar o upload de anexos PDF.
              </p>
            )}
          </div>
        )}

        {selectedType === 'POETA' && (
          <div>
            <SectionTitle>
              <Music size={18} /> Informações de Composições / Literatura (Poeta)
            </SectionTitle>
            <FormRow>
              <FormGroup>
                <Label htmlFor="subtype">Subcategoria / Gênero</Label>
                <Input
                  type="text"
                  id="subtype"
                  name="subtype"
                  value={formData.subtype}
                  onChange={handleChange}
                  placeholder="Ex: Poesia Popular, Poesia Religiosa, Música Popular..."
                />
              </FormGroup>

              {isMusic && (
                <FormGroup>
                  <Label htmlFor="duration">Duração da Faixa (Opcional)</Label>
                  <Input
                    type="text"
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Ex: 3:45"
                  />
                </FormGroup>
              )}
            </FormRow>

            {isMusic && (
              <FormGroup>
                <Label htmlFor="soundcloudUrl">Iframe ou Link do SoundCloud (Opcional)</Label>
                <Input
                  type="text"
                  id="soundcloudUrl"
                  name="soundcloudUrl"
                  value={formData.soundcloudUrl}
                  onChange={handleChange}
                  placeholder="https://soundcloud.com/username/melodia"
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="lyrics">
                {isMusic ? 'Letra da Música (Opcional)' : 'Poema / Versos Completos'}
              </Label>
              <TextArea
                id="lyrics"
                name="lyrics"
                value={formData.lyrics}
                onChange={handleChange}
                placeholder="Insira os versos ou a letra cantada aqui..."
                height="150px"
              />
            </FormGroup>
          </div>
        )}

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


