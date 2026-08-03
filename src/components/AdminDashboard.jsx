import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, User, KeyRound, LogOut, LayoutDashboard, 
  ShoppingBag, Download, Upload, RefreshCw, Save, Plus, Trash2, 
  Edit3, ExternalLink, Check, AlertCircle, Eye, Sparkles, Layers,
  Smartphone, Monitor, Globe, PlusCircle
} from 'lucide-react';
import { authenticateAdmin } from '../utils/auth';

const AdminDashboard = ({ 
  isLoggedIn, 
  onLoginSuccess, 
  onLogout, 
  data, 
  onSaveData, 
  onResetData, 
  onSwitchView, 
  lang 
}) => {
  // Login Form States
  const [username, setUsername] = useState('serdevir');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Admin Navigation Tab
  const [activeTab, setActiveTab] = useState('apps'); // 'overview', 'profile', 'apps', 'backup'

  // App Editor States
  const [editingApp, setEditingApp] = useState(null);
  const [isNewApp, setIsNewApp] = useState(false);

  // Form State
  const [formData, setFormData] = useState(data);

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const success = await authenticateAdmin(username, password);
      if (success) {
        onLoginSuccess();
        setPassword('');
      } else {
        setLoginError(lang === 'tr' ? 'Hatalı kullanıcı adı veya şifre!' : 'Invalid username or password!');
      }
    } catch (err) {
      setLoginError(lang === 'tr' ? 'Giriş sırasında bir hata oluştu.' : 'Authentication error.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Profile Field Handlers
  const handleProfileChange = (field, value, subField = null) => {
    setFormData(prev => {
      if (subField) {
        return {
          ...prev,
          profile: {
            ...prev.profile,
            [field]: {
              ...prev.profile[field],
              [subField]: value
            }
          }
        };
      }
      return {
        ...prev,
        profile: {
          ...prev.profile,
          [field]: value
        }
      };
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onSaveData(formData);
    alert(lang === 'tr' ? 'Profil bilgileri başarıyla güncellendi!' : 'Profile updated successfully!');
  };

  // App Store Handlers
  const handleOpenAppForm = (app = null) => {
    if (app) {
      setEditingApp(JSON.parse(JSON.stringify(app)));
      setIsNewApp(false);
    } else {
      setEditingApp({
        id: `app_${Date.now()}`,
        name: '',
        tagline: { en: '', tr: '' },
        description: { en: '', tr: '' },
        icon: '',
        category: { en: 'Tools', tr: 'Araçlar' },
        platforms: ['Android'],
        playStoreUrl: '',
        githubUrl: '',
        screenshots: [],
        features: { en: ['High Performance'], tr: ['Yüksek Performans'] },
        version: '1.0.0',
        size: '15 MB',
        rating: '5.0',
        reviews: '1',
        releaseDate: new Date().toISOString().split('T')[0]
      });
      setIsNewApp(true);
    }
  };

  const handleSaveApp = (e) => {
    e.preventDefault();
    if (!editingApp.name) return;

    let updatedApps = [...formData.apps];
    if (isNewApp) {
      updatedApps.push(editingApp);
    } else {
      updatedApps = updatedApps.map(a => a.id === editingApp.id ? editingApp : a);
    }

    const newPortfolioData = { ...formData, apps: updatedApps };
    setFormData(newPortfolioData);
    onSaveData(newPortfolioData);
    setEditingApp(null);
  };

  const handleDeleteApp = (appId) => {
    if (window.confirm(lang === 'tr' ? 'Bu uygulamayı kaldırmak istediğinize emin misiniz?' : 'Are you sure you want to remove this app?')) {
      const updatedApps = formData.apps.filter(a => a.id !== appId);
      const newPortfolioData = { ...formData, apps: updatedApps };
      setFormData(newPortfolioData);
      onSaveData(newPortfolioData);
    }
  };

  // Backup Handlers
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `serdevir_portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (importedData.profile && importedData.apps) {
          setFormData(importedData);
          onSaveData(importedData);
          alert(lang === 'tr' ? 'Yedek verileri yüklendi!' : 'Backup data loaded!');
        } else {
          alert(lang === 'tr' ? 'Geçersiz yedek dosyası formatı!' : 'Invalid backup format!');
        }
      } catch (err) {
        alert(lang === 'tr' ? 'JSON ayrıştırma hatası!' : 'JSON parse error!');
      }
    };
    reader.readAsText(file);
  };

  // ----------------------------------------------------
  // UNAUTHENTICATED: FULL-PAGE LOGIN PORTAL
  // ----------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div style={{
          width: '100%', maxWidth: '460px', background: 'rgba(17, 24, 39, 0.8)',
          border: '1px solid var(--border-color)', borderRadius: '24px', padding: '40px 32px',
          backdropFilter: 'blur(16px)', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '68px', height: '68px', borderRadius: '20px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', marginBottom: '16px', boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
            }}>
              <ShieldCheck size={36} />
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', margin: 0, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
              {lang === 'tr' ? 'Yönetici Kontrol Paneli' : 'Admin Control Center'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px', lineHeight: 1.5 }}>
              {lang === 'tr' ? 'Portfolyo ve App Store yönetimi için serdevir kimlik doğrulaması' : 'Authenticate as serdevir to unlock administrative controls'}
            </p>
          </div>

          {loginError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171', padding: '14px 16px', borderRadius: '12px', fontSize: '13px',
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px'
            }}>
              <AlertCircle size={18} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {lang === 'tr' ? 'Kullanıcı Adı' : 'Username'}
              </label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="serdevir"
                  required
                  style={{
                    width: '100%', padding: '14px 16px 14px 46px', background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)',
                    fontSize: '15px', outline: 'none', transition: 'all 0.2s'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                {lang === 'tr' ? 'Şifre' : 'Password'}
              </label>
              <div style={{ position: 'relative' }}>
                <KeyRound size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%', padding: '14px 16px 14px 46px', background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)',
                    fontSize: '15px', outline: 'none', transition: 'all 0.2s'
                  }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loginLoading}
              className="btn btn-primary"
              style={{
                width: '100%', padding: '14px', fontSize: '15px', fontWeight: '700',
                justifyContent: 'center', borderRadius: '12px',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
              }}
            >
              {loginLoading ? (lang === 'tr' ? 'Doğrulanıyor...' : 'Verifying...') : (lang === 'tr' ? 'Giriş Yap' : 'Unlock Panel')}
            </button>
          </form>

          <div style={{
            marginTop: '28px', paddingTop: '20px', borderTop: '1px solid var(--border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            fontSize: '12px', color: 'var(--text-muted)'
          }}>
            <ShieldCheck size={16} style={{ color: '#10b981' }} />
            <span>SHA-256 Cryptographic Authentication</span>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED: FULL-PAGE MODERN ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div style={{ padding: '24px 0 60px 0' }}>
      
      {/* ADMIN CONTROL HEADER BAR */}
      <div style={{
        background: 'rgba(17, 24, 39, 0.8)', border: '1px solid var(--border-color)',
        borderRadius: '20px', padding: '20px 24px', marginBottom: '28px',
        display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(12px)', boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
          }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
              {lang === 'tr' ? 'Yönetici Kontrol Merkezi' : 'Admin Control Center'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '13px', color: '#34d399' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }}></span>
              <span>{lang === 'tr' ? 'Oturum Açıldı: serdevir' : 'Authenticated as serdevir'}</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="btn" onClick={() => onSwitchView('interactive')} style={{ gap: '8px' }}>
            <Eye size={16} /> {lang === 'tr' ? 'Canlı Siteyi Gör' : 'View Live Site'}
          </button>
          <button className="btn" onClick={onLogout} style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', gap: '8px' }}>
            <LogOut size={16} /> {lang === 'tr' ? 'Çıkış Yap' : 'Logout'}
          </button>
        </div>
      </div>

      {/* MAIN DASHBOARD LAYOUT: SIDEBAR + CONTENT */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px' }}>
        
        {/* SIDEBAR NAVIGATION */}
        <aside style={{
          background: 'rgba(17, 24, 39, 0.7)', border: '1px solid var(--border-color)',
          borderRadius: '20px', padding: '20px 14px', height: 'fit-content',
          backdropFilter: 'blur(12px)'
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button 
              className={`btn ${activeTab === 'overview' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('overview'); setEditingApp(null); }}
              style={{ justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px' }}
            >
              <LayoutDashboard size={18} /> {lang === 'tr' ? 'Genel Bakış' : 'Overview'}
            </button>

            <button 
              className={`btn ${activeTab === 'apps' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('apps'); setEditingApp(null); }}
              style={{ justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px' }}
            >
              <ShoppingBag size={18} /> {lang === 'tr' ? 'App Store Yönetimi' : 'App Store Manager'}
            </button>

            <button 
              className={`btn ${activeTab === 'profile' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('profile'); setEditingApp(null); }}
              style={{ justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px' }}
            >
              <User size={18} /> {lang === 'tr' ? 'Profil & Biyografi' : 'Profile & Bio'}
            </button>

            <button 
              className={`btn ${activeTab === 'backup' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('backup'); setEditingApp(null); }}
              style={{ justifyContent: 'flex-start', padding: '12px 16px', fontSize: '14px' }}
            >
              <Download size={18} /> {lang === 'tr' ? 'Yedek & Senkronizasyon' : 'Backup & Sync'}
            </button>
          </nav>
        </aside>

        {/* MAIN PANEL CONTENT AREA */}
        <main style={{
          background: 'rgba(17, 24, 39, 0.7)', border: '1px solid var(--border-color)',
          borderRadius: '20px', padding: '32px', backdropFilter: 'blur(12px)',
          minHeight: '550px'
        }}>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginTop: 0, marginBottom: '20px', color: 'var(--text-primary)' }}>
                {lang === 'tr' ? 'Sistem & Yönetim Özeti' : 'System & Overview'}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div style={{
                  padding: '20px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.25)',
                  borderRadius: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#60a5fa', marginBottom: '8px' }}>
                    <ShoppingBag size={24} />
                    <span style={{ fontSize: '24px', fontWeight: '800' }}>{formData.apps.length}</span>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)' }}>
                    {lang === 'tr' ? 'Yayındaki Uygulamalar' : 'Store Applications'}
                  </div>
                </div>

                <div style={{
                  padding: '20px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.25)',
                  borderRadius: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399', marginBottom: '8px' }}>
                    <Smartphone size={24} />
                    <span style={{ fontSize: '24px', fontWeight: '800' }}>
                      {formData.apps.filter(a => a.playStoreUrl).length}
                    </span>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)' }}>
                    {lang === 'tr' ? 'Google Play Yayını' : 'Google Play Listed'}
                  </div>
                </div>

                <div style={{
                  padding: '20px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: '16px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c084fc', marginBottom: '8px' }}>
                    <User size={24} />
                    <span style={{ fontSize: '24px', fontWeight: '800' }}>100%</span>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)' }}>
                    {lang === 'tr' ? 'Profil Doğrulaması' : 'Profile Status'}
                  </div>
                </div>
              </div>

              <div style={{
                padding: '24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)',
                borderRadius: '16px', lineHeight: 1.6
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '10px', color: 'var(--text-primary)' }}>
                  💡 {lang === 'tr' ? 'Yönetici Notları' : 'Admin Instructions'}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
                  {lang === 'tr' 
                    ? 'App Store sekmesinden dilediğiniz zaman yeni uygulamalar ekleyebilir, görsel detaylarını düzenleyebilir veya kaldırabilirsiniz. Tüm değişiklikler tarayıcınıza kaydedilir ve "Yedek & Senkronizasyon" sekmesinden JSON olarak dışa aktarılabilir.'
                    : 'Use the App Store Manager tab to add new apps, edit details, or remove applications. All changes save automatically to local storage and can be backed up via JSON export.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: APP STORE MANAGER */}
          {activeTab === 'apps' && !editingApp && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                    {lang === 'tr' ? 'App Store Yönetimi' : 'App Store Manager'}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: '4px 0 0 0' }}>
                    {lang === 'tr' ? 'Uygulamalarınızı yönetin veya yeni projeler yayınlayın' : 'Manage published applications or showcase new projects'}
                  </p>
                </div>
                <button className="btn btn-primary" onClick={() => handleOpenAppForm(null)} style={{ gap: '8px', padding: '10px 18px' }}>
                  <PlusCircle size={18} /> {lang === 'tr' ? 'Yeni Uygulama Ekle' : 'Add New App'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {formData.apps.map(app => (
                  <div key={app.id} style={{
                    background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-color)',
                    borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column',
                    justifyContent: 'space-between', gap: '16px'
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <img 
                          src={app.icon} 
                          alt={app.name}
                          onError={(e) => { e.target.style.display = 'none'; }}
                          style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover', background: '#2563eb' }}
                        />
                        <div>
                          <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-primary)' }}>{app.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            {app.category[lang] || app.category.tr} • v{app.version}
                          </div>
                        </div>
                      </div>

                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                        {app.tagline[lang] || app.tagline.tr}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
                      <button className="btn" onClick={() => handleOpenAppForm(app)} style={{ flex: 1, gap: '6px', justifyContent: 'center' }}>
                        <Edit3 size={14} /> {lang === 'tr' ? 'Düzenle' : 'Edit'}
                      </button>
                      <button className="btn" onClick={() => handleDeleteApp(app.id)} style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '8px 12px' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* APP EDIT / ADD FORM */}
          {activeTab === 'apps' && editingApp && (
            <form onSubmit={handleSaveApp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>
                  {isNewApp ? (lang === 'tr' ? 'Yeni Uygulama Ekle' : 'Add New App') : (lang === 'tr' ? 'Uygulamayı Düzenle' : 'Edit App')}
                </h3>
                <button type="button" className="btn" onClick={() => setEditingApp(null)}>
                  {lang === 'tr' ? 'İptal' : 'Cancel'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    {lang === 'tr' ? 'Uygulama Adı' : 'App Name'}
                  </label>
                  <input 
                    type="text" required
                    value={editingApp.name} onChange={e => setEditingApp({...editingApp, name: e.target.value})}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    {lang === 'tr' ? 'Sürüm' : 'Version'}
                  </label>
                  <input 
                    type="text" 
                    value={editingApp.version} onChange={e => setEditingApp({...editingApp, version: e.target.value})}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Tagline (TR)</label>
                  <input 
                    type="text"
                    value={editingApp.tagline.tr} onChange={e => setEditingApp({...editingApp, tagline: {...editingApp.tagline, tr: e.target.value}})}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Tagline (EN)</label>
                  <input 
                    type="text"
                    value={editingApp.tagline.en} onChange={e => setEditingApp({...editingApp, tagline: {...editingApp.tagline, en: e.target.value}})}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>{lang === 'tr' ? 'Detaylı Açıklama (TR)' : 'Description (TR)'}</label>
                <textarea 
                  rows="3"
                  value={editingApp.description.tr} onChange={e => setEditingApp({...editingApp, description: {...editingApp.description, tr: e.target.value}})}
                  style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Play Store URL</label>
                  <input 
                    type="text" placeholder="https://play.google.com/store/apps/details?id=..."
                    value={editingApp.playStoreUrl || ''} onChange={e => setEditingApp({...editingApp, playStoreUrl: e.target.value})}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>GitHub URL</label>
                  <input 
                    type="text" placeholder="https://github.com/serdevir91/..."
                    value={editingApp.githubUrl || ''} onChange={e => setEditingApp({...editingApp, githubUrl: e.target.value})}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>{lang === 'tr' ? 'İkon Yolu / URL' : 'Icon Path / URL'}</label>
                <input 
                  type="text" placeholder="./apps/my_app/icon.png"
                  value={editingApp.icon} onChange={e => setEditingApp({...editingApp, icon: e.target.value})}
                  style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '14px', gap: '8px' }}>
                  <Save size={16} /> {lang === 'tr' ? 'Uygulamayı Kaydet' : 'Save App'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginTop: 0, marginBottom: '8px', color: 'var(--text-primary)' }}>
                {lang === 'tr' ? 'Profil ve Biyografi Düzenle' : 'Profile & Bio Settings'}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>{lang === 'tr' ? 'Ad Soyad' : 'Full Name'}</label>
                  <input 
                    type="text"
                    value={formData.profile.name} onChange={e => handleProfileChange('name', e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>{lang === 'tr' ? 'Unvan' : 'Title'}</label>
                  <input 
                    type="text"
                    value={formData.profile.title} onChange={e => handleProfileChange('title', e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>E-posta</label>
                  <input 
                    type="email"
                    value={formData.profile.email} onChange={e => handleProfileChange('email', e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Telefon</label>
                  <input 
                    type="text"
                    value={formData.profile.phone} onChange={e => handleProfileChange('phone', e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Biyografi (TR)</label>
                <textarea 
                  rows="4"
                  value={formData.profile.bio.tr} onChange={e => handleProfileChange('bio', e.target.value, 'tr')}
                  style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Bio (EN)</label>
                <textarea 
                  rows="4"
                  value={formData.profile.bio.en} onChange={e => handleProfileChange('bio', e.target.value, 'en')}
                  style={{ width: '100%', padding: '12px 14px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '14px', gap: '8px', width: 'fit-content' }}>
                <Save size={16} /> {lang === 'tr' ? 'Değişiklikleri Kaydet' : 'Save Changes'}
              </button>
            </form>
          )}

          {/* TAB 4: BACKUP & SYNC */}
          {activeTab === 'backup' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginTop: 0, marginBottom: '8px', color: 'var(--text-primary)' }}>
                {lang === 'tr' ? 'Yedekleme ve Senkronizasyon' : 'Backup & Data Sync'}
              </h3>

              <div style={{
                padding: '24px', background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)', borderRadius: '16px'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '8px' }}>
                  {lang === 'tr' ? 'Yedek İndir (Export JSON)' : 'Export Backup (JSON)'}
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {lang === 'tr' ? 'Tüm güncellemelerinizi `.json` dosyası olarak bilgisayarınıza indirin.' : 'Download all portfolio and App Store modifications as a single JSON file.'}
                </p>
                <button className="btn btn-primary" onClick={handleExportJSON} style={{ gap: '8px' }}>
                  <Download size={16} /> {lang === 'tr' ? 'Yedeği İndir (.json)' : 'Export Backup (.json)'}
                </button>
              </div>

              <div style={{
                padding: '24px', background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)', borderRadius: '16px'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '8px' }}>
                  {lang === 'tr' ? 'Yedek Yükle (Import JSON)' : 'Import Backup (JSON)'}
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {lang === 'tr' ? 'Başka bir cihazda oluşturduğunuz `.json` yedeğini buraya yükleyerek verilerinizi güncelleyin.' : 'Upload a JSON backup file to synchronize portfolio modifications across browsers.'}
                </p>
                <label className="btn" style={{ display: 'inline-flex', cursor: 'pointer', gap: '8px' }}>
                  <Upload size={16} /> {lang === 'tr' ? 'Yedek Dosyası Seç' : 'Choose Backup File'}
                  <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
                </label>
              </div>

              <div style={{
                padding: '24px', background: 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.25)', borderRadius: '16px'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#ef4444', marginTop: 0, marginBottom: '8px' }}>
                  {lang === 'tr' ? 'Varsayılana Sıfırla' : 'Reset to Defaults'}
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {lang === 'tr' ? 'Tüm yerel güncellemeleri siler ve ilk kaynak verilerine döner.' : 'Erases local edits and resets all portfolio data back to initial defaults.'}
                </p>
                <button className="btn" onClick={() => {
                  if (window.confirm(lang === 'tr' ? 'Tüm verileri ilk haline sıfırlamak istiyor musunuz?' : 'Reset all data to default state?')) {
                    onResetData();
                  }
                }} style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', gap: '8px' }}>
                  <RefreshCw size={16} /> {lang === 'tr' ? 'Fabrika Ayarlarına Dön' : 'Reset All Data'}
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
