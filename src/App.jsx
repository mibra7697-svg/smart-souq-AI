import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
      <AIAssistant />
    </>
  );
}

export default App;