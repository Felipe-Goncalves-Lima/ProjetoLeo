import { useState, useEffect } from 'react';
import { fetchPosts } from '../services/api';

/**
 *
 * @param {Object} params
 * @returns {{ posts: Array, loading: boolean, error: string|null, meta: Object }}
 */
export function usePosts(params = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({});

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchPosts(JSON.parse(paramsKey));
        if (!cancelled) {
          setPosts(response.data || []);
          setMeta(response.meta || {});
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Erro ao carregar publicações.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [paramsKey]);

  return { posts, loading, error, meta };
}
