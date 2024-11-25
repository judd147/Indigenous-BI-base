import { DonutPieChart } from "./pie-chart";
import { StackedBarChart } from "./stacked-bar-chart";
import { HorizontalBarChart } from "./horizontal-bar-chart";
import { type ChartConfig } from "@/components/ui/chart";
import { CircleAlert } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function Charts() {
  const chartConfig1 = {
    "Mandatory-Set-Aside": {
      label: "Mandatory Set-Aside",
      color: "hsl(var(--chart-1))",
    },
    PSAB: {
      label: "PSAB",
      color: "hsl(var(--chart-2))",
    },
    "Voluntary-Set-Aside": {
      label: "Voluntary Set-Aside",
      color: "hsl(var(--chart-3))",
    },
    None: {
      label: "None",
      color: "hsl(var(--chart-4))",
    },
  } satisfies ChartConfig;

  const chartConfig2 = {
    "non-IB": {
      label: "non-Indigenous Business",
      color: "hsl(var(--chart-5))",
    },
    IB: {
      label: "Indigenous Business",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  const chartConfig3 = {
    "non-Tech": {
      label: "non-Tech",
      color: "hsl(var(--chart-1))",
    },
    Tech: {
      label: "Tech",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const chartConfig4 = {
    sum: {
      label: "Value",
      color: "hsl(var(--chart-1))",
    },
    label: {
      color: "hsl(var(--background))",
    },
  } satisfies ChartConfig;

  const fetchInsights = async () => {
    const response = await fetch(`https://indigenous-bi-base.onrender.com/api/insight`);
    return response.json();
  };

  const { data: insights = [] } = useQuery({
    queryKey: ["insights"],
    queryFn: fetchInsights,
  });

  // Destructure the array response
  const [
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
  ] = insights;
  console.log(chartData2);

  return (
    <div className="container mx-auto grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
      <DonutPieChart
        chartConfig={chartConfig1}
        chartData={chartData1}
        chartTitle="Contracts by Strategy"
        chartDescription="Year 2023"
        totalCount={totalCount}
        numericLabel="Contracts"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            Falling short of the 5% target
            <CircleAlert className="h-4 w-4 text-red-500" />
          </div>
        }
      />
      <DonutPieChart
        chartConfig={chartConfig1}
        chartData={chartData2}
        chartTitle="Contract Value by Strategy"
        chartDescription="Year 2023"
        totalCount={parseFloat((totalSum / 1_000_000).toFixed(0))}
        numericLabel="M CAD"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            Falling short of the 5% target
            <CircleAlert className="h-4 w-4 text-red-500" />
          </div>
        }
      />
      <DonutPieChart
        chartConfig={chartConfig2}
        chartData={chartData3}
        chartTitle="Contracts by Ownership"
        chartDescription="Year 2023 Under PSIB/PSAB"
        totalCount={totalCountPSIB}
        numericLabel="Contracts"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            Not exceeding the 50% benchmark
            <CircleAlert className="h-4 w-4 text-red-500" />
          </div>
        }
      />
      <DonutPieChart
        chartConfig={chartConfig2}
        chartData={chartData4}
        chartTitle="Contract Value by Ownership"
        chartDescription="Year 2023 Under PSIB/PSAB"
        totalCount={parseFloat((totalSumPSIB / 1_000_000).toFixed(0))}
        numericLabel="M CAD"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            Not exceeding the 25% benchmark
            <CircleAlert className="h-4 w-4 text-red-500" />
          </div>
        }
      />
      <DonutPieChart
        chartConfig={chartConfig3}
        chartData={chartData5}
        chartTitle="Contracts by Sector"
        chartDescription="Year 2023"
        totalCount={totalCount}
        numericLabel="Contracts"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            20% of total contracts are tech-related
          </div>
        }
      />
      <DonutPieChart
        chartConfig={chartConfig3}
        chartData={chartData6}
        chartTitle="Contract Value by Sector"
        chartDescription="Year 2023"
        totalCount={parseFloat((totalSum / 1_000_000).toFixed(0))}
        numericLabel="M CAD"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            17% of total contract value is tech-related
          </div>
        }
      />
      <StackedBarChart
        chartConfig={chartConfig3}
        chartData={chartData7}
        chartTitle="Contracts by Sector x Strategy"
        chartDescription="Year 2023"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            PSIB/PSAB is more tech-focused
          </div>
        }
        y1="Tech"
        y2="non-Tech"
      />
      <StackedBarChart
        chartConfig={chartConfig3}
        chartData={chartData8}
        chartTitle="Contract Value by Sector x Strategy"
        chartDescription="Year 2023"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            Value under PSIB/PSAB exceeding 50%
          </div>
        }
        y1="Tech"
        y2="non-Tech"
      />
      <StackedBarChart
        chartConfig={chartConfig3}
        chartData={chartData9}
        chartTitle="Contracts by Sector x Ownership"
        chartDescription="Year 2023 Under PSIB/PSAB"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            Half of IB contracts are in Tech
          </div>
        }
        y1="Tech"
        y2="non-Tech"
      />
      <StackedBarChart
        chartConfig={chartConfig3}
        chartData={chartData10}
        chartTitle="Contract Value by Sector x Ownership"
        chartDescription="Year 2023 Under PSIB/PSAB"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            Value of IB contracts in Tech almost 70%
          </div>
        }
        y1="Tech"
        y2="non-Tech"
      />
      <HorizontalBarChart
        chartConfig={chartConfig4}
        chartData={chartData11}
        chartTitle="Top 10 Indigenous Businesses in Tech"
        chartDescription="Year 2023 Under PSIB/PSAB in M CAD"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            IPSS, DONNA CONA, and VERSATIL BPI are leading in tech
          </div>
        }
      />
      <HorizontalBarChart
        chartConfig={chartConfig4}
        chartData={chartData12}
        chartTitle="Top 10 Non-IB in Tech"
        chartDescription="Year 2023 Under PSIB/PSAB in M CAD"
        footerContent={
          <div className="flex items-center gap-2 font-medium leading-none">
            ADIRONDACK, CHANTIER, and ADRM are leading in tech
          </div>
        }
      />
    </div>
  );
}
