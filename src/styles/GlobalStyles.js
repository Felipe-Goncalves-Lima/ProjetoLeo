import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --color-bg: #FFFFFF;
    --color-bg-secondary: #F0F2F5;
    --color-text-main: #1A1A1A;
    --color-text-muted: #65676B;
    --color-primary-red: #E63946;
    --color-primary-blue: #1D3557;
    --color-border: #E4E6EB;
    
    --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
    --font-serif: 'Merriweather', 'Georgia', serif;

    --max-width-content: 800px;
    --header-height: 60px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--color-bg-secondary);
    color: var(--color-text-main);
    font-family: var(--font-sans);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    overflow-y: scroll;
  }

  a {
    color: var(--color-primary-blue);
    text-decoration: none;
    transition: color 0.2s;
  }

  a:hover {
    text-decoration: underline;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-serif);
    color: var(--color-text-main);
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  button {
    font-family: var(--font-sans);
    cursor: pointer;
    border: none;
    outline: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
`;
