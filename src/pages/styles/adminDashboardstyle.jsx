import styled from "styled-components";
import { Link } from "react-router-dom";

export const DashboardContainer = styled.div`
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 2rem;
  margin-top: 1rem;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: var(--color-primary-blue);
  font-family: var(--font-serif);
`;

export const CreateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-primary-red);
  color: white !important;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
    text-decoration: none;
  }
`;

export const SearchBar = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  max-width: 500px;
  position: relative;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-bg-secondary);
  color: var(--color-text-main);

  &:focus {
    outline: none;
    border-color: var(--color-primary-blue);
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 0.8rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-muted);
  display: flex;
  align-items: center;
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  text-align: left;
`;

export const Th = styled.th`
  padding: 0.75rem 1rem;
  border-bottom: 2px solid var(--color-border);
  color: var(--color-text-muted);
  font-weight: 600;
  font-size: 0.9rem;
`;

export const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.95rem;
  color: var(--color-text-main);
  vertical-align: middle;
`;

export const PostTitleLink = styled(Link)`
  color: var(--color-text-main);
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: var(--color-primary-blue);
  }
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  background: ${props => props.type === 'published' ? '#d1fae5' : '#fef3c7'};
  color: ${props => props.type === 'published' ? '#065f46' : '#92400e'};
`;

export const CategoryBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-primary-blue);
  background: var(--color-bg-secondary);
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
`;

export const ActionGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const ActionButton = styled.button`
  background: ${props => props.bg || 'var(--color-bg-secondary)'};
  border: 1px solid ${props => props.border || 'var(--color-border)'};
  color: ${props => props.color || 'var(--color-text-main)'};
  padding: 0.4rem;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.85;
    background: ${props => props.hoverBg || 'var(--color-border)'};
  }
`;

export const LoadingWrapper = styled.div`
  text-align: center;
  padding: 4rem 0;
  color: var(--color-text-muted);
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--color-text-muted);
  border: 1px dashed var(--color-border);
  border-radius: 8px;
  margin-top: 1rem;
`;