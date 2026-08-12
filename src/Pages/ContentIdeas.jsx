import React, { useState } from 'react';
import { Lightbulb, Sparkles, Plus, Bookmark, Check, RefreshCw, Layers } from 'lucide-react';

export default function ContentIdeas() {
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [isGenerating, setIsGenerating] = useState(false);
  const [ideas, setIdeas] = useState([
    {
      id: 1,
      title: "Why Most Front-End Tooling Setup Fails After Week One",
      pillar: "Practical Engineering",
      hook: "We spend days configuring complex starter templates, only to realize the real bottleneck was never the tooling.",
      format: "Carousel / Thread",
      saved: false
    },
    {
      id: 2,
      title: "The Silent Cost of Over-Engineering Early-Stage Apps",
      pillar: "Systems Thinking",
      hook: "Adding microservices and heavy state management before product-market fit is a developer trap.",
      format: "Long-form Text Post",
      saved: false
    },
    {
      id: 3,
      title: "How to Build a Maintenance-Free Workflow with Vite and React",
      pillar: "Practical Engineering",
      hook: "You don't need a massive stack to ship fast. Here is a lean setup that scales without headaches.",
      format: "Code Breakdown / Tutorial",
      saved: true
    }
  ]);
  const [savedMessage, setSavedMessage] = useState(null);

  const handleGenerateIdeas = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newBatch = [
        {
          id: Date.now() + 1,
          title: "The Counter-Intuitive Approach to Writing Cleaner Component Code",
          pillar: "Practical Engineering",
          hook: "Clean code isn't about writing less code. It's about making intent obvious to the next developer who touches it.",
          format: "Short-form Insight",
          saved: false
        },
        {
          id: Date.now() + 2,
          title: "Stop Copying Tech Stacks: Designing Architectures Around Real Problems",
          pillar: "Systems Thinking",
          hook: "Every time you adopt a trendy framework just because others use it, you inherit invisible maintenance debt.",
          format: "Opinion Post / Thread",
          saved: false
        }
      ];
      setIdeas(prev => [...newBatch, ...prev]);
      setIsGenerating(false);
    }, 1200);
  };

  const toggleSave = (id) => {
    setIdeas(prev => prev.map(idea => {
      if (idea.id === id) {
        const updatedStatus = !idea.saved;
        setSavedMessage(updatedStatus ? "Idea saved to library!" : "Idea removed from saved.");
        setTimeout(() => setSavedMessage(null), 2000);
        return { ...idea, saved: updatedStatus };
      }
      return idea;
    }));
  };

  const filteredIdeas = selectedPillar === 'all' 
    ? ideas 
    : ideas.filter(idea => idea.pillar.toLowerCase() === selectedPillar.toLowerCase());

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>AI Content Ideas Engine</h2>
          <p style={styles.pageSubtitle}>
            Generate endless data-backed topics aligned with your core engineering pillars.
          </p>
        </div>
        <div style={styles.badgeContainer}>
          <Sparkles size={14} color="#a855f7" />
          <span style={styles.badgeText}>Strategist Agent Active</span>
        </div>
      </div>

      {savedMessage && (
        <div style={styles.toastNotification}>
          <Check size={14} color="#059669" />
          <span>{savedMessage}</span>
        </div>
      )}

      {/* Controls Bar */}
      <div style={styles.controlsBar}>
        <div style={styles.filterGroup}>
          <Layers size={16} color="#64748b" />
          <span style={styles.filterLabel}>Filter Pillar:</span>
          <select 
            value={selectedPillar} 
            onChange={(e) => setSelectedPillar(e.target.value)} 
            style={styles.select}
          >
            <option value="all">All Pillars</option>
            <option value="practical engineering">Practical Engineering</option>
            <option value="systems thinking">Systems Thinking</option>
          </select>
        </div>

        <button 
          onClick={handleGenerateIdeas} 
          style={{
            ...styles.primaryButton,
            opacity: isGenerating ? 0.7 : 1,
            cursor: isGenerating ? 'not-allowed' : 'pointer'
          }}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <RefreshCw size={16} style={styles.spinIcon} />
              Generating Fresh Concepts...
            </>
          ) : (
            <>
              <Lightbulb size={16} />
              Generate New Ideas
            </>
          )}
        </button>
      </div>

      {/* Ideas Grid */}
      <div style={styles.ideasGrid}>
        {filteredIdeas.map((idea) => (
          <div key={idea.id} style={styles.ideaCard}>
            <div style={styles.cardTopRow}>
              <span style={styles.pillarTag}>{idea.pillar}</span>
              <button 
                onClick={() => toggleSave(idea.id)} 
                style={{
                  ...styles.saveButton,
                  backgroundColor: idea.saved ? '#f3e8ff' : '#f8fafc',
                  borderColor: idea.saved ? '#d8b4fe' : '#cbd5e1',
                  color: idea.saved ? '#7e22ce' : '#475569'
                }}
                title={idea.saved ? "Saved" : "Save idea"}
              >
                {idea.saved ? <Check size={14} /> : <Bookmark size={14} />}
                {idea.saved ? 'Saved' : 'Save'}
              </button>
            </div>

            <h3 style={styles.ideaTitle}>{idea.title}</h3>
            
            <div style={styles.hookBox}>
              <span style={styles.hookLabel}>Suggested Hook:</span>
              <p style={styles.hookText}>"{idea.hook}"</p>
            </div>

            <div style={styles.cardFooter}>
              <span style={styles.formatBadge}>Format: {idea.format}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' },
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  pageTitle: { fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' },
  pageSubtitle: { fontSize: '14px', color: '#64748b' },
  badgeContainer: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f3e8ff', padding: '6px 12px', borderRadius: '20px', border: '1px solid #e9d5ff' },
  badgeText: { fontSize: '12px', fontWeight: '600', color: '#7e22ce' },
  toastNotification: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#ecfdf5', border: '1px solid #10b981', color: '#065f46', padding: '10px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '500', width: 'fit-content' },
  controlsBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '12px' },
  filterGroup: { display: 'flex', alignItems: 'center', gap: '8px' },
  filterLabel: { fontSize: '13px', fontWeight: '600', color: '#475569' },
  select: { padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', outline: 'none', color: '#0f172a' },
  primaryButton: { backgroundColor: '#6366f1', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '10px 18px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'background 0.2s' },
  spinIcon: { animation: 'spin 0.8s linear infinite' },
  ideasGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' },
  ideaCard: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' },
  cardTopRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  pillarTag: { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#6366f1', backgroundColor: '#eef2ff', padding: '4px 8px', borderRadius: '6px', letterSpacing: '0.5px' },
  saveButton: { display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
  ideaTitle: { fontSize: '15px', fontWeight: '600', color: '#0f172a', lineHeight: '1.4' },
  hookBox: { backgroundColor: '#f8fafc', borderLeft: '3px solid #6366f1', padding: '10px 12px', borderRadius: '0 8px 8px 0', display: 'flex', flexDirection: 'column', gap: '4px' },
  hookLabel: { fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#64748b' },
  hookText: { fontSize: '12px', color: '#334155', fontStyle: 'italic', lineHeight: '1.4' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #f1f5f9' },
  formatBadge: { fontSize: '12px', color: '#64748b', fontWeight: '500' }
};