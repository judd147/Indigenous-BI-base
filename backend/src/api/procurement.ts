import express from "express";
import { and, or, ilike, sql, inArray } from "drizzle-orm";
import { procurement } from "../schema";
import { getProcurementCount, getProcurementData } from "../services/queries";

const router = express.Router();

type Procurement = {
  id: number;
  vendorName: string | null;
  vendor: {
    isIB: boolean;
  };
  date: string | null;
  economicObjectCode: string | null;
  description: string | null;
  contractValue: number | null;
  commodityType: string | null;
  solicitationProcedureId: number | null;
  solicitationProcedure: {
    procedure: string | null;
  };
  departmentId: number | null;
  department: {
    name: string | null;
  };
  awardCriteriaId: number | null;
  awardCriteria: {
    criteria: string | null;
  };
  procurementStrategyId: number | null;
  procurementStrategy: {
    strategy: string | null;
  };
  isTech: boolean | null;
};

router.get("/procurement", async (req, res) => {
  const page = parseInt(req.query.page as string, 10) || 1;
  const limit = parseInt(req.query.pageSize as string, 10) || 10;
  const query = req.query.query as string;
  const sort = req.query.sort as string;
  const order = req.query.order as string;
  const commodityType = req.query.commodityType as string;
  // Parse the commodityType string into an array
  const commodityTypes = commodityType ? commodityType.split(",") : [];

  // Define the commodity type condition for multiple values
  const commodityTypeCondition =
    commodityTypes.length > 0
      ? inArray(procurement.commodityType, commodityTypes)
      : sql`true`;

  // Define the free-text search condition
  const queryCondition = query
    ? or(
        ilike(procurement.vendorName, `%${query}%`),
        ilike(procurement.description, `%${query}%`)
      )
    : sql`true`;

  // Combine both conditions with AND
  const searchCondition = and(commodityTypeCondition, queryCondition);

  try {
    const procurements = (await getProcurementData({
      page,
      limit,
      searchCondition,
      sort,
      order,
    })) as Procurement[];
    res.status(200).json({ procurements });
  } catch (error) {
    console.error("Error fetching procurement data:", error);
    res.status(500).json({ error: "Failed to fetch procurement data" });
  }
});

export default router;
