import React, { useState } from 'react';
import { 
  ShieldCheck, User, KeyRound, LogOut, LayoutDashboard, 
  ShoppingBag, Download, Upload, RefreshCw, Save, Plus, Trash2, 
  Edit3, AlertCircle, Eye, Briefcase, GraduationCap,
  Award, BookOpen, PlusCircle, Globe, Smartphone, Languages,
  FileCheck2
} from 'lucide-react';
import { authenticateAdmin } from '../utils/auth';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialData';

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
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'profile', 'experience', 'projects', 'education', 'languages', 'certificates', 'references', 'apps', 'backup'

  // Item Editor States
  const [editingItem, setEditingItem] = useState(null);
  const [isNewItem, setIsNewItem] = useState(false);
  const [editingSection, setEditingSection] = useState('');

  // Form State with fallback merging
  const [formData, setFormData] = useState(() => {
    return {
      ...INITIAL_PORTFOLIO_DATA,
      ...data,
      profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(data?.profile || {}) },
      experience: (data?.experience && data.experience.length > 0) ? data.experience : INITIAL_PORTFOLIO_DATA.experience,
      projects: (data?.projects && data.projects.length > 0) ? data.projects : INITIAL_PORTFOLIO_DATA.projects,
      education: (data?.education && data.education.length > 0) ? data.education : INITIAL_PORTFOLIO_DATA.education,
      languages: (data?.languages && data.languages.length > 0) ? data.languages : INITIAL_PORTFOLIO_DATA.languages,
      certificates: (data?.certificates && data.certificates.length > 0) ? data.certificates : INITIAL_PORTFOLIO_DATA.certificates,
      references: (data?.references && data.references.length > 0) ? data.references : INITIAL_PORTFOLIO_DATA.references,
      apps: (data?.apps && data.apps.length > 0) ? data.apps : INITIAL_PORTFOLIO_DATA.apps,
    };
  });

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

  // Generic Section Item Handlers
  const handleSaveSectionItem = (sectionKey, item) => {
    let list = [...(formData[sectionKey] || [])];
    if (isNewItem) {
      list.push(item);
    } else {
      list = list.map(i => i.id === item.id ? item : i);
    }
    const updated = { ...formData, [sectionKey]: list };
    setFormData(updated);
    onSaveData(updated);
    setEditingItem(null);
    setEditingSection('');
  };

  const handleDeleteSectionItem = (sectionKey, itemId) => {
    if (window.confirm(lang === 'tr' ? 'Bu ögeyi silmek istediğinize emin misiniz?' : 'Are you sure you want to delete this item?')) {
      const list = (formData[sectionKey] || []).filter(i => i.id !== itemId);
      const updated = { ...formData, [sectionKey]: list };
      setFormData(updated);
      onSaveData(updated);
    }
  };

  // Open App Editor
  const handleEditApp = (app = null) => {
    setEditingSection('apps');
    if (app) {
      setEditingItem(JSON.parse(JSON.stringify(app)));
      setIsNewItem(false);
    } else {
      setEditingItem({
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
      setIsNewItem(true);
    }
  };

  const handleSaveApp = (e) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name) return;
    handleSaveSectionItem('apps', editingItem);
  };

  // Backup Handlers
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `serdevir_portfolio_full_backup_${new Date().toISOString().split('T')[0]}.json`;
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
        if (importedData.profile) {
          setFormData(importedData);
          onSaveData(importedData);
          alert(lang === 'tr' ? 'Tüm yedek verileri başarıyla yüklendi!' : 'Full backup loaded successfully!');
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
  // UNAUTHENTICATED: LOGIN SCREEN
  // ----------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div style={{
        minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px 20px'
      }}>
        <div className="dashboard-card" style={{
          width: '100%', maxWidth: '460px', padding: '40px 32px',
          boxShadow: 'var(--shadow-card)', borderRadius: '24px'
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
                    width: '100%', padding: '14px 16px 14px 46px', background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)',
                    fontSize: '15px', outline: 'none'
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
                    width: '100%', padding: '14px 16px 14px 46px', background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)',
                    fontSize: '15px', outline: 'none'
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
    <div style={{ padding: '20px 0 60px 0' }}>
      
      {/* HEADER BAR */}
      <div className="dashboard-card" style={{
        padding: '20px 24px', marginBottom: '28px',
        display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between'
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
              {lang === 'tr' ? 'Yönetici Kontrol Paneli' : 'Admin Control Center'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px', fontSize: '13px', color: '#10b981' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
              <span>{lang === 'tr' ? 'Oturum Açıldı: serdevir (Tüm Alanlar Düzenlenebilir)' : 'Authenticated as serdevir (Full Edit Mode)'}</span>
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

      {/* SIDEBAR + MAIN CONTENT GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px' }}>
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="dashboard-card" style={{ padding: '16px 12px', height: 'fit-content' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button 
              className={`btn ${activeTab === 'overview' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('overview'); setEditingItem(null); setEditingSection(''); }}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: '14px' }}
            >
              <LayoutDashboard size={17} /> {lang === 'tr' ? 'Genel Bakış' : 'Overview'}
            </button>

            <button 
              className={`btn ${activeTab === 'profile' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('profile'); setEditingItem(null); setEditingSection(''); }}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: '14px' }}
            >
              <User size={17} /> {lang === 'tr' ? 'Profil & Biyografi' : 'Profile & Bio'}
            </button>

            <button 
              className={`btn ${activeTab === 'experience' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('experience'); setEditingItem(null); setEditingSection(''); }}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: '14px' }}
            >
              <Briefcase size={17} /> {lang === 'tr' ? 'İş Deneyimleri' : 'Experience'}
            </button>

            <button 
              className={`btn ${activeTab === 'projects' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('projects'); setEditingItem(null); setEditingSection(''); }}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: '14px' }}
            >
              <Award size={17} /> {lang === 'tr' ? 'Projeler & Liderlik' : 'Projects'}
            </button>

            <button 
              className={`btn ${activeTab === 'education' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('education'); setEditingItem(null); setEditingSection(''); }}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: '14px' }}
            >
              <GraduationCap size={17} /> {lang === 'tr' ? 'Eğitim Geçmişi' : 'Education'}
            </button>

            <button 
              className={`btn ${activeTab === 'languages' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('languages'); setEditingItem(null); setEditingSection(''); }}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: '14px' }}
            >
              <Languages size={17} /> {lang === 'tr' ? 'Bilinen Diller' : 'Languages'}
            </button>

            <button 
              className={`btn ${activeTab === 'certificates' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('certificates'); setEditingItem(null); setEditingSection(''); }}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: '14px' }}
            >
              <FileCheck2 size={17} /> {lang === 'tr' ? 'Sertifikalar' : 'Certificates'}
            </button>

            <button 
              className={`btn ${activeTab === 'references' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('references'); setEditingItem(null); setEditingSection(''); }}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: '14px' }}
            >
              <BookOpen size={17} /> {lang === 'tr' ? 'Referanslar' : 'References'}
            </button>

            <button 
              className={`btn ${activeTab === 'apps' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('apps'); setEditingItem(null); setEditingSection(''); }}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: '14px' }}
            >
              <ShoppingBag size={17} /> {lang === 'tr' ? 'App Store Yöneticisi' : 'App Store Manager'}
            </button>

            <button 
              className={`btn ${activeTab === 'backup' ? 'btn-primary' : ''}`}
              onClick={() => { setActiveTab('backup'); setEditingItem(null); setEditingSection(''); }}
              style={{ justifyContent: 'flex-start', padding: '12px 14px', fontSize: '14px' }}
            >
              <Download size={17} /> {lang === 'tr' ? 'Yedek & Senkronizasyon' : 'Backup & Sync'}
            </button>
          </nav>
        </aside>

        {/* MAIN PANEL CONTENT AREA */}
        <main className="dashboard-card" style={{ padding: '32px', minHeight: '580px' }}>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginTop: 0, marginBottom: '20px', color: 'var(--text-primary)' }}>
                {lang === 'tr' ? 'Sistem & Düzenleme Özeti' : 'System & Editing Overview'}
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <div style={{ padding: '18px', background: 'rgba(59, 130, 246, 0.08)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#3b82f6', marginBottom: '8px' }}>
                    <Briefcase size={22} />
                    <span style={{ fontSize: '22px', fontWeight: '800' }}>{(formData.experience || []).length}</span>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)' }}>İş Deneyimi</div>
                </div>

                <div style={{ padding: '18px', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.2)', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8b5cf6', marginBottom: '8px' }}>
                    <Award size={22} />
                    <span style={{ fontSize: '22px', fontWeight: '800' }}>{(formData.projects || []).length}</span>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)' }}>Proje & Liderlik</div>
                </div>

                <div style={{ padding: '18px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', marginBottom: '8px' }}>
                    <GraduationCap size={22} />
                    <span style={{ fontSize: '22px', fontWeight: '800' }}>{(formData.education || []).length}</span>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)' }}>Eğitim</div>
                </div>

                <div style={{ padding: '18px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f59e0b', marginBottom: '8px' }}>
                    <FileCheck2 size={22} />
                    <span style={{ fontSize: '22px', fontWeight: '800' }}>{(formData.certificates || []).length}</span>
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)' }}>Sertifikalar</div>
                </div>
              </div>

              <div style={{
                padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                borderRadius: '16px', lineHeight: 1.6
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '10px', color: 'var(--text-primary)' }}>
                  ✨ {lang === 'tr' ? 'Tam Yetkili Yönetim Modu' : 'Full Control Mode'}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
                  {lang === 'tr' 
                    ? 'Sol menüdeki tüm sekmeler aktif hale getirildi. İş Deneyimleriniz, Projeleriniz, Eğitim Geçmişiniz, Bilinen Diller, Sertifikalarınız, Referanslarınız ve App Store Uygulamalarınızın tamamını canlı olarak düzenleyebilirsiniz.'
                    : 'All tabs in the sidebar are now fully populated and active. Manage Experience, Projects, Education, Languages, Certificates, References, and App Store apps seamlessly.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & BIO */}
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
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>{lang === 'tr' ? 'Unvan' : 'Title'}</label>
                  <input 
                    type="text"
                    value={formData.profile.title} onChange={e => handleProfileChange('title', e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>E-posta</label>
                  <input 
                    type="email"
                    value={formData.profile.email} onChange={e => handleProfileChange('email', e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Telefon</label>
                  <input 
                    type="text"
                    value={formData.profile.phone} onChange={e => handleProfileChange('phone', e.target.value)}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Biyografi (TR)</label>
                <textarea 
                  rows="4"
                  value={formData.profile.bio.tr} onChange={e => handleProfileChange('bio', e.target.value, 'tr')}
                  style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Bio (EN)</label>
                <textarea 
                  rows="4"
                  value={formData.profile.bio.en} onChange={e => handleProfileChange('bio', e.target.value, 'en')}
                  style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '14px', gap: '8px', width: 'fit-content' }}>
                <Save size={16} /> {lang === 'tr' ? 'Profil Değişikliklerini Kaydet' : 'Save Profile Changes'}
              </button>
            </form>
          )}

          {/* TAB 3: WORK EXPERIENCE EDITOR */}
          {activeTab === 'experience' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  {lang === 'tr' ? 'İş Deneyimleri Yönetimi' : 'Work Experience Management'}
                </h3>
                <button className="btn btn-primary" onClick={() => {
                  setEditingItem({
                    id: `exp_${Date.now()}`,
                    role: { tr: '', en: '' },
                    company: '',
                    date: '',
                    bullets: { tr: [''], en: [''] }
                  });
                  setIsNewItem(true);
                  setEditingSection('experience');
                }} style={{ gap: '8px' }}>
                  <PlusCircle size={16} /> {lang === 'tr' ? 'Yeni Deneyim Ekle' : 'Add Experience'}
                </button>
              </div>

              {editingItem && editingSection === 'experience' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Unvan / Rol</label>
                      <input 
                        type="text"
                        value={typeof editingItem.role === 'object' ? (editingItem.role.tr || editingItem.role.en || '') : editingItem.role}
                        onChange={e => setEditingItem({
                          ...editingItem,
                          role: { tr: e.target.value, en: e.target.value }
                        })}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Şirket / Kurum</label>
                      <input 
                        type="text"
                        value={editingItem.company} onChange={e => setEditingItem({...editingItem, company: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Tarih Aralığı (Örn: Şubat 2025 – Haziran 2025)</label>
                    <input 
                      type="text"
                      value={editingItem.date} onChange={e => setEditingItem({...editingItem, date: e.target.value})}
                      style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>
                      Deneyim Maddeleri / Başarılar (Her Satıra Bir Maddelendirme)
                    </label>
                    <textarea 
                      rows="6"
                      value={Array.isArray(editingItem.bullets?.tr) ? editingItem.bullets.tr.join('\n') : (Array.isArray(editingItem.bullets) ? editingItem.bullets.join('\n') : '')}
                      onChange={e => {
                        const lines = e.target.value.split('\n');
                        setEditingItem({
                          ...editingItem,
                          bullets: {
                            tr: lines,
                            en: lines
                          }
                        });
                      }}
                      style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button className="btn btn-primary" onClick={() => handleSaveSectionItem('experience', editingItem)}>
                      <Save size={16} /> {lang === 'tr' ? 'Deneyimi Kaydet' : 'Save Experience'}
                    </button>
                    <button className="btn" onClick={() => { setEditingItem(null); setEditingSection(''); }}>İptal</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(formData.experience || INITIAL_PORTFOLIO_DATA.experience).map(item => (
                    <div key={item.id} style={{
                      padding: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
                    }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-primary)' }}>
                          {typeof item.role === 'object' ? (item.role.tr || item.role.en) : item.role}
                        </div>
                        <div style={{ color: '#3b82f6', fontWeight: '600', fontSize: '14px', margin: '4px 0' }}>{item.company}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{item.date}</div>
                        <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                          {(item.bullets?.tr || item.bullets || []).map((b, idx) => (
                            <li key={idx} style={{ marginBottom: '4px' }}>{b}</li>
                          ))}
                        </ul>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn" onClick={() => { setEditingItem(item); setIsNewItem(false); setEditingSection('experience'); }}><Edit3 size={15} /></button>
                        <button className="btn" onClick={() => handleDeleteSectionItem('experience', item.id)} style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: PROJECTS EDITOR */}
          {activeTab === 'projects' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  {lang === 'tr' ? 'Projeler & Liderlik Rolleri' : 'Projects & Leadership Roles'}
                </h3>
                <button className="btn btn-primary" onClick={() => {
                  setEditingItem({ id: `proj_${Date.now()}`, title: '', role: '', company: '', date: '', bullets: { tr: [''], en: [''] } });
                  setIsNewItem(true);
                  setEditingSection('projects');
                }} style={{ gap: '8px' }}>
                  <PlusCircle size={16} /> {lang === 'tr' ? 'Yeni Proje Ekle' : 'Add Project'}
                </button>
              </div>

              {editingItem && editingSection === 'projects' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Proje Başlığı</label>
                    <input 
                      type="text"
                      value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                      style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Rol</label>
                      <input 
                        type="text"
                        value={editingItem.role} onChange={e => setEditingItem({...editingItem, role: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Kurum / Organizasyon</label>
                      <input 
                        type="text"
                        value={editingItem.company} onChange={e => setEditingItem({...editingItem, company: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button className="btn btn-primary" onClick={() => handleSaveSectionItem('projects', editingItem)}>
                      <Save size={16} /> Kaydet
                    </button>
                    <button className="btn" onClick={() => { setEditingItem(null); setEditingSection(''); }}>İptal</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(formData.projects || INITIAL_PORTFOLIO_DATA.projects).map(item => (
                    <div key={item.id} style={{
                      padding: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
                    }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-primary)' }}>{item.title}</div>
                        <div style={{ color: '#8b5cf6', fontWeight: '600', fontSize: '14px', margin: '4px 0' }}>{item.role} • {item.company}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.date}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn" onClick={() => { setEditingItem(item); setIsNewItem(false); setEditingSection('projects'); }}><Edit3 size={15} /></button>
                        <button className="btn" onClick={() => handleDeleteSectionItem('projects', item.id)} style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: EDUCATION EDITOR */}
          {activeTab === 'education' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  {lang === 'tr' ? 'Eğitim Geçmişi' : 'Education History'}
                </h3>
                <button className="btn btn-primary" onClick={() => {
                  setEditingItem({ id: `edu_${Date.now()}`, degree: '', school: '', date: '', honors: '' });
                  setIsNewItem(true);
                  setEditingSection('education');
                }} style={{ gap: '8px' }}>
                  <PlusCircle size={16} /> {lang === 'tr' ? 'Yeni Eğitim Ekle' : 'Add Education'}
                </button>
              </div>

              {editingItem && editingSection === 'education' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Derece / Program</label>
                      <input 
                        type="text"
                        value={editingItem.degree} onChange={e => setEditingItem({...editingItem, degree: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Okul / Akademi</label>
                      <input 
                        type="text"
                        value={editingItem.school} onChange={e => setEditingItem({...editingItem, school: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Tarih / Mezuniyet</label>
                      <input 
                        type="text"
                        value={editingItem.date} onChange={e => setEditingItem({...editingItem, date: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Derece / Başarı Notu</label>
                      <input 
                        type="text"
                        value={editingItem.honors} onChange={e => setEditingItem({...editingItem, honors: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button className="btn btn-primary" onClick={() => handleSaveSectionItem('education', editingItem)}>
                      <Save size={16} /> Kaydet
                    </button>
                    <button className="btn" onClick={() => { setEditingItem(null); setEditingSection(''); }}>İptal</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(formData.education || INITIAL_PORTFOLIO_DATA.education).map(item => (
                    <div key={item.id} style={{
                      padding: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
                    }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-primary)' }}>{item.degree}</div>
                        <div style={{ color: '#10b981', fontWeight: '600', fontSize: '14px', margin: '4px 0' }}>{item.school}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.date} {item.honors && `• ${item.honors}`}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn" onClick={() => { setEditingItem(item); setIsNewItem(false); setEditingSection('education'); }}><Edit3 size={15} /></button>
                        <button className="btn" onClick={() => handleDeleteSectionItem('education', item.id)} style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: LANGUAGES EDITOR */}
          {activeTab === 'languages' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  {lang === 'tr' ? 'Bilinen Yabancı Diller' : 'Known Languages'}
                </h3>
                <button className="btn btn-primary" onClick={() => {
                  setEditingItem({ id: `lang_${Date.now()}`, name: '', level: '' });
                  setIsNewItem(true);
                  setEditingSection('languages');
                }} style={{ gap: '8px' }}>
                  <PlusCircle size={16} /> {lang === 'tr' ? 'Yeni Dil Ekle' : 'Add Language'}
                </button>
              </div>

              {editingItem && editingSection === 'languages' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Dil Adı (Örn: İngilizce)</label>
                      <input 
                        type="text"
                        value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Seviye / Yetkinlik (Örn: B2+ İleri Düzey)</label>
                      <input 
                        type="text"
                        value={editingItem.level} onChange={e => setEditingItem({...editingItem, level: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button className="btn btn-primary" onClick={() => handleSaveSectionItem('languages', editingItem)}>
                      <Save size={16} /> Kaydet
                    </button>
                    <button className="btn" onClick={() => { setEditingItem(null); setEditingSection(''); }}>İptal</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(formData.languages || INITIAL_PORTFOLIO_DATA.languages).map(item => (
                    <div key={item.id} style={{
                      padding: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-primary)' }}>{item.name}</div>
                        <div style={{ color: '#3b82f6', fontWeight: '600', fontSize: '14px', marginTop: '4px' }}>{item.level}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn" onClick={() => { setEditingItem(item); setIsNewItem(false); setEditingSection('languages'); }}><Edit3 size={15} /></button>
                        <button className="btn" onClick={() => handleDeleteSectionItem('languages', item.id)} style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: CERTIFICATES EDITOR */}
          {activeTab === 'certificates' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  {lang === 'tr' ? 'Sertifikalar ve Başarı Belgeleri' : 'Certificates & Awards'}
                </h3>
                <button className="btn btn-primary" onClick={() => {
                  setEditingItem({ id: `cert_${Date.now()}`, title: '', issuer: '', date: '', credentialUrl: '' });
                  setIsNewItem(true);
                  setEditingSection('certificates');
                }} style={{ gap: '8px' }}>
                  <PlusCircle size={16} /> {lang === 'tr' ? 'Yeni Sertifika Ekle' : 'Add Certificate'}
                </button>
              </div>

              {editingItem && editingSection === 'certificates' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Sertifika / Başarı Belgesi Adı</label>
                    <input 
                      type="text"
                      value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                      style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Veren Kurum / Organizasyon</label>
                      <input 
                        type="text"
                        value={editingItem.issuer} onChange={e => setEditingItem({...editingItem, issuer: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Tarih / Yıl</label>
                      <input 
                        type="text"
                        value={editingItem.date} onChange={e => setEditingItem({...editingItem, date: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button className="btn btn-primary" onClick={() => handleSaveSectionItem('certificates', editingItem)}>
                      <Save size={16} /> Kaydet
                    </button>
                    <button className="btn" onClick={() => { setEditingItem(null); setEditingSection(''); }}>İptal</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(formData.certificates || INITIAL_PORTFOLIO_DATA.certificates).map(item => (
                    <div key={item.id} style={{
                      padding: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-primary)' }}>{item.title}</div>
                        <div style={{ color: '#f59e0b', fontWeight: '600', fontSize: '14px', marginTop: '4px' }}>{item.issuer} • {item.date}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn" onClick={() => { setEditingItem(item); setIsNewItem(false); setEditingSection('certificates'); }}><Edit3 size={15} /></button>
                        <button className="btn" onClick={() => handleDeleteSectionItem('certificates', item.id)} style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: REFERENCES EDITOR */}
          {activeTab === 'references' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>
                  {lang === 'tr' ? 'Referanslar Yönetimi' : 'References Management'}
                </h3>
                <button className="btn btn-primary" onClick={() => {
                  setEditingItem({ id: `ref_${Date.now()}`, name: '', title: '', phone: '', email: '', profileUrl: '' });
                  setIsNewItem(true);
                  setEditingSection('references');
                }} style={{ gap: '8px' }}>
                  <PlusCircle size={16} /> {lang === 'tr' ? 'Yeni Referans Ekle' : 'Add Reference'}
                </button>
              </div>

              {editingItem && editingSection === 'references' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Ad Soyad & Unvan</label>
                      <input 
                        type="text"
                        value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Bölüm / Kurum</label>
                      <input 
                        type="text"
                        value={editingItem.title} onChange={e => setEditingItem({...editingItem, title: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>E-posta</label>
                      <input 
                        type="email"
                        value={editingItem.email} onChange={e => setEditingItem({...editingItem, email: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px' }}>Telefon</label>
                      <input 
                        type="text"
                        value={editingItem.phone} onChange={e => setEditingItem({...editingItem, phone: e.target.value})}
                        style={{ width: '100%', padding: '12px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <button className="btn btn-primary" onClick={() => handleSaveSectionItem('references', editingItem)}>
                      <Save size={16} /> Kaydet
                    </button>
                    <button className="btn" onClick={() => { setEditingItem(null); setEditingSection(''); }}>İptal</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {(formData.references || INITIAL_PORTFOLIO_DATA.references).map(item => (
                    <div key={item.id} style={{
                      padding: '20px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
                      borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
                    }}>
                      <div>
                        <div style={{ fontWeight: '800', fontSize: '16px', color: 'var(--text-primary)' }}>{item.name}</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.email} • {item.phone}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn" onClick={() => { setEditingItem(item); setIsNewItem(false); setEditingSection('references'); }}><Edit3 size={15} /></button>
                        <button className="btn" onClick={() => handleDeleteSectionItem('references', item.id)} style={{ color: '#ef4444' }}><Trash2 size={15} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 9: APP STORE MANAGER */}
          {activeTab === 'apps' && editingSection !== 'apps' && (
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
                <button className="btn btn-primary" onClick={() => handleEditApp(null)} style={{ gap: '8px', padding: '10px 18px' }}>
                  <PlusCircle size={18} /> {lang === 'tr' ? 'Yeni Uygulama Ekle' : 'Add New App'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {(formData.apps || INITIAL_PORTFOLIO_DATA.apps).map(app => (
                  <div key={app.id} style={{
                    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
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
                            {app.category ? (app.category[lang] || app.category.tr || app.category) : 'App'} • v{app.version}
                          </div>
                        </div>
                      </div>

                      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                        {app.tagline ? (app.tagline[lang] || app.tagline.tr || app.tagline) : ''}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
                      <button className="btn" onClick={() => handleEditApp(app)} style={{ flex: 1, gap: '6px', justifyContent: 'center' }}>
                        <Edit3 size={14} /> {lang === 'tr' ? 'Düzenle' : 'Edit'}
                      </button>
                      <button className="btn" onClick={() => handleDeleteSectionItem('apps', app.id)} style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', padding: '8px 12px' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* APP EDIT FORM */}
          {activeTab === 'apps' && editingSection === 'apps' && editingItem && (
            <form onSubmit={handleSaveApp} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>
                  {isNewItem ? (lang === 'tr' ? 'Yeni Uygulama Ekle' : 'Add New App') : (lang === 'tr' ? 'Uygulamayı Düzenle' : 'Edit App')}
                </h3>
                <button type="button" className="btn" onClick={() => { setEditingItem(null); setEditingSection(''); }}>
                  {lang === 'tr' ? 'İptal' : 'Cancel'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>{lang === 'tr' ? 'Uygulama Adı' : 'App Name'}</label>
                  <input 
                    type="text" required
                    value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>{lang === 'tr' ? 'Sürüm' : 'Version'}</label>
                  <input 
                    type="text" 
                    value={editingItem.version} onChange={e => setEditingItem({...editingItem, version: e.target.value})}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Tagline (TR)</label>
                  <input 
                    type="text"
                    value={typeof editingItem.tagline === 'object' ? (editingItem.tagline.tr || '') : editingItem.tagline} 
                    onChange={e => setEditingItem({
                      ...editingItem,
                      tagline: typeof editingItem.tagline === 'object' ? { ...editingItem.tagline, tr: e.target.value } : { tr: e.target.value, en: e.target.value }
                    })}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Tagline (EN)</label>
                  <input 
                    type="text"
                    value={typeof editingItem.tagline === 'object' ? (editingItem.tagline.en || '') : editingItem.tagline} 
                    onChange={e => setEditingItem({
                      ...editingItem,
                      tagline: typeof editingItem.tagline === 'object' ? { ...editingItem.tagline, en: e.target.value } : { tr: e.target.value, en: e.target.value }
                    })}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>Play Store URL</label>
                  <input 
                    type="text" placeholder="https://play.google.com/store/apps/details?id=..."
                    value={editingItem.playStoreUrl || ''} onChange={e => setEditingItem({...editingItem, playStoreUrl: e.target.value})}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>GitHub URL</label>
                  <input 
                    type="text" placeholder="https://github.com/serdevir91/..."
                    value={editingItem.githubUrl || ''} onChange={e => setEditingItem({...editingItem, githubUrl: e.target.value})}
                    style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>{lang === 'tr' ? 'İkon Yolu / URL' : 'Icon Path / URL'}</label>
                <input 
                  type="text" placeholder="./apps/my_app/icon.png"
                  value={editingItem.icon || ''} onChange={e => setEditingItem({...editingItem, icon: e.target.value})}
                  style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', color: 'var(--text-primary)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '14px', gap: '8px' }}>
                  <Save size={16} /> {lang === 'tr' ? 'Uygulamayı Kaydet' : 'Save App'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 10: BACKUP & SYNC */}
          {activeTab === 'backup' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <h3 style={{ fontSize: '22px', fontWeight: '800', marginTop: 0, marginBottom: '8px', color: 'var(--text-primary)' }}>
                {lang === 'tr' ? 'Yedekleme ve Senkronizasyon' : 'Backup & Data Sync'}
              </h3>

              <div style={{
                padding: '24px', background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)', borderRadius: '16px'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '8px' }}>
                  {lang === 'tr' ? 'Tüm Yedeği İndir (Export JSON)' : 'Export Full Backup (JSON)'}
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {lang === 'tr' ? 'Profil, iş deneyimleri, projeler ve App Store dahil tüm verilerinizi `.json` dosyası olarak bilgisayarınıza indirin.' : 'Download complete portfolio configuration as a single JSON file.'}
                </p>
                <button className="btn btn-primary" onClick={handleExportJSON} style={{ gap: '8px' }}>
                  <Download size={16} /> {lang === 'tr' ? 'Yedeği İndir (.json)' : 'Export Backup (.json)'}
                </button>
              </div>

              <div style={{
                padding: '24px', background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)', borderRadius: '16px'
              }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', marginTop: 0, marginBottom: '8px' }}>
                  {lang === 'tr' ? 'Yedek Yükle (Import JSON)' : 'Import Backup (JSON)'}
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                  {lang === 'tr' ? 'Başka bir cihazda oluşturduğunuz `.json` yedeğini buraya yükleyerek tüm verilerinizi güncelleyin.' : 'Upload a JSON backup file to synchronize portfolio modifications across browsers.'}
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
