import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Pictures.css';

const API = '/api';

export default function Pictures() {
  const [pictures, setPictures] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { getToken } = useAuth();
  const fileRef = useRef(null);

  useEffect(() => {
    fetchPictures();
  }, []);

  const fetchPictures = async () => {
    const res = await fetch(`${API}/upload`, { headers: { Authorization: `Bearer ${getToken()}` } });
    if (res.ok) {
      const data = await res.json();
      setPictures(data);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append('picture', file);
      const res = await fetch(`${API}/upload`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: form
      });
      if (res.ok) {
        const data = await res.json();
        setPictures((prev) => [{ _id: data.id, path: data.path }, ...prev]);
      }
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const uploadsBase = '';

  return (
    <div className="pictures-page">
      <header className="pictures-header">
        <Link to="/" className="pictures-back">← Home</Link>
        <h1 className="pictures-title">📷 My Pictures for Mommy</h1>
      </header>

      <div className="pictures-upload-zone">
        <p>Show Mommy your pictures! 📸</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="pictures-input"
        />
        <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="pictures-upload-btn">
          {uploading ? 'Uploading...' : '📤 Pick a photo'}
        </button>
      </div>

      <div className="pictures-grid">
        {pictures.map((pic) => (
          <div key={pic._id} className="pictures-item">
            <img src={pic.path} alt="Carter" className="pictures-img" />
          </div>
        ))}
      </div>
      {pictures.length === 0 && !uploading && (
        <p className="pictures-empty">No pictures yet. Upload one to show Mommy! 💕</p>
      )}
    </div>
  );
}
