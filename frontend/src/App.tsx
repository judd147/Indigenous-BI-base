import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/layout';
import ProcurementPage from './pages/procurement';
import InsightPage from './pages/insight';
import ProfilePage from './pages/profile';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/procurement" element={<ProcurementPage />} />
          <Route path="/insight" element={<InsightPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;