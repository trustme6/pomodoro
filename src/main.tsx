import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';

import App from './app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`;

root.render(
  <StrictMode>
    <GlobalStyle/>
    <App />
  </StrictMode>
);
