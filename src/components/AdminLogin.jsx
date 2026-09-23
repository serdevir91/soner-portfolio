import { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Eye, EyeOff, Github, LockKeyhole, ShieldCheck } from 'lucide-react';
import { sanitizeToken, verifyAdminToken } from '../utils/githubAdmin';

const messages = {
  tr: {
    title: 'Yönetim paneli',
    intro: 'İçerik stüdyosuna erişmek ve değişiklikleri canlı sitede yayımlamak için GitHub hesabınızı bağlayın.',
    label: 'GitHub erişim anahtarı (PAT)',
    placeholder: 'ghp_… veya github_pat_…',
    submit: 'Giriş yap & Cihaza kaydet',
    checking: 'Erişim anahtarı doğrulanıyor…',
    back: 'Siteye dön',
    rememberMe: 'Bu cihazda beni hatırla (Bir daha token sormaz)',
    connectTitle: 'GitHub Hesabıyla Hızlı Bağlan',
    connectSub: 'Aşağıdaki butona basarak depoya yazma iznini tek tıkla onaylayın, anahtarı yapıştırın.',
    connectBtn: 'GitHub’da Yetkilendir',
    privacy: 'Anahtar yalnızca GitHub API ile güvenli HTTPS üzerinden iletişim kurar. "Beni hatırla" seçildiğinde yalnızca bu tarayıcınızda saklanır.',
    help: 'Açılan GitHub sayfasında en alta inip yeşil "Generate token" butonuna basmanız yeterlidir (repo izinleri önceden seçilmiştir).',
    create: 'Klasik anahtar sayfası (repo izinli)',
    createFineGrained: 'Fine-grained anahtar sayfası',
    showToken: 'Anahtarı göster',
    hideToken: 'Anahtarı gizle',
    errors: {
      invalid_token: 'Erişim anahtarı geçersiz veya süresi dolmuş (401 Unauthorized).',
      wrong_account: 'Bu anahtar serdevir91 hesabına ait değil.',
      missing_permission: 'Bu anahtarın soner-portfolio deposunda yazma (Contents: Read and write) izni yok. Token oluştururken Contents veya repo yetkisini açık tutun.',
      github_error: 'GitHub API doğrulaması şu anda tamamlanamadı. Lütfen internet bağlantınızı ve anahtarınızı kontrol edin.',
    },
  },
  en: {
    title: 'Admin panel',
    intro: 'Connect your GitHub account to edit and publish content live to the website.',
    label: 'GitHub access token (PAT)',
    placeholder: 'ghp_… or github_pat_…',
    submit: 'Sign in & Save on device',
    checking: 'Verifying access token…',
    back: 'Back to site',
    rememberMe: 'Remember me on this device (Stay signed in)',
    connectTitle: 'Quick Connect with GitHub',
    connectSub: 'Authorize repository access in one click, then paste the key below.',
    connectBtn: 'Authorize on GitHub',
    privacy: 'The token communicates strictly with GitHub API over secure HTTPS. If "Remember me" is checked, it is stored only on this browser.',
    help: 'On the opened GitHub page, scroll to the bottom and click "Generate token" (repo scope is pre-selected).',
    create: 'Classic token page (repo scope)',
    createFineGrained: 'Fine-grained token page',
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
  const [rememberMe, setRememberMe] = useState(true);
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
      onSuccess(clean, rememberMe);
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

        {/* Quick Connect with GitHub */}
        <div className="quick-connect-banner">
          <div className="quick-connect-info">
            <Github size={22} className="github-brand-icon" />
            <div>
              <strong>{t.connectTitle}</strong>
              <p>{t.connectSub}</p>
            </div>
          </div>
          <a
            href="https://github.com/settings/tokens/new?description=soner-portfolio-admin&scopes=repo"
            target="_blank"
            rel="noopener noreferrer"
            className="action action-primary quick-auth-btn"
          >
            {t.connectBtn} <ArrowUpRight size={16} />
          </a>
        </div>

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

          <label className="remember-checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            <span>{t.rememberMe}</span>
          </label>

          {error && <p className="form-error" role="alert">{error}</p>}

          <button className="action action-primary login-submit-btn" type="submit" disabled={busy}>
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
