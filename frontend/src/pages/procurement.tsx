import { Suspense } from "react";
import { DataTable } from "../components/data-table";
import { DataTableSkeleton } from "../components/skeleton";
import { columns } from "../components/columns";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export default function ProcurementPage() {
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const query = searchParams.get("query") || "";
  const sort = searchParams.get("sort") || "";
  const order = searchParams.get("order") || "";
  const commodityType = searchParams.get("commodityType") || "";

  const fetchProcurements = async () => {
    const response = await fetch(
      `https://indigenous-bi-base.onrender.com/api/procurement?page=${page}&limit=${limit}&query=${query}&sort=${sort}&order=${order}&commodityType=${commodityType}`
    );
    return response.json();
  };

  const { data: procurements = [[], 0] } = useQuery({
    queryKey: ["procurements", page, limit, query, sort, order, commodityType],
    queryFn: fetchProcurements,
    placeholderData: (prev) => prev
  });

  // Destructure the array response
  const [procurementData, totalCount] = procurements;

  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Federal Procurement</p>
      <div className="container mx-auto py-10">
        <Suspense fallback={<DataTableSkeleton />}>
          <DataTable
            columns={columns}
            data={procurementData}
            pageCount={Math.ceil(totalCount / limit) || 1}
            pageIndex={page - 1}
            pageSize={limit}
          />
        </Suspense>
      </div>
    </div>
  );
}
