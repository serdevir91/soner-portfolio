import React, { useState } from 'react';
import { Lock, User, KeyRound, X, AlertCircle, ShieldCheck } from 'lucide-react';
import { authenticateAdmin } from '../utils/auth';

const LoginModal = ({ isOpen, onClose, onLoginSuccess, lang }) => {
  const [username, setUsername] = useState('serdevir');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await authenticateAdmin(username, password);
      if (success) {
        onLoginSuccess();
        onClose();
        setPassword('');
      } else {
        setError(lang === 'tr' ? 'Hatalı kullanıcı adı veya şifre!' : 'Invalid username or password!');
      }
    } catch (err) {
      setError(lang === 'tr' ? 'Giriş işlemi sırasında hata oluştu.' : 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="store-modal-overlay no-print" onClick={onClose} style={{ zIndex: 1100 }}>
      <div className="store-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px', padding: '32px' }}>
        <button className="store-modal-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', marginBottom: '12px', boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
          }}>
            <Lock size={28} />
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', margin: 0 }}>
            {lang === 'tr' ? 'Admin Paneli Girişi' : 'Admin Panel Login'}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '6px' }}>
            {lang === 'tr' ? 'Portfolyo ve App Store yönetim erişimi' : 'Access portfolio & app store management'}
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)',
            color: '#f87171', padding: '12px 16px', borderRadius: '10px', fontSize: '13px',
            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px'
          }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              {lang === 'tr' ? 'Kullanıcı Adı' : 'Username'}
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="serdevir"
                required
                style={{
                  width: '100%', padding: '12px 14px 12px 40px', background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)',
                  fontSize: '14px', outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              {lang === 'tr' ? 'Şifre' : 'Password'}
            </label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '12px 14px 12px 40px', background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)',
                  fontSize: '14px', outline: 'none'
                }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '14px', fontWeight: '600', justifyContent: 'center' }}
          >
            {loading ? (lang === 'tr' ? 'Doğrulanıyor...' : 'Authenticating...') : (lang === 'tr' ? 'Giriş Yap' : 'Sign In')}
          </button>
        </form>

        <div style={{
          marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-color)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
          fontSize: '11px', color: 'var(--text-muted)'
        }}>
          <ShieldCheck size={14} style={{ color: '#10b981' }} />
          <span>SHA-256 Cryptographic Authentication</span>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
