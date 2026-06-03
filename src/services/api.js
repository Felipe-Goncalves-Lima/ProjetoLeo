/**
 * Serviço centralizado de comunicação com a API do back-end.
 * Todas as chamadas passam pelo proxy Vite em /api (→ http://localhost:3001/api)
 */

const BASE_URL = '/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};

  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders,
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Erro ${response.status}`);
  }

  return data;
}


/**
 * @param {Object} params
 */
export async function fetchPosts(params = {}) {
  const query = new URLSearchParams({
    sort: 'createdAt',
    order: 'desc',
    limit: '20',
    ...Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
    ),
  }).toString();

  const data = await request(`/posts?${query}`);
  return {
    ...data,
    meta: data.pagination || {},
  };
}

/**
 * @param {string} slug
 */
export async function fetchPostBySlug(slug) {
  const data = await request(`/posts/${slug}`);
  return data.data;
}

/**
 * @param {string} postId
 */
export async function likePost(postId) {
  const data = await request(`/posts/${postId}/like`, { method: 'POST' });
  return data.data;
}


/**
 * @param {string} postId
 * @param {{ authorName: string, authorEmail: string, content: string }} payload
 */
export async function postComment(postId, payload) {
  const data = await request(`/comments/post/${postId}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.data;
}

/**
 * @param {string} commentId
 */
export async function deleteComment(commentId) {
  const data = await request(`/comments/${commentId}`, {
    method: 'DELETE',
  });
  return data;
}

/**
 * @param {string} commentId
 * @param {string} content
 */
export async function updateComment(commentId, content) {
  const data = await request(`/comments/${commentId}`, {
    method: 'PATCH',
    body: JSON.stringify({ content }),
  });
  return data.data;
}


/**
 * @param {{ name: string, email: string, subject: string, message: string }} payload
 */
export async function sendContactMessage(payload) {
  const data = await request('/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data;
}


/**
 * @param {string} email
 * @param {string} password
 */
export async function login(email, password) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  return data.data;
}


export async function getMe() {
  const data = await request('/auth/me');
  return data.data; 
}

/**
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */
export async function register(name, email, password) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
  return data.data;
}

/**
 * @param {Object} payload
 */
export async function createPost(payload) {
  const data = await request('/posts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return data.data;
}

/**
 * @param {string} id
 * @param {Object} payload
 */
export async function updatePost(id, payload) {
  const data = await request(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
  return data.data;
}

/**
 * @param {string} id
 */
export async function deletePost(id) {
  const data = await request(`/posts/${id}`, {
    method: 'DELETE',
  });
  return data;
}

/**
 * @param {string} id
 * @param {string} status
 */
export async function updatePostStatus(id, status) {
  const data = await request(`/posts/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
  return data.data;
}


export async function fetchCategories() {
  const data = await request('/categories');
  return data.data;
}

/**
 * @param {File} file
 * @param {string} postId
 * @param {string} title
 * @param {string} type
 * @param {string} description
 */
export async function uploadAttachment(file, postId, title, type, description) {
  const token = localStorage.getItem('token');
  const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};

  const formData = new FormData();
  formData.append('file', file);
  formData.append('postId', postId);
  formData.append('title', title);
  formData.append('type', type);
  if (description) {
    formData.append('description', description);
  }

  const response = await fetch(`${BASE_URL}/attachments/upload`, {
    method: 'POST',
    headers: {
      ...authHeaders,
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Erro ${response.status}`);
  }
  return data.data;
}

/**
 * @param {string} id
 */
export async function deleteAttachment(id) {
  const data = await request(`/attachments/${id}`, {
    method: 'DELETE',
  });
  return data;
}


