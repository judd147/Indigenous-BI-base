// src/api/procurement.ts
import express, { Request, Response } from 'express';
import {
  getStrategySummary,
  getOwnerSummary,
  getIndustrySummary,
  getTopIBVendorSummary,
  getTopNonIBVendorSummary,
} from '../services/queries';
import { db } from '../services/db';
import { procurement } from '../schema'; 

const router = express.Router();

const getProcurements = async (page: number, pageSize: number) => {
  return await db
    .select()
    .from(procurement) 
    .orderBy(procurement.id) 
    .limit(pageSize)
    .offset((page - 1) * pageSize);
};

router.get('/procurement', async (req, res) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  console.log("Parsed page:", page);
  const pageSize = parseInt(req.query.pageSize as string, 10) || 10;

  
  try {
    const procurements = await getProcurements(page, pageSize);
    res.status(200).json({ procurements });
  } catch (error) {
    console.error('Error fetching procurement data:', error);
    res.status(500).json({ error: 'Failed to fetch procurement data' });
  }
});

export default router;