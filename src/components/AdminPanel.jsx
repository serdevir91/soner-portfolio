import React, { useState } from 'react';
import { 
  X, Save, Plus, Trash2, Edit3, Download, Upload, RefreshCw, 
  User, ShoppingBag, ShieldCheck, Check, PlusCircle
} from 'lucide-react';

const AdminPanel = ({ isOpen, onClose, data, onSaveData, onResetData, lang }) => {
  const [activeTab, setActiveTab] = useState('apps'); // 'profile', 'apps', 'backup'
  const [formData, setFormData] = useState(data);

  // App Editor state
  const [editingApp, setEditingApp] = useState(null); // null or app object
  const [isNewApp, setIsNewApp] = useState(false);

  if (!isOpen) return null;

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
    alert(lang === 'tr' ? 'Profil bilgileri kaydedildi!' : 'Profile saved successfully!');
  };

  // Apps Management
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
        features: { en: ['Fast & Secure'], tr: ['Hızlı ve Güvenli'] },
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
    if (window.confirm(lang === 'tr' ? 'Bu uygulamayı silmek istediğinize emin misiniz?' : 'Are you sure you want to delete this app?')) {
      const updatedApps = formData.apps.filter(a => a.id !== appId);
      const newPortfolioData = { ...formData, apps: updatedApps };
      setFormData(newPortfolioData);
      onSaveData(newPortfolioData);
    }
  };

  // Export JSON backup
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

  // Import JSON backup
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
          alert(lang === 'tr' ? 'Yedek başarıyla içe aktarıldı!' : 'Backup imported successfully!');
        } else {
          alert(lang === 'tr' ? 'Geçersiz yedek dosyası formatı!' : 'Invalid backup file format!');
        }
      } catch (err) {
        alert(lang === 'tr' ? 'JSON okuma hatası!' : 'JSON parse error!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="store-modal-overlay no-print" onClick={onClose} style={{ zIndex: 1100 }}>
      <div className="store-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '850px', width: '90%', maxHeight: '90vh' }}>
        
        {/* MODAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldCheck size={24} style={{ color: '#3b82f6' }} />
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary)' }}>
                {lang === 'tr' ? 'Admin Paneli' : 'Admin Panel'}
              </h2>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {lang === 'tr' ? 'Giriş Yapıldı: serdevir' : 'Logged in as: serdevir'}
              </span>
            </div>
          </div>
          <button className="store-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* ADMIN TAB NAVIGATION */}
        <div className="segmented-control" style={{ margin: '20px 0' }}>
          <button 
            className={`segment-btn ${activeTab === 'apps' ? 'active' : ''}`}
            onClick={() => { setActiveTab('apps'); setEditingApp(null); }}
          >
            <ShoppingBag size={14} style={{ marginRight: '6px' }} />
            {lang === 'tr' ? 'App Store Yönetimi' : 'App Store Manager'}
          </button>
          <button 
            className={`segment-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => { setActiveTab('profile'); setEditingApp(null); }}
          >
            <User size={14} style={{ marginRight: '6px' }} />
            {lang === 'tr' ? 'Profil Düzenle' : 'Edit Profile'}
          </button>
          <button 
            className={`segment-btn ${activeTab === 'backup' ? 'active' : ''}`}
            onClick={() => { setActiveTab('backup'); setEditingApp(null); }}
          >
            <Download size={14} style={{ marginRight: '6px' }} />
            {lang === 'tr' ? 'Yedek & Senkronizasyon' : 'Backup & Sync'}
          </button>
        </div>

        {/* BODY CONTENT AREA */}
        <div style={{ overflowY: 'auto', maxHeight: 'calc(90vh - 180px)', paddingRight: '6px' }}>

          {/* TAB 1: APP STORE MANAGER */}
          {activeTab === 'apps' && !editingApp && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: 'var(--text-primary)', margin: 0 }}>
                  {lang === 'tr' ? `Mağazadaki Uygulamalar (${formData.apps.length})` : `Store Apps (${formData.apps.length})`}
                </h3>
                <button className="btn btn-primary" onClick={() => handleOpenAppForm(null)} style={{ padding: '8px 14px', fontSize: '13px' }}>
                  <PlusCircle size={16} /> {lang === 'tr' ? 'Yeni Uygulama Ekle' : 'Add New App'}
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {formData.apps.map(app => (
                  <div key={app.id} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '14px 18px', background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-color)', borderRadius: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img 
                        src={app.icon} 
                        alt={app.name}
                        onError={(e) => { e.target.style.display = 'none'; }}
                        style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover', background: '#2563eb' }}
                      />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)' }}>{app.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                          {app.category[lang] || app.category.tr} • v{app.version}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn" onClick={() => handleOpenAppForm(app)} title="Edit">
                        <Edit3 size={15} />
                      </button>
                      <button className="btn" onClick={() => handleDeleteApp(app.id)} style={{ color: '#ef4444' }} title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* APP EDIT / ADD FORM */}
          {activeTab === 'apps' && editingApp && (
            <form onSubmit={handleSaveApp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', margin: 0 }}>
                  {isNewApp ? (lang === 'tr' ? 'Yeni Uygulama Ekle' : 'Add New App') : (lang === 'tr' ? 'Uygulamayı Düzenle' : 'Edit App')}
                </h3>
                <button type="button" className="btn" onClick={() => setEditingApp(null)}>
                  {lang === 'tr' ? 'İptal' : 'Cancel'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label">{lang === 'tr' ? 'Uygulama Adı' : 'App Name'}</label>
                  <input 
                    type="text" className="form-input"
                    value={editingApp.name} onChange={e => setEditingApp({...editingApp, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">{lang === 'tr' ? 'Sürüm' : 'Version'}</label>
                  <input 
                    type="text" className="form-input"
                    value={editingApp.version} onChange={e => setEditingApp({...editingApp, version: e.target.value})}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label">Tagline (TR)</label>
                  <input 
                    type="text" className="form-input"
                    value={editingApp.tagline.tr} onChange={e => setEditingApp({...editingApp, tagline: {...editingApp.tagline, tr: e.target.value}})}
                  />
                </div>
                <div>
                  <label className="form-label">Tagline (EN)</label>
                  <input 
                    type="text" className="form-input"
                    value={editingApp.tagline.en} onChange={e => setEditingApp({...editingApp, tagline: {...editingApp.tagline, en: e.target.value}})}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">{lang === 'tr' ? 'Açıklama (TR)' : 'Description (TR)'}</label>
                <textarea 
                  className="form-input" rows="3"
                  value={editingApp.description.tr} onChange={e => setEditingApp({...editingApp, description: {...editingApp.description, tr: e.target.value}})}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label">Play Store URL</label>
                  <input 
                    type="text" className="form-input" placeholder="https://play.google.com/store/apps/details?id=..."
                    value={editingApp.playStoreUrl || ''} onChange={e => setEditingApp({...editingApp, playStoreUrl: e.target.value})}
                  />
                </div>
                <div>
                  <label className="form-label">GitHub URL</label>
                  <input 
                    type="text" className="form-input" placeholder="https://github.com/serdevir91/..."
                    value={editingApp.githubUrl || ''} onChange={e => setEditingApp({...editingApp, githubUrl: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">{lang === 'tr' ? 'İkon Yolu / URL' : 'Icon Path / URL'}</label>
                <input 
                  type="text" className="form-input" placeholder="./apps/my_app/icon.png"
                  value={editingApp.icon} onChange={e => setEditingApp({...editingApp, icon: e.target.value})}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '10px', justifyContent: 'center' }}>
                  <Save size={16} /> {lang === 'tr' ? 'Uygulamayı Kaydet' : 'Save App'}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: PROFILE EDITOR */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label">{lang === 'tr' ? 'Ad Soyad' : 'Full Name'}</label>
                  <input 
                    type="text" className="form-input"
                    value={formData.profile.name} onChange={e => handleProfileChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">{lang === 'tr' ? 'Unvan' : 'Title'}</label>
                  <input 
                    type="text" className="form-input"
                    value={formData.profile.title} onChange={e => handleProfileChange('title', e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label className="form-label">E-posta</label>
                  <input 
                    type="email" className="form-input"
                    value={formData.profile.email} onChange={e => handleProfileChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <label className="form-label">Telefon</label>
                  <input 
                    type="text" className="form-input"
                    value={formData.profile.phone} onChange={e => handleProfileChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Biyografi (TR)</label>
                <textarea 
                  className="form-input" rows="3"
                  value={formData.profile.bio.tr} onChange={e => handleProfileChange('bio', e.target.value, 'tr')}
                />
              </div>

              <div>
                <label className="form-label">Bio (EN)</label>
                <textarea 
                  className="form-input" rows="3"
                  value={formData.profile.bio.en} onChange={e => handleProfileChange('bio', e.target.value, 'en')}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ padding: '10px', justifyContent: 'center' }}>
                <Save size={16} /> {lang === 'tr' ? 'Değişiklikleri Kaydet' : 'Save Changes'}
              </button>
            </form>
          )}

          {/* TAB 3: BACKUP & SYNC */}
          {activeTab === 'backup' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                padding: '20px', background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)', borderRadius: '12px'
              }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', marginTop: 0, marginBottom: '8px' }}>
                  {lang === 'tr' ? 'Yedek İndir (Export JSON)' : 'Export Backup (JSON)'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  {lang === 'tr' ? 'Düzenlediğiniz tüm profil ve uygulama verilerini bilgisayarınıza indirip yedekleyin.' : 'Download all modified portfolio and app store data as a JSON file.'}
                </p>
                <button className="btn btn-primary" onClick={handleExportJSON}>
                  <Download size={16} /> {lang === 'tr' ? 'Yedeği İndir (.json)' : 'Export Backup (.json)'}
                </button>
              </div>

              <div style={{
                padding: '20px', background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-color)', borderRadius: '12px'
              }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', marginTop: 0, marginBottom: '8px' }}>
                  {lang === 'tr' ? 'Yedek Yükle (Import JSON)' : 'Import Backup (JSON)'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  {lang === 'tr' ? 'Başka bir cihazda düzenlediğiniz yedek dosyasını buraya yükleyerek verilerinizi güncelleyin.' : 'Upload a portfolio backup JSON file to sync content on this device.'}
                </p>
                <label className="btn" style={{ display: 'inline-flex', cursor: 'pointer' }}>
                  <Upload size={16} /> {lang === 'tr' ? 'Yedek Dosyası Seç' : 'Choose Backup File'}
                  <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
                </label>
              </div>

              <div style={{
                padding: '20px', background: 'rgba(239, 68, 68, 0.06)',
                border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px'
              }}>
                <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ef4444', marginTop: 0, marginBottom: '8px' }}>
                  {lang === 'tr' ? 'Varsayılana Sıfırla' : 'Reset to Defaults'}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  {lang === 'tr' ? 'Tüm yerel özelleştirmeleri siler ve ilk durum verilerine sıfırlar.' : 'Erases local edits and resets portfolio data to code defaults.'}
                </p>
                <button className="btn" onClick={() => {
                  if (window.confirm(lang === 'tr' ? 'Tüm verileri varsayılana sıfırlamak istiyor musunuz?' : 'Reset all data to defaults?')) {
                    onResetData();
                  }
                }} style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                  <RefreshCw size={16} /> {lang === 'tr' ? 'Fabrika Ayarlarına Dön' : 'Reset All Data'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
