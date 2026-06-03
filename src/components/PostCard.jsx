import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, ThumbsUp, Share2, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { deletePost } from '../services/api';
import {
  Card,
  PostHeader,
  AuthorInfo,
  AuthorName,
  PostDate,
  CategoryBadge,
  PostTitle,
  PostPreview,
  InteractionBar,
  InteractionButton
} from './style/postcardstyle';

export function PostCard({ post }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes ?? 0);

  const categorySlug = typeof post.category === 'object' ? post.category?.slug : post.category;
  const categoryName = typeof post.category === 'object' ? post.category?.name : post.category;
  const authorName = typeof post.author === 'object' ? post.author?.name : (post.author || 'Leonardo Caffaro');
  const postDate = post.createdAt || post.date;
  const commentsCount = post._count?.comments ?? post.comments?.length ?? 0;
  const postUrl = `/${categorySlug}/${post.slug}`;

  return (
    <Card>
      <PostHeader onClick={() => navigate(postUrl)} style={{ cursor: 'pointer' }}>
        <AuthorInfo>
          <AuthorName style={{ color: '#333C9B' }}>{authorName}</AuthorName>
          <PostDate>{postDate ? new Date(postDate).toLocaleDateString('pt-BR') : ''}</PostDate>
        </AuthorInfo>
        <CategoryBadge style={{ color: '#333C9B' }}>{categoryName}</CategoryBadge>
      </PostHeader>

      <PostTitle>
        <Link to={postUrl} style={{ color: '#E63946' }}>{post.title}</Link>
      </PostTitle>

      <PostPreview>
        {post.summary || post.content}
      </PostPreview>

      <InteractionBar>
        <InteractionButton
          onClick={() => {
            setLiked(!liked);
            setLikesCount(prev => liked ? prev - 1 : prev + 1);
          }}
          style={{ color: liked ? '#E63946' : 'var(--color-text-muted)' }}
        >
          <ThumbsUp size={18} />
          {likesCount}
        </InteractionButton>

        <InteractionButton>
          <MessageCircle size={18} />
          {commentsCount}
        </InteractionButton>

        <InteractionButton
          onClick={() =>
            navigator.clipboard
              .writeText(window.location.origin + postUrl)
              .then(() => alert('Link copiado!'))
          }
        >
          <Share2 size={18} />
          Compartilhar
        </InteractionButton>

        {isAuthenticated && user?.role === 'ADMIN' && (
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/admin/posts/editar/${post.slug}`);
              }}
              style={{
                background: 'none',
                color: 'var(--color-primary-blue)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
              title="Editar publicação"
            >
              <Edit2 size={14} /> Editar
            </button>

            <button
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.confirm(`Tem certeza de que deseja excluir a publicação "${post.title}"?`)) {
                  try {
                    await deletePost(post.id);
                    alert('Publicação excluída com sucesso.');
                    window.location.reload();
                  } catch (err) {
                    alert(err.message || 'Erro ao excluir publicação.');
                  }
                }
              }}
              style={{
                background: 'none',
                color: 'var(--color-primary-red)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}
              title="Excluir publicação"
            >
              <Trash2 size={14} /> Excluir
            </button>
          </div>
        )}
      </InteractionBar>
    </Card>
  );
}