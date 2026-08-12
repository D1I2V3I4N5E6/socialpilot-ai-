import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Edit3, 
  Lightbulb, 
  PlusCircle, 
  FileSearch, 
  MessageSquarePlus, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';

export default function Dashboard() {
  // Mock data for version 1 dashboard
  const stats = [
    { title: 'Posts Created', count: 12, icon: FileText, color: '#6366f1', bg: '#eef2ff' },
    { title: 'Saved Drafts', count: 5, icon: Edit3, color: '#f59e0b', bg: '#fef3c7' },
    { title: 'Saved Ideas', count: 18, icon: Lightbulb, color: '#10b981', bg: '#ecfdf5' },
  ];

  const recentActivities = [
    { id: 1, type: 'Approved', title: 'Why Web Development Needs Simplicity', time: '2 hours ago', status: 'Approved' },
    { id: 2, type: 'Draft', title: 'Reflections on Building AI Workflows', time: '5 hours ago', status: 'Needs Review' },
    { id: 3, type: 'Published', title: 'The Power of Consistent Writing Habits', time: 'Yesterday', status: 'Published' },
  ];

  return (
    <div style={styles.container}>
      {/* Welcome Banner */}
      <div style={styles.welcomeCard}>
        <div>
          <h2 style={styles.welcomeTitle}>Welcome back, Creator 👋</h2>
          <p style={styles.welcomeSubtitle}>
            Your AI assistant is ready to help you craft meaningful content today. Human review is active.
          </p>
        </div>
        <div style={styles.taskCard}>
          <span style={styles.taskLabel}>Today's Content Task</span>
          <p style={styles.taskText}>Draft a thread on practical web development learnings.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div style={styles.statsGrid}>
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} style={styles.statCard}>
              <div style={{ ...styles.statIconWrapper, backgroundColor: stat.bg, color: stat.color }}>
                <IconComponent size={20} />
              </div>
              <div>
                <span style={styles.statTitle}>{stat.title}</span>
                <h3 style={styles.statCount}>{stat.count}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Buttons */}
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>Quick Actions</h3>
      </div>
      <div style={styles.quickActionsGrid}>
        <Link to="/analyze" style={styles.actionCard}>
          <div style={styles.actionIconBg}><FileSearch size={20} color="#6366f1" /></div>
          <div>
            <h4 style={styles.actionTitle}>Analyze Post</h4>
            <p style={styles.actionDesc}>Extract angles and key takeaways</p>
          </div>
          <ArrowUpRight size={16} color="#94a3b8" style={{ marginLeft: 'auto' }} />
        </Link>

        <Link to="/reply" style={styles.actionCard}>
          <div style={styles.actionIconBg}><MessageSquarePlus size={20} color="#a855f7" /></div>
          <div>
            <h4 style={styles.actionTitle}>Generate Reply</h4>
            <p style={styles.actionDesc}>Write thoughtful responses in your voice</p>
          </div>
          <ArrowUpRight size={16} color="#94a3b8" style={{ marginLeft: 'auto' }} />
        </Link>

        <Link to="/ideas" style={styles.actionCard}>
          <div style={styles.actionIconBg}><Lightbulb size={20} color="#10b981" /></div>
          <div>
            <h4 style={styles.actionTitle}>Content Ideas</h4>
            <p style={styles.actionDesc}>Explore fresh topics across categories</p>
          </div>
          <ArrowUpRight size={16} color="#94a3b8" style={{ marginLeft: 'auto' }} />
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>Recent Activity & Approvals</h3>
      </div>
      <div style={styles.activityTableCard}>
        {recentActivities.map((item) => (
          <div key={item.id} style={styles.activityRow}>
            <div style={styles.activityInfo}>
              <CheckCircle2 size={18} color="#10b981" />
              <div>
                <h5 style={styles.activityItemTitle}>{item.title}</h5>
                <span style={styles.activityTime}>{item.time}</span>
              </div>
            </div>
            <div>
              <span style={{
                ...styles.statusBadge,
                ...(item.status === 'Approved' ? styles.badgeApproved : 
                    item.status === 'Published' ? styles.badgePublished : styles.badgeReview)
              }}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '28px',
  },
  welcomeCard: {
    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    borderRadius: '16px',
    padding: '32px',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.08)',
  },
  welcomeTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '8px',
  },
  welcomeSubtitle: {
    fontSize: '14px',
    color: '#94a3b8',
    maxWidth: '500px',
    lineHeight: '1.5',
  },
  taskCard: {
    background: 'rgba(255, 255, 255, 0.06)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '16px 20px',
    maxWidth: '300px',
  },
  taskLabel: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#a855f7',
    fontWeight: '700',
    display: 'block',
    marginBottom: '6px',
  },
  taskText: {
    fontSize: '13px',
    color: '#e2e8f0',
    lineHeight: '1.4',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  },
  statIconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statTitle: {
    fontSize: '13px',
    color: '#64748b',
    fontWeight: '500',
    display: 'block',
    marginBottom: '4px',
  },
  statCount: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0f172a',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: '-0.3px',
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '16px',
  },
  actionCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    textDecoration: 'none',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  },
  actionIconBg: {
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    display: 'flex',
  },
  actionTitle: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: '2px',
  },
  actionDesc: {
    fontSize: '12px',
    color: '#64748b',
  },
  activityTableCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    padding: '8px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  },
  activityRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 0',
    borderBottom: '1px solid #f1f5f9',
  },
  activityInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  activityItemTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '2px',
  },
  activityTime: {
    fontSize: '12px',
    color: '#94a3b8',
  },
  statusBadge: {
    fontSize: '11px',
    fontWeight: '600',
    padding: '4px 10px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.3px',
  },
  badgeApproved: {
    backgroundColor: '#ecfdf5',
    color: '#059669',
  },
  badgePublished: {
    backgroundColor: '#eff6ff',
    color: '#2563eb',
  },
  badgeReview: {
    backgroundColor: '#fef3c7',
    color: '#d97706',
  }
};