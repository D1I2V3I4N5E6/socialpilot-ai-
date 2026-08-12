import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSearch, Sparkles, CheckCircle2, ArrowRight, RefreshCw, Copy } from 'lucide-react';

export default function AnalyzePost() {
  const navigate = useNavigate();
  const [postText, setPostText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Handle mock AI analysis simulation
  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!postText.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate backend/AI response delay for realism
    setTimeout(() => {
      setAnalysisResult({
        mainTopic: 'The Evolution of Software Engineering & Simple Tools',
        keyMessage: 'Building successful applications requires focusing on core user problems rather than chasing complex technical stacks.',
        importantPoints: [
          'Simplicity often beats heavy architecture in early-stage products.',
          'Developer velocity depends heavily on clear, maintainable patterns.',
          'User feedback should guide iteration cycles over assumptions.'
        ],
        engagementAngle: 'Share a personal counter-narrative where a simpler approach solved a difficult scaling or coding bottleneck.',
        isRelevant: true,
        relevanceReason: 'Aligns closely with your content pillars around practical web development and developer mindset.'
      });
      setIsAnalyzing(false);
    }, 1200);
  };

  const handleCopy = () => {
    if (!analysisResult) return;
    const textSummary = `Main Topic: ${analysisResult.mainTopic}\nKey Message: ${analysisResult.keyMessage}\nEngagement Angle: ${analysisResult.engagementAngle}`;
    navigator.clipboard.writeText(textSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToReply = () => {
    navigate('/reply', { state: { initialPost: postText } });
  };

  return (
    <div style={styles.container}>
      {/* Page Title Header */}
      <div style={styles.pageHeader}>
        <div>
          <h2 style={styles.pageTitle}>Analyze Social Media Post</h2>
          <p style={styles.pageSubtitle}>
            Paste any post below to extract structural insights, key takeaways, and engagement angles.
          </p>
        </div>
        <div style={styles.badgeContainer}>
          <Sparkles size={14} color="#a855f7" />
          <span style={styles.badgeText}>Engagement Agent Active</span>
        </div>
      </div>

      <div style={styles.gridContainer}>
        {/* Input Column */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Source Post</h3>
          <form onSubmit={handleAnalyze} style={styles.form}>
            <div style={styles.textareaWrapper}>
              <textarea
                value={postText}
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Paste the social media post here (e.g., from LinkedIn, X/Twitter, or a blog)..."
                style={styles.textarea}
                rows={10}
              />
              <span style={styles.charCount}>{postText.length} characters</span>
            </div>

            <button 
              type="submit" 
              style={{
                ...styles.primaryButton,
                opacity: !postText.trim() || isAnalyzing ? 0.7 : 1,
                cursor: !postText.trim() || isAnalyzing ? 'not-allowed' : 'pointer'
              }}
              disabled={!postText.trim() || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw size={16} style={styles.spinIcon} />
                  Analyzing Post structure...
                </>
              ) : (
                <>
                  <FileSearch size={16} />
                  Analyze Post
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div style={styles.card}>
          <div style={styles.resultHeader}>
            <h3 style={styles.cardTitle}>Analysis Insights</h3>
            {analysisResult && (
              <div style={styles.actionButtonsInline}>
                <button onClick={handleCopy} style={styles.iconButtonSmall} title="Copy summary">
                  <Copy size={14} color="#475569" />
                  {copied ? 'Copied!' : ''}
                </button>
              </div>
            )}
          </div>

          {!analysisResult && !isAnalyzing && (
            <div style={styles.emptyState}>
              <FileSearch size={40} color="#cbd5e1" />
              <p style={styles.emptyText}>No post analyzed yet. Paste text on the left and click "Analyze Post".</p>
            </div>
          )}

          {isAnalyzing && (
            <div style={styles.loadingState}>
              <div style={styles.spinner}></div>
              <p style={styles.loadingText}>The AI Engagement Agent is reviewing content markers...</p>
            </div>
          )}

          {analysisResult && !isAnalyzing && (
            <div style={styles.resultsContent}>
              <div style={{
                ...styles.relevanceBanner,
                backgroundColor: analysisResult.isRelevant ? '#ecfdf5' : '#fef3c7',
                borderColor: analysisResult.isRelevant ? '#10b981' : '#f59e0b'
              }}>
                <CheckCircle2 size={16} color={analysisResult.isRelevant ? '#059669' : '#d97706'} />
                <span style={{ color: analysisResult.isRelevant ? '#065f46' : '#92400e', fontSize: '13px', fontWeight: '500' }}>
                  {analysisResult.relevanceReason}
                </span>
              </div>

              <div style={styles.insightBlock}>
                <span style={styles.insightLabel}>Main Topic</span>
                <p style={styles.insightValue}>{analysisResult.mainTopic}</p>
              </div>

              <div style={styles.insightBlock}>
                <span style={styles.insightLabel}>Key Message</span>
                <p style={styles.insightValue}>{analysisResult.keyMessage}</p>
              </div>

              <div style={styles.insightBlock}>
                <span style={styles.insightLabel}>Important Takeaways</span>
                <ul style={styles.bulletList}>
                  {analysisResult.importantPoints.map((point, idx) => (
                    <li key={idx} style={styles.bulletItem}>{point}</li>
                  ))}
                </ul>
              </div>

              <div style={styles.insightBlock}>
                <span style={styles.insightLabel}>Engagement Angle</span>
                <p style={styles.insightValueHighlight}>{analysisResult.engagementAngle}</p>
              </div>

              <div style={styles.resultFooter}>
                <button onClick={handleSendToReply} style={styles.secondaryButton}>
                  Generate Reply <ArrowRight size={14} />
                </button>
              </div>
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
  textareaWrapper: { position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' },
  textarea: { width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontFamily: 'inherit', color: '#0f172a', outline: 'none', resize: 'vertical', minHeight: '220px', lineHeight: '1.5', backgroundColor: '#f8fafc' },
  charCount: { fontSize: '11px', color: '#94a3b8', textAlign: 'right', marginTop: '6px' },
  primaryButton: { backgroundColor: '#6366f1', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '12px 20px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', transition: 'background 0.2s' },
  resultHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  emptyState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', flex: 1, gap: '12px' },
  emptyText: { fontSize: '14px', color: '#94a3b8', maxWidth: '280px' },
  loadingState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', flex: 1, gap: '16px' },
  spinner: { width: '32px', height: '32px', border: '3px solid #f1f5f9', borderTop: '3px solid #6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  spinIcon: { animation: 'spin 0.8s linear infinite' },
  loadingText: { fontSize: '13px', color: '#64748b' },
  resultsContent: { display: 'flex', flexDirection: 'column', gap: '16px' },
  relevanceBanner: { display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '8px', border: '1px solid' },
  insightBlock: { display: 'flex', flexDirection: 'column', gap: '4px' },
  insightLabel: { fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#64748b' },
  insightValue: { fontSize: '14px', color: '#334155', lineHeight: '1.4' },
  insightValueHighlight: { fontSize: '14px', color: '#4f46e5', backgroundColor: '#eef2ff', padding: '10px 12px', borderRadius: '6px', fontWeight: '500', lineHeight: '1.4' },
  bulletList: { paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '4px' },
  bulletItem: { fontSize: '13px', color: '#334155', lineHeight: '1.4' },
  resultFooter: { marginTop: '12px', display: 'flex', justifyContent: 'flex-end' },
  secondaryButton: { backgroundColor: '#f1f5f9', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 16px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' },
  iconButtonSmall: { background: 'none', border: '1px solid #cbd5e1', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#475569' }
};