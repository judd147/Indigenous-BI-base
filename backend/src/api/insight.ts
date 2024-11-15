// api/insight.ts
import express from 'express';
import { 
  getStrategyIndustrySummary, 
  getOwnerIndustrySummary, 
  getTopIBVendorSummary, 
  getTopNonIBVendorSummary 
} from '../services/queries';

const router = express.Router();

// 获取战略行业摘要的 API 端点
router.get('/strategy-industry-summary', async (req, res) => {
  try {
    const data = await getStrategyIndustrySummary();
    res.json(data);
  } catch (error) {
    console.error("Error fetching strategy industry summary:", error);
    res.status(500).json({ message: "Error fetching strategy industry summary" });
  }
});

// 获取所有者行业摘要的 API 端点
router.get('/owner-industry-summary', async (req, res) => {
  try {
    const data = await getOwnerIndustrySummary();
    res.json(data);
  } catch (error) {
    console.error("Error fetching owner industry summary:", error);
    res.status(500).json({ message: "Error fetching owner industry summary" });
  }
});

// 获取前10个IB供应商的洞察摘要 API 端点
router.get('/top-ib-vendor-summary', async (req, res) => {
  try {
    const data = await getTopIBVendorSummary();
    res.json(data);
  } catch (error) {
    console.error("Error fetching top IB vendor summary:", error);
    res.status(500).json({ message: "Error fetching top IB vendor summary" });
  }
});

// 获取前10个非IB供应商的洞察摘要 API 端点
router.get('/top-non-ib-vendor-summary', async (req, res) => {
  try {
    const data = await getTopNonIBVendorSummary();
    res.json(data);
  } catch (error) {
    console.error("Error fetching top non-IB vendor summary:", error);
    res.status(500).json({ message: "Error fetching top non-IB vendor summary" });
  }
});

export default router;