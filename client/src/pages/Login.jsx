import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const API = '/api';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const token = useAuth().getToken?.();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = isLogin ? `${API}/auth/login` : `${API}/auth/register`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      login(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (token) {
    navigate('/');
    return null;
  }

  return (
    <div className="login-page">
      <div className="login-decorations">
        <span className="deco deco-1">🌟</span>
        <span className="deco deco-2">💖</span>
        <span className="deco deco-3">🌈</span>
        <span className="deco deco-4">✨</span>
        <span className="deco deco-5">🎈</span>
        <span className="deco deco-6">🦋</span>
        <span className="deco deco-7">🌸</span>
        <span className="deco deco-8">⭐</span>
      </div>

      <div className="login-card">
        <h1 className="login-title">Cute Carter & Beautiful Mommy</h1>
        <p className="login-subtitle">Play and chat with Mommy! 💕</p>

        <div className="login-image-wrap">
          <img src="/assets/Carter_and_Emma.jpg" alt="Carter and Emma" className="login-image" />
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="📧 Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={4}
            className="login-input"
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit" disabled={loading} className="login-btn">
            {loading ? '...' : isLogin ? 'Login 🏠' : 'Sign Up ✨'}
          </button>
        </form>

        <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); }} className="login-toggle">
          {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
}
