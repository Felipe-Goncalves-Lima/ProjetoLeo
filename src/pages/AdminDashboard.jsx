import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchPosts, deletePost, updatePostStatus } from '../services/api';
import { Plus, Search, Edit2, Trash2, Loader, Eye, CheckCircle2, AlertCircle, FileText, ArrowLeft } from 'lucide-react';
import { DashboardContainer, HeaderRow, Title, CreateButton, SearchBar, SearchIconWrapper, SearchInput, TableWrapper, Table, Th, Td, CategoryBadge, Badge, ActionGroup, ActionButton, LoadingWrapper, PostTitleLink, EmptyState } from './styles/adminDashboardstyle';


export function AdminDashboard() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [feedback, setFeedback] = useState(null);

  async function loadPosts() {
    setLoading(true);
    try {
      const data = await fetchPosts({ limit: 100 });
      setPosts(data.data || []);
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Erro ao buscar publicações.' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleDelete(id, title) {
    if (!window.confirm(`Tem certeza de que deseja excluir a publicação "${title}"? Todos os comentários e anexos serão deletados permanentemente.`)) {
      return;
    }

    try {
      await deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      setFeedback({ type: 'success', message: 'Publicação excluída com sucesso.' });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Erro ao excluir publicação.' });
    }
  }

  async function handleToggleStatus(id, currentStatus) {
    const nextStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    try {
      await updatePostStatus(id, nextStatus);
      setPosts(prev => prev.map(p => p.id === id ? { ...p, status: nextStatus } : p));
      setFeedback({ type: 'success', message: `Status alterado para ${nextStatus === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}.` });
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Erro ao atualizar status.' });
    }
  }

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          (p.summary && p.summary.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter ? p.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardContainer>
      <HeaderRow>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <ActionButton onClick={() => navigate('/')} title="Voltar ao site">
            <ArrowLeft size={16} />
          </ActionButton>
          <Title>Painel Administrativo</Title>
        </div>
        <CreateButton to="/admin/posts/novo">
          <Plus size={18} /> Nova Publicação
        </CreateButton>
      </HeaderRow>

      {feedback && (
        <div style={{
          padding: '0.8rem 1rem',
          borderRadius: '6px',
          marginBottom: '1rem',
          fontSize: '0.9rem',
          background: feedback.type === 'error' ? '#fee2e2' : '#d1fae5',
          color: feedback.type === 'error' ? '#991b1b' : '#065f46',
          border: `1px solid ${feedback.type === 'error' ? '#fca5a5' : '#6ee7b7'}`
        }}>
          {feedback.message}
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <SearchBar style={{ flex: '1 1 300px', marginBottom: 0 }}>
          <SearchIconWrapper>
            <Search size={18} />
          </SearchIconWrapper>
          <SearchInput
            type="text"
            placeholder="Pesquisar publicação..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </SearchBar>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{
            padding: '0.6rem 1rem',
            borderRadius: '6px',
            border: '1px solid var(--color-border)',
            background: 'var(--color-bg-secondary)',
            color: 'var(--color-text-main)',
            fontWeight: '600'
          }}
        >
          <option value="">Todos os Status</option>
          <option value="PUBLISHED">Publicados</option>
          <option value="DRAFT">Rascunhos</option>
        </select>
      </div>

      {loading ? (
        <LoadingWrapper>
          <Loader size={32} style={{ animation: 'spin 1s linear infinite' }} />
          <p style={{ marginTop: '1rem' }}>Carregando publicações...</p>
        </LoadingWrapper>
      ) : filteredPosts.length > 0 ? (
        <TableWrapper>
          <Table>
            <thead>
              <tr>
                <Th>Título</Th>
                <Th>Categoria</Th>
                <Th>Status</Th>
                <Th>Data</Th>
                <Th style={{ textAlign: 'right' }}>Ações</Th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map(p => {
                const categorySlug = p.category?.slug || '';
                const categoryName = p.category?.name || '';
                const postUrl = `/${categorySlug}/${p.slug}`;

                return (
                  <tr key={p.id}>
                    <Td style={{ maxWidth: '300px' }}>
                      <PostTitleLink to={postUrl} target="_blank" title="Visualizar no site">
                        {p.title}
                      </PostTitleLink>
                    </Td>
                    <Td>
                      <CategoryBadge>{categoryName}</CategoryBadge>
                    </Td>
                    <Td>
                      <Badge 
                        type={p.status.toLowerCase()} 
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleToggleStatus(p.id, p.status)}
                        title="Clique para alternar status"
                      >
                        {p.status === 'PUBLISHED' ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        {p.status === 'PUBLISHED' ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </Td>
                    <Td style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                      {new Date(p.createdAt).toLocaleDateString('pt-BR')}
                    </Td>
                    <Td style={{ textAlign: 'right' }}>
                      <ActionGroup style={{ justifyContent: 'flex-end' }}>
                        <ActionButton 
                          onClick={() => window.open(postUrl, '_blank')} 
                          title="Visualizar no site"
                        >
                          <Eye size={15} />
                        </ActionButton>
                        <ActionButton 
                          onClick={() => navigate(`/admin/posts/editar/${p.slug}`)} 
                          title="Editar publicação"
                          color="var(--color-primary-blue)"
                        >
                          <Edit2 size={15} />
                        </ActionButton>
                        <ActionButton 
                          onClick={() => handleDelete(p.id, p.title)} 
                          title="Excluir publicação"
                          color="var(--color-primary-red)"
                          hoverBg="#fee2e2"
                        >
                          <Trash2 size={15} />
                        </ActionButton>
                      </ActionGroup>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TableWrapper>
      ) : (
        <EmptyState>
          <FileText size={32} style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
          <p>Nenhuma publicação encontrada.</p>
        </EmptyState>
      )}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </DashboardContainer>
  );
}
