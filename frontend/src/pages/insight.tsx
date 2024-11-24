import { Suspense } from "react";
import { InsightSkeleton } from "../components/skeleton";
import Charts from "../components/charts";
import FootNote from "../components/footnote";

export type PieChartData = {
  category: string;
  count: number;
  sum: number;
  pct?: number;
  fill?: string;
};

export default function InsightPage() {
  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Insight</p>
      <Suspense fallback={<InsightSkeleton />}>
        <Charts />
      </Suspense>
      <FootNote />
    </div>
  );
}
