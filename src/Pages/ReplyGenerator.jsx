import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquareText, Sparkles, Copy, Check, RefreshCw } from 'lucide-react';

export default function ReplyGenerator() {
  const location = useLocation();
  const [sourcePost, setSourcePost] = useState('');
  const [tone, setTone] = useState('thoughtful');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReplies, setGeneratedReplies] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    if (location.state?.initialPost) {
      setSourcePost(location.state.initialPost);
    }
  }, [location.state]);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!sourcePost.trim()) return;

    setIsGenerating(true);
    setGeneratedReplies([]);

    setTimeout(() => {
      setGeneratedReplies([
        {
          id: 1,
          text: "What I find interesting is how we often focus on the immediate tooling. But that's not enough. The real question is: what changes in the daily workflow after the dust settles?"
        },
        {
          id: 2,
          text: "The thing is, simple approaches usually win out over heavy stacks. We need to build capability and ownership rather than temporary dependency. See eh, what actually changes for the end user?"
        },
        {
          id: 3,
          text: "I think people miss the root cause here. Training is good, but that's not enough. If it doesn't shift how teams operate long-term, are we really solving the problem?"
        }
      ]);
      setIsGenerating(false);
    }, 1400);
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>AI Reply Generator</h2>
          <p style={styles.pageSubtitle}>
            Generate human, systems-minded replies that challenge surface-level assumptions.
          </p>
        </div>
        <div style={styles.badgeContainer}>
          <Sparkles size={14} color="#a855f7" />
          <span style={styles.badgeText}>Voice Persona Active</span>
        </div>
      </div>

      <div style={styles.gridContainer}>
        {/* Input Column */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Target Post to Reply To</h3>
          <form onSubmit={handleGenerate} style={styles.form}>
            <div style={styles.textareaWrapper}>
              <textarea
                value={sourcePost}
                onChange={(e) => setSourcePost(e.target.value)}
                placeholder="Paste the post you want to reply to here..."
                style={styles.textarea}
                rows={6}
              />
            </div>

            <div style={styles.controlGroup}>
              <label style={styles.label}>Reply Angle / Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} style={styles.select}>
                <option value="thoughtful">Thoughtful & Questioning (Kevin Hallinan Style)</option>
                <option value="conversational">Conversational & Direct</option>
                <option value="practical">Practical & Systems-Minded</option>
              </select>
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.primaryButton,
                opacity: !sourcePost.trim() || isGenerating ? 0.7 : 1,
                cursor: !sourcePost.trim() || isGenerating ? 'not-allowed' : 'pointer'
              }}
              disabled={!sourcePost.trim() || isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={16} style={styles.spinIcon} />
                  Crafting replies with voice persona...
                </>
              ) : (
                <>
                  <MessageSquareText size={16} />
                  Generate Replies
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Options Column */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Generated Reply Options</h3>

          {!generatedReplies.length && !isGenerating && (
            <div style={styles.emptyState}>
              <MessageSquareText size={40} color="#cbd5e1" />
              <p style={styles.emptyText}>Paste a post on the left and click "Generate Replies" to create options.</p>
            </div>
          )}

          {isGenerating && (
            <div style={styles.loadingState}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>Applying your systems-thinking voice rules...</p>
            </div>
          )}

          {generatedReplies.length > 0 && !isGenerating && (
            <div style={styles.resultsList}>
              {generatedReplies.map((reply, index) => (
                <div key={reply.id} style={styles.replyCard}>
                  <div style={styles.replyCardHeader}>
                    <span style={styles.replyBadge}>Option #{index + 1}</span>
                    <button 
                      onClick={() => handleCopy(reply.text, index)}
                      style={styles.copyButton}
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check size={14} color="#059669" /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={14} /> Copy Reply
                        </>
                      )}
                    </button>
                  </div>
                  <p style={styles.replyText}>{reply.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
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
  gridContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '24px' },
  card: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' },
  cardTitle: { fontSize: '16px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 },
  textareaWrapper: { display: 'flex', flexDirection: 'column' },
  textarea: { width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontFamily: 'inherit', color: '#0f172a', outline: 'none', resize: 'vertical', backgroundColor: '#f8fafc', lineHeight: '1.5' },
  controlGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '12px', fontWeight: '600', color: '#475569' },
  select: { padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', backgroundColor: '#f8fafc', outline: 'none', color: '#0f172a' },
  primaryButton: { backgroundColor: '#6366f1', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 20px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'background 0.2s', marginTop: 'auto' },
  emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', flex: 1, gap: '12px' },
  emptyText: { fontSize: '14px', color: '#94a3b8', maxWidth: '280px' },
  loadingState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', flex: 1, gap: '16px' },
  spinner: { width: '32px', height: '32px', border: '3px solid #f1f5f9', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  spinIcon: { animation: 'spin 0.8s linear infinite' },
  loadingText: { fontSize: '13px', color: '#64748b' },
  resultsList: { display: 'flex', flexDirection: 'column', gap: '14px' },
  replyCard: { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' },
  replyCardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  replyBadge: { fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#6366f1', letterSpacing: '0.5px' },
  copyButton: { background: 'none', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#475569' },
  replyText: { fontSize: '13px', color: '#334155', lineHeight: '1.5' }
};