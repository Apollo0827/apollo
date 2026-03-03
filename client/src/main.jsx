import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function showLoadError(msg) {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = '<div style="padding:2rem;font-family:sans-serif;max-width:600px;margin:0 auto;"><h2>App failed to load</h2><pre style="background:#f5f5f5;padding:1rem;overflow:auto;white-space:pre-wrap;">' + (msg || 'Unknown error') + '</pre><p>Open DevTools (F12) → Console for details.</p></div>';
  }
}

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
          <h2>Something went wrong</h2>
          <pre style={{ background: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <p>Check the browser console (F12) for details.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const root = document.getElementById('root');
if (!root) {
  document.body.innerHTML = '<p style="padding:2rem">No #root element found.</p>';
} else {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <ErrorBoundary>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </ErrorBoundary>
      </React.StrictMode>
    );
  } catch (err) {
    showLoadError(err?.message || String(err));
  }
}
