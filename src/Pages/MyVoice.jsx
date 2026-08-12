import React, { useState } from 'react';
import { UserCheck, Sparkles, Plus, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function MyVoice() {
  const [writingInstructions, setWritingInstructions] = useState(() => {
    return localStorage.getItem('socialpilot_writing_instructions') || 
`My voice is simple, human, conversational, thoughtful, direct, warm, practical, curious, hopeful, and systems-minded. 
I want my writing to sound like a real person thinking deeply and sharing what I am learning—not like a corporation, professor, motivational speaker, or AI chatbot. 
I prefer simple everyday English, focusing on depth without complicated vocabulary.`;
  });
  
  const [examples, setExamples] = useState(() => {
    const saved = localStorage.getItem('socialpilot_voice_examples');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return [
      { id: 1, text: "AI literacy is good. But that's not enough. People need to use AI in their actual workflow, take ownership, and build capability rather than permanent dependency." },
      { id: 2, text: "What I find interesting is how often we chase surface-level fixes. The real question is: what system is producing this result in the first place?" }
    ];
  });

  const [newExampleText, setNewExampleText] = useState('');
  const [savedStatus, setSavedStatus] = useState(false);

  const handleAddExample = (e) => {
    e.preventDefault();
    if (!newExampleText.trim()) return;

    const newItem = {
      id: Date.now(),
      text: newExampleText.trim()
    };

    const updatedExamples = [...examples, newItem];
    setExamples(updatedExamples);
    localStorage.setItem('socialpilot_voice_examples', JSON.stringify(updatedExamples));
    setNewExampleText('');
  };

  const handleDeleteExample = (id) => {
    const updatedExamples = examples.filter(item => item.id !== id);
    setExamples(updatedExamples);
    localStorage.setItem('socialpilot_voice_examples', JSON.stringify(updatedExamples));
  };

  const handleSaveVoice = (e) => {
    e.preventDefault();
    localStorage.setItem('socialpilot_writing_instructions', writingInstructions);
    localStorage.setItem('socialpilot_voice_examples', JSON.stringify(examples));
    
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2500);
  };

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>My Writing Voice & Systems Persona</h2>
          <p style={styles.pageSubtitle}>
            Configure your AI persona to think deeply, avoid corporate buzzwords, and apply systems thinking.
          </p>
        </div>
        <div style={styles.badgeContainer}>
          <Sparkles size={14} color="#a855f7" />
          <span style={styles.badgeText}>Voice & System Agent Active</span>
        </div>
      </div>

      <form onSubmit={handleSaveVoice} style={styles.formLayout}>
        {/* General Style Instructions Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <UserCheck size={18} color="#6366f1" />
            <h3 style={styles.cardTitle}>Core Tone & Style Rules</h3>
          </div>
          <p style={styles.cardDesc}>
            Define your fundamental communication style: human, conversational, thoughtful, and plain-spoken.
          </p>

          <div style={styles.textareaWrapper}>
            <textarea
              value={writingInstructions}
              onChange={(e) => setWritingInstructions(e.target.value)}
              style={styles.textareaLarge}
              rows={5}
            />
          </div>
        </div>

        {/* Framework Rules Summary Card */}
        <div style={styles.cardGrid}>
          <div style={styles.subCard}>
            <h4 style={styles.subCardTitle}>🗣️ Conversational Phrases</h4>
            <p style={styles.subCardText}>Naturally integrate when fitting:</p>
            <ul style={styles.miniList}>
              <li>“I think…” / “The thing is…”</li>
              <li>“What I find interesting is…”</li>
              <li>“But here is the bigger question…”</li>
              <li>“This is where…” / “We need to…” / “See eh…”</li>
            </ul>
          </div>

          <div style={styles.subCard}>
            <h4 style={styles.subCardTitle}>⚙️ Kevin Hallinan Model</h4>
            <p style={styles.subCardText}>Never stop at the first obvious solution. Always ask:</p>
            <blockquote style={styles.quoteBox}>
              “That's good. But that's not enough. What comes next / underneath?”
            </blockquote>
          </div>
        </div>

        {/* What to Avoid Card */}
        <div style={styles.cardWarning}>
          <div style={styles.cardHeader}>
            <ShieldAlert size={18} color="#dc2626" />
            <h3 style={{ ...styles.cardTitle, color: '#991b1b' }}>Strictly Avoid</h3>
          </div>
          <p style={{ ...styles.cardDesc, color: '#7f1d1d' }}>
            Never let the AI sound robotic, corporate, academic, or overly motivational. Drop words like:
          </p>
          <div style={styles.tagCloud}>
            <span style={styles.forbiddenTag}>“Let's dive deep…”</span>
            <span style={styles.forbiddenTag}>“In today's rapidly evolving world…”</span>
            <span style={styles.forbiddenTag}>“Game-changing…”</span>
            <span style={styles.forbiddenTag}>“Revolutionary…”</span>
            <span style={styles.forbiddenTag}>“Unlock the power of…”</span>
            <span style={styles.forbiddenTag}>“Transform the way…”</span>
          </div>
        </div>

        {/* Previous Post Examples Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <Sparkles size={18} color="#a855f7" />
            <h3 style={styles.cardTitle}>Voice Style Examples ({examples.length})</h3>
          </div>
          <p style={styles.cardDesc}>
            Add writing samples that represent your true voice, builder mindset, and systems analysis.
          </p>

          {/* Add New Example Input */}
          <div style={styles.addExampleBox}>
            <textarea
              value={newExampleText}
              onChange={(e) => setNewExampleText(e.target.value)}
              placeholder="Paste an example of a past post you wrote..."
              style={styles.textareaSmall}
              rows={2}
            />
            <button
              type="button"
              onClick={handleAddExample}
              style={{
                ...styles.addButton,
                opacity: !newExampleText.trim() ? 0.6 : 1,
                cursor: !newExampleText.trim() ? 'not-allowed' : 'pointer'
              }}
              disabled={!newExampleText.trim()}
            >
              <Plus size={16} /> Add Example
            </button>
          </div>

          {/* List of Examples */}
          <div style={styles.examplesList}>
            {examples.length === 0 ? (
              <p style={styles.emptyText}>No examples added yet. Add examples to anchor your style.</p>
            ) : (
              examples.map((item, index) => (
                <div key={item.id} style={styles.exampleItem}>
                  <span style={styles.exampleBadge}>Example #{index + 1}</span>
                  <p style={styles.exampleText}>{item.text}</p>
                  <button
                    type="button"
                    onClick={() => handleDeleteExample(item.id)}
                    style={styles.deleteButton}
                    title="Remove example"
                  >
                    <Trash2 size={16} color="#94a3b8" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Save Bar */}
        <div style={styles.saveFooter}>
          {savedStatus && (
            <div style={styles.successToast}>
              <CheckCircle2 size={16} color="#059669" />
              <span>Voice rules and systems persona saved!</span>
            </div>
          )}
          <button type="submit" style={styles.primaryButton}>
            Save Voice Preferences
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' },
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  pageTitle: { fontSize: '22px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' },
  pageSubtitle: { fontSize: '14px', color: '#64748b' },
  badgeContainer: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f3e8ff', padding: '6px 12px', borderRadius: '20px', border: '1px solid #e9d5ff' },
  badgeText: { fontSize: '12px', fontWeight: '600', color: '#7e22ce' },
  formLayout: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '12px' },
  cardWarning: { backgroundColor: '#fef2f2', borderRadius: '12px', border: '1px solid #fecaca', padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' },
  subCard: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' },
  subCardTitle: { fontSize: '14px', fontWeight: '600', color: '#0f172a' },
  subCardText: { fontSize: '12px', color: '#64748b' },
  miniList: { paddingLeft: '16px', fontSize: '12px', color: '#334155', display: 'flex', flexDirection: 'column', gap: '4px' },
  quoteBox: { fontSize: '12px', fontStyle: 'italic', color: '#4f46e5', backgroundColor: '#eef2ff', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #6366f1', margin: 0 },
  tagCloud: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' },
  forbiddenTag: { backgroundColor: '#fee2e2', color: '#991b1b', fontSize: '11px', fontWeight: '600', padding: '4px 8px', borderRadius: '4px', border: '1px solid #fca5a5' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '10px' },
  cardTitle: { fontSize: '16px', fontWeight: '600', color: '#0f172a' },
  cardDesc: { fontSize: '13px', color: '#64748b', lineHeight: '1.4' },
  textareaLarge: { width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontFamily: 'inherit', color: '#0f172a', outline: 'none', resize: 'vertical', backgroundColor: '#f8fafc', lineHeight: '1.5' },
  textareaSmall: { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', fontFamily: 'inherit', color: '#0f172a', outline: 'none', resize: 'vertical', backgroundColor: '#f8fafc' },
  addExampleBox: { display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0' },
  addButton: { backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '8px 14px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', alignSelf: 'flex-end' },
  examplesList: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' },
  exampleItem: { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px', position: 'relative' },
  exampleBadge: { fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#6366f1', letterSpacing: '0.5px' },
  exampleText: { fontSize: '13px', color: '#334155', lineHeight: '1.4', paddingRight: '24px' },
  deleteButton: { position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' },
  emptyText: { fontSize: '13px', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', padding: '12px' },
  saveFooter: { display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', marginTop: '8px' },
  successToast: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#ecfdf5', border: '1px solid #10b981', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', color: '#065f46', fontWeight: '500' },
  primaryButton: { backgroundColor: '#6366f1', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }
};