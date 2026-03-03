import React from 'react';
import { Link } from 'react-router-dom';
import './Shopping.css';

export default function Shopping() {
  return (
    <div className="shopping-page">
      <header className="shopping-header">
        <Link to="/" className="shopping-back">← Home</Link>
        <h1 className="shopping-title">🛒 Shopping</h1>
      </header>
      <div className="shopping-placeholder">
        <p>🛍️ Fun shopping with Mommy coming soon!</p>
        <p className="shopping-hint">You'll be able to get cute items here.</p>
      </div>
    </div>
  );
}
