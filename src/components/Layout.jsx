import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileSearch, 
  MessageSquareText, 
  UserCheck, 
  Lightbulb, 
  CalendarDays, 
  BookmarkCheck, 
  Sparkles,
  Bell,
  Search
} from 'lucide-react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Analyze Post', path: '/analyze', icon: FileSearch },
    { name: 'Reply Generator', path: '/reply', icon: MessageSquareText },
    { name: 'My Voice', path: '/voice', icon: UserCheck },
    { name: 'Content Ideas', path: '/ideas', icon: Lightbulb },
    { name: 'Content Calendar', path: '/calendar', icon: CalendarDays },
    { name: 'Saved Content', path: '/saved', icon: BookmarkCheck },
  ];

  return (
    <div style={styles.appContainer}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.brandContainer}>
          <div style={styles.logoIcon}>
            <Sparkles size={20} color="#ffffff" />
          </div>
          <h1 style={styles.brandTitle}>SocialPilot <span style={styles.brandTag}>AI</span></h1>
        </div>

        <nav style={styles.navMenu}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                style={{
                  ...styles.navItem,
                  ...(isActive ? styles.navItemActive : {})
                }}
              >
                <IconComponent size={18} style={{ marginRight: '12px' }} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.agentBadge}>
            <span style={styles.statusDot}></span>
            <span>AI Agents: Standby</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={styles.mainWrapper}>
        <header style={styles.header}>
          <div style={styles.headerSearch}>
            <Search size={16} color="#64748b" style={{ marginRight: '8px' }} />
            <input 
              type="text" 
              placeholder="Search drafts, ideas, posts..." 
              style={styles.searchInput}
            />
          </div>
          <div style={styles.headerRight}>
            <button style={styles.iconButton} aria-label="Notifications">
              <Bell size={18} color="#475569" />
            </button>
            <div style={styles.userProfile}>
              <div style={styles.avatar}>U</div>
              <span style={styles.userName}>Creator</span>
            </div>
          </div>
        </header>

        <main style={styles.contentArea}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  sidebar: {
    width: '260px',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #1e293b',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '24px 20px',
    gap: '12px',
    borderBottom: '1px solid #1e293b',
  },
  logoIcon: {
    background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    padding: '8px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontSize: '18px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
  },
  brandTag: {
    color: '#a855f7',
    fontSize: '12px',
    fontWeight: '600',
    verticalAlign: 'super',
  },
  navMenu: {
    padding: '20px 12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: 1,
    overflowY: 'auto',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 14px',
    color: '#94a3b8',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s ease',
  },
  navItemActive: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
    fontWeight: '600',
  },
  sidebarFooter: {
    padding: '16px 20px',
    borderTop: '1px solid #1e293b',
  },
  agentBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '12px',
    color: '#94a3b8',
    background: '#1e293b',
    padding: '8px 12px',
    borderRadius: '6px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)',
  },
  mainWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8fafc',
    overflow: 'hidden',
  },
  header: {
    height: '70px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
  },
  headerSearch: {
    display: 'flex',
    alignItems: 'center',
    background: '#f1f5f9',
    padding: '8px 14px',
    borderRadius: '8px',
    width: '320px',
  },
  searchInput: {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: '14px',
    width: '100%',
    color: '#0f172a',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  iconButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '600',
    fontSize: '14px',
  },
  userName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
  },
  contentArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '32px',
  }
};