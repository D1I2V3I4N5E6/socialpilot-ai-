import React, { useState, useEffect } from 'react';
import { CalendarDays, Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContentCalendar() {
  const [scheduledPosts, setScheduledPosts] = useState(() => {
    const saved = localStorage.getItem('socialpilot_calendar_posts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse calendar posts", e);
      }
    }
    return [
      { id: 1, title: 'Why Vite is Dominating React Build Tools', date: '2026-08-15', time: '10:00 AM', status: 'Scheduled', pillar: 'Practical Engineering' },
      { id: 2, title: 'The Blueprint for Clean State Management', date: '2026-08-18', time: '02:00 PM', status: 'Draft', pillar: 'Systems Thinking' }
    ];
  });

  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('10:00 AM');
  const [newPillar, setNewPillar] = useState('Practical Engineering');

  useEffect(() => {
    localStorage.setItem('socialpilot_calendar_posts', JSON.stringify(scheduledPosts));
  }, [scheduledPosts]);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate) return;

    const newPost = {
      id: Date.now(),
      title: newTitle,
      date: newDate,
      time: newTime,
      status: 'Scheduled',
      pillar: newPillar
    };

    setScheduledPosts(prev => [...prev, newPost]);
    setNewTitle('');
    setNewDate('');
  };

  const handleDelete = (id) => {
    setScheduledPosts(prev => prev.filter(post => post.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>Content Calendar</h2>
          <p style={styles.pageSubtitle}>Schedule, organize, and track your upcoming publishing timeline.</p>
        </div>
      </div>

      {/* Add Post Quick Form */}
      <form onSubmit={handleAddPost} style={styles.formCard}>
        <h3 style={styles.formTitle}>Schedule a New Post</h3>
        <div style={styles.formGrid}>
          <input 
            type="text" 
            placeholder="Post topic or title..." 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={styles.input}
            required
          />
          <input 
            type="date" 
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            style={styles.input}
            required
          />
          <select 
            value={newPillar}
            onChange={(e) => setNewPillar(e.target.value)}
            style={styles.input}
          >
            <option value="Practical Engineering">Practical Engineering</option>
            <option value="Systems Thinking">Systems Thinking</option>
            <option value="Career Growth">Career Growth</option>
          </select>
          <button type="submit" style={styles.addButton}>
            <Plus size={16} />
            <span>Schedule</span>
          </button>
        </div>
      </form>

      {/* Posts List */}
      <div style={styles.listContainer}>
        <h3 style={styles.listTitle}>Upcoming Schedule ({scheduledPosts.length})</h3>
        {scheduledPosts.length === 0 ? (
          <p style={styles.emptyText}>No posts scheduled yet. Add one above!</p>
        ) : (
          <div style={styles.postsGrid}>
            {scheduledPosts.map((post) => (
              <div key={post.id} style={styles.postCard}>
                <div style={styles.postHeader}>
                  <span style={styles.pillarTag}>{post.pillar}</span>
                  <span style={{
                    ...styles.statusBadge,
                    backgroundColor: post.status === 'Scheduled' ? '#ecfdf5' : '#fef9c3',
                    color: post.status === 'Scheduled' ? '#059669' : '#854d0e'
                  }}>
                    {post.status}
                  </span>
                </div>
                <h4 style={styles.postTitle}>{post.title}</h4>
                <div style={styles.postFooter}>
                  <div style={styles.dateTime}>
                    <CalendarDays size={14} color="#64748b" />
                    <span>{post.date} at {post.time}</span>
                  </div>
                  <button onClick={() => handleDelete(post.id)} style={styles.deleteBtn}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' },
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pageTitle: { fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' },
  pageSubtitle: { fontSize: '14px', color: '#64748b' },
  formCard: { backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '14px' },
  formTitle: { fontSize: '15px', fontWeight: '600', color: '#0f172a' },
  formGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '12px', alignItems: 'center' },
  input: { padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', backgroundColor: '#f8fafc' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#6366f1', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer' },
  listContainer: { display: 'flex', flexDirection: 'column', gap: '14px' },
  listTitle: { fontSize: '16px', fontWeight: '600', color: '#0f172a' },
  postsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' },
  postCard: { backgroundColor: '#ffffff', padding: '18px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' },
  postHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pillarTag: { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#6366f1', backgroundColor: '#eef2ff', padding: '4px 8px', borderRadius: '6px' },
  statusBadge: { fontSize: '11px', fontWeight: '600', padding: '4px 8px', borderRadius: '6px' },
  postTitle: { fontSize: '15px', fontWeight: '600', color: '#0f172a', lineHeight: '1.4' },
  postFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #f1f5f9' },
  dateTime: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748b' },
  deleteBtn: { background: 'transparent', border: 'none', color: '#ef4444', fontSize: '12px', fontWeight: '600', cursor: 'pointer' },
  emptyText: { fontSize: '14px', color: '#94a3b8' }
};