import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Chat.css';

const API = '/api';

const EMOJIS = ['😀','😊','🥰','😍','🤗','👍','❤️','💕','🌟','🎉','🌈','🦋','🌸','⭐','🎈','🃏','🧩','🎮','📷','🛒'];
const GIFS = [
  'https://media.giphy.com/media/26u4cqiYI30juCOGY/giphy.gif',
  'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',
  'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
  'https://media.giphy.com/media/11sBLKeXClkyIW/giphy.gif',
  'https://media.giphy.com/media/artj92V8o75VPL7AeQ/giphy.gif'
];

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const { getToken } = useAuth();
  const listRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const fetchMessages = async () => {
    const token = getToken();
    const res = await fetch(`${API}/chat`, { headers: { Authorization: `Bearer ${token}` } });
    if (res.ok) {
      const data = await res.json();
      setMessages(data);
    }
  };

  const sendMessage = async (text) => {
    const t = (text || input).trim();
    if (!t || loading) return;
    setInput('');
    setShowEmoji(false);
    setShowGif(false);
    setLoading(true);
    try {
      const res = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ text: t })
      });
      const data = await res.json();
      if (res.ok) {
        setMessages((prev) => [...prev, data.carter, data.emma]);
      } else {
        setMessages((prev) => [...prev, { sender: 'carter', text: t, _id: 'temp1' }, { sender: 'emma', text: 'Oops! Try again sweetie 💕', _id: 'temp2' }]);
      }
    } catch (_) {
      setMessages((prev) => [...prev, { sender: 'carter', text: t, _id: 'temp1' }, { sender: 'emma', text: 'Mommy is here! Try again in a sec! 💖', _id: 'temp2' }]);
    } finally {
      setLoading(false);
    }
  };

  const pickEmoji = (e) => {
    setInput((prev) => prev + e);
  };

  const pickGif = (url) => {
    sendMessage(`[GIF] ${url}`);
  };

  return (
    <div className="chat-page">
      <header className="chat-header">
        <Link to="/" className="chat-back">← Home</Link>
        <h1 className="chat-title">💬 Chat with Mommy</h1>
      </header>

      <div className="chat-list" ref={listRef}>
        {messages.length === 0 && (
          <div className="chat-welcome">
            <p>Say hi to Mommy! 👋</p>
            <p className="chat-welcome-small">She'll reply with love 💕</p>
          </div>
        )}
        {messages.map((m) => (
          <div key={m._id || m.text} className={`chat-bubble-wrap ${m.sender}`}>
            <img
              src={m.sender === 'carter' ? '/assets/Carter.png' : '/assets/Carter_and_Emma.jpg'}
              alt={m.sender}
              className="chat-avatar"
            />
            <div className={`chat-bubble ${m.sender}`}>
              {m.text.startsWith('[GIF] ') ? (
                <img src={m.text.slice(6)} alt="gif" className="chat-inline-gif" />
              ) : (
                <span>{m.text}</span>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-bubble-wrap emma">
            <img src="/assets/Carter_and_Emma.jpg" alt="Emma" className="chat-avatar" />
            <div className="chat-bubble emma typing">Mommy is typing...</div>
          </div>
        )}
      </div>

      <div className="chat-picker-bar">
        <button type="button" onClick={() => { setShowEmoji(!showEmoji); setShowGif(false); }} className="chat-picker-btn">😀 Emoji</button>
        <button type="button" onClick={() => { setShowGif(!showGif); setShowEmoji(false); }} className="chat-picker-btn">🎬 GIF</button>
      </div>
      {showEmoji && (
        <div className="chat-emoji-bar">
          {EMOJIS.map((e) => (
            <button key={e} type="button" onClick={() => pickEmoji(e)} className="chat-emoji-btn">{e}</button>
          ))}
        </div>
      )}
      {showGif && (
        <div className="chat-gif-bar">
          {GIFS.map((url) => (
            <button key={url} type="button" onClick={() => pickGif(url)} className="chat-gif-btn">
              <img src={url} alt="gif" />
            </button>
          ))}
        </div>
      )}

      <div className="chat-input-wrap">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type to Mommy..."
          className="chat-input"
        />
        <button type="button" onClick={() => sendMessage()} disabled={loading} className="chat-send">Send 💕</button>
      </div>
    </div>
  );
}
