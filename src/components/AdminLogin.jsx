import { useState } from 'react';
import { ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck } from 'lucide-react';
import { sanitizeToken, verifyAdminToken } from '../utils/githubAdmin';

const messages = {
  tr: {
    title: 'Yönetim paneli',
    intro: 'İçerik stüdyosuna erişmek ve değişiklikleri canlı sitede yayımlamak için GitHub erişim anahtarınızla giriş yapın.',
    label: 'GitHub erişim anahtarı (PAT)',
    placeholder: 'github_pat_… veya ghp_…',
    submit: 'Giriş yap',
    checking: 'Erişim anahtarı doğrulanıyor…',
    back: 'Siteye dön',
    privacy: 'Anahtar yalnızca GitHub API ile güvenli HTTPS üzerinden iletişim kurar. Git deposuna veya kalıcı site içeriğine asla yazılmaz. Oturumunuz bu tarayıcı sekmesi boyunca aktif kalır.',
    help: 'GitHub erişim anahtarı oluştururken "Contents: Read and write" veya Klasik Token için "repo" kutucuğunu işaretlemeniz gerekir.',
    create: 'Klasik anahtar oluştur (Önerilen)',
    createFineGrained: 'Fine-grained anahtar oluştur',
    showToken: 'Anahtarı göster',
    hideToken: 'Anahtarı gizle',
    errors: {
      invalid_token: 'Erişim anahtarı geçersiz veya süresi dolmuş (401 Unauthorized).',
      wrong_account: 'Bu anahtar serdevir91 hesabına ait değil.',
      missing_permission: 'Bu anahtarın soner-portfolio deposunda yazma (Contents: Read and write) izni yok. Token oluştururken Contents yetkisini "Read and write" olarak ayarlayın.',
      github_error: 'GitHub API doğrulaması şu anda tamamlanamadı. Lütfen internet bağlantınızı ve anahtarınızı kontrol edin.',
    },
  },
  en: {
    title: 'Admin panel',
    intro: 'Sign in with your GitHub access token to edit and publish content live to the website.',
    label: 'GitHub access token (PAT)',
    placeholder: 'github_pat_… or ghp_…',
    submit: 'Sign in',
    checking: 'Verifying access token…',
    back: 'Back to site',
    privacy: 'The token is transmitted only to the GitHub API over secure HTTPS. It is never saved to the repository or published content. Your session stays active during this browser tab.',
    help: 'When creating the token, check the "repo" scope for Classic tokens or "Contents: Read and write" for Fine-Grained tokens.',
    create: 'Create classic token (Recommended)',
    createFineGrained: 'Create fine-grained token',
    showToken: 'Show token',
    hideToken: 'Hide token',
    errors: {
      invalid_token: 'Access token is invalid or expired (401 Unauthorized).',
      wrong_account: 'This token does not belong to the serdevir91 account.',
      missing_permission: 'This token lacks write permission on soner-portfolio (Contents: Read and write required).',
      github_error: 'GitHub API verification could not be completed. Check your internet connection and token.',
    },
  },
};

export default function AdminLogin({ lang, onSuccess, onClose }) {
  const [token, setToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const t = messages[lang] || messages.tr;

  const submit = async event => {
    event.preventDefault();
    const clean = sanitizeToken(token);
    if (!clean || busy) return;
    setError('');
    setBusy(true);
    try {
      await verifyAdminToken(clean);
      setToken('');
      onSuccess(clean);
    } catch (failure) {
      setError(t.errors[failure.message] || t.errors.github_error);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-login-wrap">
      <button className="eyebrow back-btn" onClick={onClose}>
        <ArrowLeft size={16} /> {t.back}
      </button>
      <section className="admin-login-card" aria-labelledby="admin-login-title">
        <div className="admin-login-icon">
          <LockKeyhole size={25} />
        </div>
        <span className="eyebrow">PRIVATE CONTENT STUDIO</span>
        <h1 id="admin-login-title">{t.title}<span className="title-dot">.</span></h1>
        <p>{t.intro}</p>
        <form onSubmit={submit}>
          <label htmlFor="admin-token">{t.label}</label>
          <div className="admin-input-wrapper">
            <input
              id="admin-token"
              type={showPassword ? 'text' : 'password'}
              value={token}
              onChange={event => setToken(event.target.value)}
              placeholder={t.placeholder}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? t.hideToken : t.showToken}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <button className="action action-primary" type="submit" disabled={busy}>
            {busy ? t.checking : t.submit}
            <ArrowRight size={17} />
          </button>
        </form>
        <div className="admin-login-help">
          <ShieldCheck size={18} />
          <p>{t.privacy}</p>
        </div>
        <div className="admin-login-instructions">
          <p>{t.help}</p>
          <div className="token-create-links">
            <a
              href="https://github.com/settings/tokens/new?description=soner-portfolio-admin&scopes=repo"
              target="_blank"
              rel="noopener noreferrer"
              className="token-link-btn"
            >
              🔑 {t.create} ↗
            </a>
            <a
              href="https://github.com/settings/personal-access-tokens/new"
              target="_blank"
              rel="noopener noreferrer"
              className="token-link-sub"
            >
              {t.createFineGrained} ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
