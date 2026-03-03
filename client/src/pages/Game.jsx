import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Game.css';

const API = '/api';

export default function Game() {
  const [balance, setBalance] = useState(null);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [addCoins, setAddCoins] = useState('');
  const { getToken } = useAuth();

  useEffect(() => {
    fetchWallet();
    fetchGames();
  }, []);

  const fetchWallet = async () => {
    const res = await fetch(`${API}/game/wallet`, { headers: { Authorization: `Bearer ${getToken()}` } });
    if (res.ok) {
      const data = await res.json();
      setBalance(data.balance);
    } else {
      setBalance(100);
    }
  };

  const fetchGames = async () => {
    const res = await fetch(`${API}/game/list`, { headers: { Authorization: `Bearer ${getToken()}` } });
    if (res.ok) {
      const data = await res.json();
      setGames(data);
    } else {
      setGames([
        { id: '44a', name: 'Card Game 44A', description: 'Play cards with Mommy!', icon: '🃏' },
        { id: 'puzzle', name: 'Puzzle Fun', description: 'Solve puzzles with Mommy', icon: '🧩' },
        { id: 'memory', name: 'Memory Match', description: 'Match pairs with Mommy', icon: '🎴' }
      ]);
    }
  };

  const handleAddCoins = async () => {
    const num = Math.min(1000, Math.max(1, parseInt(addCoins, 10) || 10));
    const res = await fetch(`${API}/game/wallet/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ amount: num })
    });
    if (res.ok) {
      const data = await res.json();
      setBalance(data.balance);
      setAddCoins('');
    }
  };

  return (
    <div className="game-page">
      <header className="game-header">
        <Link to="/" className="game-back">← Home</Link>
        <h1 className="game-title">🎮 Game Room with Mommy</h1>
      </header>

      <div className="game-wallet">
        <div className="game-wallet-label">💰 Your Coins</div>
        <div className="game-wallet-value">{balance != null ? balance : '...'}</div>
        <div className="game-wallet-add">
          <input
            type="number"
            min="1"
            max="1000"
            placeholder="Add coins"
            value={addCoins}
            onChange={(e) => setAddCoins(e.target.value)}
            className="game-wallet-input"
          />
          <button type="button" onClick={handleAddCoins} className="game-wallet-btn">Add</button>
        </div>
      </div>

      <section className="game-list-section">
        <h2 className="game-section-title">Pick a game to play with Mommy!</h2>
        <div className="game-list">
          {games.map((g) => (
            <button
              key={g.id}
              type="button"
              className="game-card"
              onClick={() => setSelectedGame(g)}
            >
              <span className="game-card-icon">{g.icon}</span>
              <span className="game-card-name">{g.name}</span>
              <span className="game-card-desc">{g.description}</span>
            </button>
          ))}
        </div>
      </section>

      {selectedGame && (
        <div className="game-modal" onClick={() => setSelectedGame(null)}>
          <div className="game-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedGame.icon} {selectedGame.name}</h3>
            <p>{selectedGame.description}</p>
            {selectedGame.id === '44a' ? (
              <div className="game-44a-placeholder">
                <p>Card Game 44A with AI Mommy coming soon! 🃏</p>
                <p className="game-44a-hint">Mommy will play cards with you here.</p>
              </div>
            ) : (
              <p className="game-coming">This game is coming soon! 🎉</p>
            )}
            <button type="button" onClick={() => setSelectedGame(null)} className="game-modal-close">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
