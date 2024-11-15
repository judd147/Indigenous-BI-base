// services/queries.ts
import { db } from "./db";
import {
  procurement,
  procurementStrategy,
  vendor,
  strategySummary,
  ownerSummary,
  industrySummary,
  strategyIndustrySummary,
  ownerIndustrySummary,
  topIBVendorSummary,
  topNonIBVendorSummary,
} from "../schema";
import { count, sum, eq, sql, ne, and, desc } from "drizzle-orm";

const cached = true; // 是否使用缓存的数据表

// 获取战略摘要
export async function getStrategySummary() {
  return cached
    ? await db.select().from(strategySummary)
    : await db.select({
        category: procurementStrategy.strategy,
        count: count(),
        sum: sum(procurement.contract_value),
      })
      .from(procurement)
      .innerJoin(procurementStrategy, eq(procurement.procurement_strategy_id, procurementStrategy.id))
      .groupBy(procurementStrategy.strategy);
}

// 获取所有者摘要
export async function getOwnerSummary() {
  return cached
    ? await db.select().from(ownerSummary)
    : await db.select({
        category: sql<string>`CASE WHEN ${vendor.is_IB} THEN 'IB' ELSE 'non-IB' END`,
        count: count(),
        sum: sum(procurement.contract_value),
      })
      .from(procurement)
      .innerJoin(vendor, eq(procurement.vendor_name, vendor.vendor_name))
      .innerJoin(procurementStrategy, eq(procurement.procurement_strategy_id, procurementStrategy.id))
      .where(ne(procurementStrategy.strategy, "None"))
      .groupBy(vendor.is_IB);
}

// 获取行业摘要
export async function getIndustrySummary() {
  return cached
    ? await db.select().from(industrySummary)
    : await db.select({
        category: sql<string>`CASE WHEN ${procurement.is_Tech} THEN 'Tech' ELSE 'non-Tech' END`,
        count: count(),
        sum: sum(procurement.contract_value),
      })
      .from(procurement)
      .groupBy(procurement.is_Tech);
}

// 获取战略行业摘要
export async function getStrategyIndustrySummary() {
  return cached
    ? await db.select().from(strategyIndustrySummary)
    : await db.select({
        category: sql<string>`CASE WHEN ${procurementStrategy.strategy} = 'None' THEN 'None' ELSE 'PSIB/PSAB' END`,
        Tech_count: count(sql`CASE WHEN ${procurement.is_Tech} THEN 1 END`),
        non_Tech_count: count(sql`CASE WHEN NOT ${procurement.is_Tech} THEN 1 END`),
        Tech_sum: sum(sql`CASE WHEN ${procurement.is_Tech} THEN ${procurement.contract_value} END`),
        non_Tech_sum: sum(sql`CASE WHEN NOT ${procurement.is_Tech} THEN ${procurement.contract_value} END`),
      })
      .from(procurement)
      .innerJoin(procurementStrategy, eq(procurement.procurement_strategy_id, procurementStrategy.id))
      .groupBy(sql<string>`CASE WHEN ${procurementStrategy.strategy} = 'None' THEN 'None' ELSE 'PSIB/PSAB' END`);
}

// 获取所有者行业摘要
export async function getOwnerIndustrySummary() {
  return cached
    ? await db.select().from(ownerIndustrySummary)
    : await db.select({
        category: sql<string>`CASE WHEN ${vendor.is_IB} THEN 'IB' ELSE 'non-IB' END`,
        Tech_count: count(sql`CASE WHEN ${procurement.is_Tech} THEN 1 END`),
        non_Tech_count: count(sql`CASE WHEN NOT ${procurement.is_Tech} THEN 1 END`),
        Tech_sum: sum(sql`CASE WHEN ${procurement.is_Tech} THEN ${procurement.contract_value} END`),
        non_Tech_sum: sum(sql`CASE WHEN NOT ${procurement.is_Tech} THEN ${procurement.contract_value} END`),
      })
      .from(procurement)
      .innerJoin(vendor, eq(procurement.vendor_name, vendor.vendor_name))
      .innerJoin(procurementStrategy, eq(procurement.procurement_strategy_id, procurementStrategy.id))
      .where(ne(procurementStrategy.strategy, "None"))
      .groupBy(sql<string>`CASE WHEN ${vendor.is_IB} THEN 'IB' ELSE 'non-IB' END`);
}

// 获取前10个IB供应商摘要
export async function getTopIBVendorSummary() {
  return cached
    ? await db.select().from(topIBVendorSummary)
    : await db.select({
        category: vendor.vendor_name,
        sum: sum(procurement.contract_value),
      })
      .from(procurement)
      .innerJoin(vendor, eq(procurement.vendor_name, vendor.vendor_name))
      .innerJoin(procurementStrategy, eq(procurement.procurement_strategy_id, procurementStrategy.id))
      .where(and(ne(procurementStrategy.strategy, "None"), eq(vendor.is_IB, true)))
      .groupBy(vendor.vendor_name)
      .orderBy(desc(sum(procurement.contract_value)))
      .limit(10);
}

// 获取前10个非IB供应商摘要
export async function getTopNonIBVendorSummary() {
  return cached
    ? await db.select().from(topNonIBVendorSummary)
    : await db.select({
        category: vendor.vendor_name,
        sum: sum(procurement.contract_value),
      })
      .from(procurement)
      .innerJoin(vendor, eq(procurement.vendor_name, vendor.vendor_name))
      .innerJoin(procurementStrategy, eq(procurement.procurement_strategy_id, procurementStrategy.id))
      .where(and(ne(procurementStrategy.strategy, "None"), eq(vendor.is_IB, false)))
      .groupBy(vendor.vendor_name)
      .orderBy(desc(sum(procurement.contract_value)))
      .limit(10);
}