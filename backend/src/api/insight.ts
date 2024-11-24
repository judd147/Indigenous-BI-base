// api/insight.ts
import express from "express";
import {
  getStrategySummary,
  getOwnerSummary,
  getIndustrySummary,
  getStrategyIndustrySummary,
  getOwnerIndustrySummary,
  getTopIBVendorSummary,
  getTopNonIBVendorSummary,
} from "../services/queries";

const router = express.Router();

type PieChartData = {
  category: string;
  count: number;
  sum: number;
  pct?: number;
  fill?: string;
};

// 获取战略行业摘要的 API 端点
router.get("/insight", async (req, res) => {
  try {
    // pie charts
    const strategySummary = await getStrategySummary();
    const totalCount = strategySummary.reduce((sum, obj) => sum + obj.count, 0);
    const totalSum = strategySummary.reduce((sum, obj) => sum + obj.sum, 0);

    const chartData1: PieChartData[] = [];
    strategySummary.map((item: PieChartData) => {
      const newItem: PieChartData = {
        ...item,
        category: item.category.split(" ").join("-"),
        pct: parseFloat(((item.count / totalCount) * 100).toFixed(1)),
      };
      newItem.fill = "var(--color-" + newItem.category + ")";
      chartData1.push(newItem);
    });

    const chartData2: PieChartData[] = [];
    strategySummary.map((item: PieChartData) => {
      const newItem: PieChartData = {
        ...item,
        category: item.category.split(" ").join("-"),
        pct: parseFloat(((item.sum / totalSum) * 100).toFixed(1)),
      };
      newItem.fill = "var(--color-" + newItem.category + ")";
      chartData2.push(newItem);
    });
    const ownerSummary = await getOwnerSummary();
    const totalCountPSIB = ownerSummary.reduce(
      (sum, obj) => sum + obj.count,
      0
    );
    const totalSumPSIB = ownerSummary.reduce((sum, obj) => sum + obj.sum, 0);

    const chartData3: PieChartData[] = [];
    ownerSummary.map((item: PieChartData) => {
      const newItem: PieChartData = {
        ...item,
        pct: parseFloat(((item.count / totalCountPSIB) * 100).toFixed(1)),
        fill: "var(--color-" + item.category + ")",
      };
      chartData3.push(newItem);
    });

    const chartData4: PieChartData[] = [];
    ownerSummary.map((item: PieChartData) => {
      const newItem: PieChartData = {
        ...item,
        pct: parseFloat(((item.sum / totalSumPSIB) * 100).toFixed(1)),
        fill: "var(--color-" + item.category + ")",
      };
      chartData4.push(newItem);
    });
    const industrySummary = await getIndustrySummary();

    const chartData5: PieChartData[] = [];
    industrySummary.map((item: PieChartData) => {
      const newItem: PieChartData = {
        ...item,
        pct: parseFloat(((item.count / totalCount) * 100).toFixed(1)),
        fill: "var(--color-" + item.category + ")",
      };
      chartData5.push(newItem);
    });

    const chartData6: PieChartData[] = [];
    industrySummary.map((item: PieChartData) => {
      const newItem: PieChartData = {
        ...item,
        pct: parseFloat(((item.sum / totalSum) * 100).toFixed(1)),
        fill: "var(--color-" + item.category + ")",
      };
      chartData6.push(newItem);
    });
    // stacked bar chart showing pecentage of tech contracts by strategy
    const strategyIndustrySummary = await getStrategyIndustrySummary();

    const chartData7: object[] = [];
    strategyIndustrySummary.map((item) => {
      const newItem: object = {
        ...item,
        Tech: parseFloat(
          (
            (item.Tech_count / (item.Tech_count + item["non-Tech_count"])) *
            100
          ).toFixed(1)
        ),
        "non-Tech": parseFloat(
          (
            (item["non-Tech_count"] /
              (item.Tech_count + item["non-Tech_count"])) *
            100
          ).toFixed(1)
        ),
      };
      chartData7.push(newItem);
    });

    const chartData8: object[] = [];
    strategyIndustrySummary.map((item) => {
      const newItem: object = {
        ...item,
        Tech: parseFloat(
          (
            (item.Tech_sum / (item.Tech_sum + item["non-Tech_sum"])) *
            100
          ).toFixed(1)
        ),
        "non-Tech": parseFloat(
          (
            (item["non-Tech_sum"] / (item.Tech_sum + item["non-Tech_sum"])) *
            100
          ).toFixed(1)
        ),
      };
      chartData8.push(newItem);
    });

    // stacked bar chart showing pecentage of tech contracts under PSIB/PSAB by ownership
    const ownerIndustrySummary = await getOwnerIndustrySummary();

    const chartData9: object[] = [];
    ownerIndustrySummary.map((item) => {
      const newItem: object = {
        ...item,
        Tech: parseFloat(
          (
            (item.Tech_count / (item.Tech_count + item["non-Tech_count"])) *
            100
          ).toFixed(1)
        ),
        "non-Tech": parseFloat(
          (
            (item["non-Tech_count"] /
              (item.Tech_count + item["non-Tech_count"])) *
            100
          ).toFixed(1)
        ),
      };
      chartData9.push(newItem);
    });

    const chartData10: object[] = [];
    ownerIndustrySummary.map((item) => {
      const newItem: object = {
        ...item,
        Tech: parseFloat(
          (
            (item.Tech_sum / (item.Tech_sum + item["non-Tech_sum"])) *
            100
          ).toFixed(1)
        ),
        "non-Tech": parseFloat(
          (
            (item["non-Tech_sum"] / (item.Tech_sum + item["non-Tech_sum"])) *
            100
          ).toFixed(1)
        ),
      };
      chartData10.push(newItem);
    });

    // horizontal bar chart showing top 10 IB and non-IB vendors in contract valueunder PSIB/PSAB
    const topIBVendorSummary = await getTopIBVendorSummary();

    const chartData11: object[] = [];
    topIBVendorSummary.map((item) => {
      const newItem: object = {
        ...item,
        sum: parseFloat((item.sum / 1_000_000).toFixed(2)),
        alt:
          item.category.length - 5 > item.sum / 1_000_000
            ? `${item.category.substring(0, 1 + item.sum / 1_000_000)}...`
            : item.category, // truncate the label manually
      };
      chartData11.push(newItem);
    });
    const topNonIBVendorSummary = await getTopNonIBVendorSummary();

    const chartData12: object[] = [];
    topNonIBVendorSummary.map((item) => {
      const newItem: object = {
        ...item,
        sum: parseFloat((item.sum / 1_000_000).toFixed(2)),
        alt:
          item.category.length - 5 > item.sum / 3_000_000
            ? `${item.category.substring(0, 1 + item.sum / 3_000_000)}...`
            : item.category, // truncate the label manually
      };
      chartData12.push(newItem);
    });
    res.json([
      totalSum,
      totalCount,
      totalCountPSIB,
      totalSumPSIB,
      chartData1,
      chartData2,
      chartData3,
      chartData4,
      chartData5,
      chartData6,
      chartData7,
      chartData8,
      chartData9,
      chartData10,
      chartData11,
      chartData12,
    ]);
  } catch (error) {
    console.error("Error fetching summaries:", error);
    res.status(500).json({ message: "Error fetching summaries" });
  }
});

export default router;
