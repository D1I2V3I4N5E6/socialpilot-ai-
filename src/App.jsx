import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import AnalyzePost from './pages/AnalyzePost';
import ReplyGenerator from './pages/ReplyGenerator';
import MyVoice from './pages/MyVoice';
import ContentIdeas from './pages/ContentIdeas';
import ContentCalendar from './pages/ContentCalendar';
import SavedContent from './pages/SavedContent';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analyze" element={<AnalyzePost />} />
          <Route path="reply" element={<ReplyGenerator />} />
          <Route path="voice" element={<MyVoice />} />
          <Route path="ideas" element={<ContentIdeas />} />
          <Route path="calendar" element={<ContentCalendar />} />
          <Route path="saved" element={<SavedContent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}