import { Suspense } from "react";
import { DataTable } from "../components/data-table";
import { DataTableSkeleton } from "../components/skeleton";
import { columns } from "../components/columns";
import { useQuery } from "@tanstack/react-query";

export default function ProcurementPage() {
  const page = 1;
  const limit = 10;

  const { data } = useQuery({
    queryKey: ["procurements"],
    queryFn: async () => await fetch(`http://localhost:3002/api/procurement?page=${page}&limit=${limit}`).then(res => res.json()),
  });
  console.log(data);
  const totalCount = data?.length ?? 0;
  return (
    <div className="container px-8 py-16">
      <p className="text-4xl font-bold">Federal Procurement</p>
      <div className="container mx-auto py-10">
        <Suspense fallback={<DataTableSkeleton />}>
          <DataTable
            columns={columns}
            data={data}
            pageCount={Math.ceil(totalCount / limit)}
            pageIndex={page - 1}
            pageSize={limit}
          />
        </Suspense>
      </div>
    </div>
  );
}
