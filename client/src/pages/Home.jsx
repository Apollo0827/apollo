import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const tabs = [
    { path: '/chat', label: 'Chat with Mommy', icon: '💬', desc: 'Talk to Emma' },
    { path: '/game', label: 'Game Room', icon: '🎮', desc: 'Play with Mommy' },
    { path: '/shopping', label: 'Shopping', icon: '🛒', desc: 'Shop fun stuff' },
    { path: '/pictures', label: 'My Pictures', icon: '📷', desc: 'Show pics to Mommy' }
  ];

  return (
    <div className="home-page">
      <header className="home-header">
        <h1 className="home-title">Cute Carter & Beautiful Mommy</h1>
        <p className="home-hello">Hi, {user?.displayName || 'Carter'}! 👋</p>
        <button onClick={() => { logout(); navigate('/login'); }} className="home-logout">Log out</button>
      </header>

      <nav className="home-tabs">
        {tabs.map((t) => (
          <Link key={t.path} to={t.path} className="home-tab">
            <span className="home-tab-icon">{t.icon}</span>
            <span className="home-tab-label">{t.label}</span>
            <span className="home-tab-desc">{t.desc}</span>
          </Link>
        ))}
      </nav>

      <div className="home-welcome">
        <p>Pick where you want to go! 🎈</p>
      </div>
    </div>
  );
}
