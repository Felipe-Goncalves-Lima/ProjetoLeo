import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { MessageCircle, ThumbsUp, Share2, Edit2, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { deletePost, likePost, unlikePost } from '../services/api';
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
import ShareButton from './sharebutton';


export function PostCard({ post }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(() => {
    try {
      const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
      return likedPosts.includes(post.id);
    } catch {
      return false;
    }
  });
  const [likesCount, setLikesCount] = useState(post.likes ?? 0);
  const [likingLoading, setLikingLoading] = useState(false);

  const categorySlug = typeof post.category === 'object' ? post.category?.slug : post.category;
  const categoryName = typeof post.category === 'object' ? post.category?.name : post.category;
  const authorName = typeof post.author === 'object' ? post.author?.name : (post.author || 'Leonardo Caffaro');
  const postDate = post.createdAt || post.date;
  const commentsCount = post._count?.comments ?? post.comments?.length ?? 0;
  const postUrl = `/${categorySlug}/${post.slug}`;

  async function handleLike(e) {
    e.preventDefault();
    e.stopPropagation();
    if (likingLoading) return;
    setLikingLoading(true);
    try {
      if (liked) {
        const updated = await unlikePost(post.id);
        setLikesCount(updated.likes);
        setLiked(false);
        try {
          const likedPosts = JSON.parse(localStorage.getItem('liked_posts') || '[]');
          const updatedLikedPosts = likedPosts.filter(id => id !== post.id);
          localStorage.setItem('liked_posts', JSON.stringify(updatedLikedPosts));
        } catch {}
      } else {
        const updated = await likePost(post.id);
        setLikesCount(updated.likes);
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
          onClick={handleLike}
          disabled={likingLoading}
          style={{ color: liked ? '#E63946' : 'var(--color-text-muted)', cursor: likingLoading ? 'default' : 'pointer' }}
          title={liked ? 'Remover curtida' : 'Curtir publicação'}
        >
          <ThumbsUp size={18} />
          {likesCount}
        </InteractionButton>

        <InteractionButton>
          <MessageCircle size={18} />
          {commentsCount}
        </InteractionButton>
        <ShareButton post={post} />
        

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