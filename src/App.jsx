import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './Pages/Dashboard';
import AnalyzePost from './Pages/AnalyzePost';
import ReplyGenerator from './Pages/ReplyGenerator';
import MyVoice from './Pages/MyVoice';
import ContentIdeas from './Pages/ContentIdeas';
import ContentCalendar from './Pages/ContentCalendar';
import SavedContent from './Pages/SavedContent';

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