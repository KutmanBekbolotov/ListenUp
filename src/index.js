import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './styles/global.css';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MediaPlayerProvider } from './context/MediaPlayerContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MediaPlayerProvider>
        <App />
      </MediaPlayerProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
