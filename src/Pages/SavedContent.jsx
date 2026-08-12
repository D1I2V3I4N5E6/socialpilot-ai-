import React, { useState, useEffect } from 'react';
import { BookmarkCheck, Trash2, Copy, Check } from 'lucide-react';

export default function SavedContent() {
  const [savedItems, setSavedItems] = useState(() => {
    const saved = localStorage.getItem('socialpilot_saved_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved items", e);
      }
    }
    // Default initial items if storage is empty
    return [
      {
        id: 1,
        title: "How to Build a Maintenance-Free Workflow with Vite and React",
        pillar: "Practical Engineering",
        content: "You don't need a massive stack to ship fast. Here is a lean setup that scales without headaches. Step 1: Keep your configuration minimal. Step 2: Leverage Vite's lightning-fast pre-bundling. Step 3: Avoid over-abstracting too early.",
        savedDate: "August 10, 2026",
        type: "Idea / Hook"
      },
      {
        id: 2,
        title: "The Silent Cost of Over-Engineering Early-Stage Apps",
        pillar: "Systems Thinking",
        content: "Adding microservices and heavy state management before product-market fit is a developer trap. Solve today's scaling bottleneck, not tomorrow's hypothetical traffic spike.",
        savedDate: "August 11, 2026",
        type: "Post Draft"
      }
    ];
  });

  const [copiedId, setCopiedId] = useState(null);

  // Sync changes to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('socialpilot_saved_items', JSON.stringify(savedItems));
  }, [savedItems]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>Saved Content Library</h2>
          <p style={styles.pageSubtitle}>
            Your personal vault of bookmarked ideas, high-performing hooks, and ready-to-publish post drafts.
          </p>
        </div>
        <div style={styles.badgeContainer}>
          <BookmarkCheck size={14} color="#059669" />
          <span style={styles.badgeText}>{savedItems.length} Items Stored</span>
        </div>
      </div>

      <div style={styles.grid}>
        {savedItems.length === 0 ? (
          <div style={styles.emptyState}>
            <BookmarkCheck size={40} color="#cbd5e1" />
            <p style={styles.emptyText}>Your saved library is empty. Save items from the Ideas or Generator pages!</p>
          </div>
        ) : (
          savedItems.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.pillarTag}>{item.pillar}</span>
                <span style={styles.typeBadge}>{item.type}</span>
              </div>

              <h3 style={styles.cardTitle}>{item.title}</h3>
              
              <div style={styles.contentBox}>
                <p style={styles.contentText}>{item.content}</p>
              </div>

              <div style={styles.cardFooter}>
                <span style={styles.dateText}>Saved on {item.savedDate}</span>
                
                <div style={styles.actionGroup}>
                  <button 
                    onClick={() => handleCopy(item.content, item.id)} 
                    style={styles.actionButton}
                    title="Copy content"
                  >
                    {copiedId === item.id ? <Check size={14} color="#059669" /> : <Copy size={14} color="#475569" />}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button 
                    onClick={() => handleDelete(item.id)} 
                    style={styles.deleteButton}
                    title="Remove from saved"
                  >
                    <Trash2 size={14} color="#ef4444" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' },
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  pageTitle: { fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' },
  pageSubtitle: { fontSize: '14px', color: '#64748b' },
  badgeContainer: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#ecfdf5', padding: '6px 12px', borderRadius: '20px', border: '1px solid #a7f3d0' },
  badgeText: { fontSize: '12px', fontWeight: '600', color: '#059669' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pillarTag: { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#6366f1', backgroundColor: '#eef2ff', padding: '4px 8px', borderRadius: '6px', letterSpacing: '0.5px' },
  typeBadge: { fontSize: '11px', fontWeight: '600', color: '#475569', backgroundColor: '#f1f5f9', padding: '4px 8px', borderRadius: '6px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', color: '#0f172a', lineHeight: '1.4' },
  contentBox: { backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #f1f5f9' },
  contentText: { fontSize: '13px', color: '#334155', lineHeight: '1.5' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #f1f5f9' },
  dateText: { fontSize: '11px', color: '#94a3b8', fontWeight: '500' },
  actionGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  actionButton: { display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', padding: '6px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', color: '#475569', cursor: 'pointer' },
  deleteButton: { backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', gap: '12px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', gridColumn: '1 / -1' },
  emptyText: { fontSize: '14px', color: '#94a3b8' }
};