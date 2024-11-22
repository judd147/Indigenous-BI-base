import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './component/layout';
import HomePage from './pages/home';
import ProcurementPage from './pages/procurement';
import InsightPage from './pages/insight';
import ProfilePage from './pages/profile';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/procurement" element={<ProcurementPage />} />
          <Route path="/insight" element={<InsightPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;