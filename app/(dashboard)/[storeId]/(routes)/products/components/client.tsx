"use client";

import { Button } from "@/components/admin/ui/button";
import { Heading } from "@/components/admin/ui/heading";
import { Separator } from "@/components/admin/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ProductColumn, columns } from "./columns";
import { DataTable } from "@/components/admin/ui/data-table";
import { ApiList } from "@/components/admin/ui/api-list";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage your products here"
        />
        <Button
          variant="secondary"
          onClick={() => router.push(`/${params.storeId}/products/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="name" columns={columns} data={data} />

      <Separator />

      <Heading title="API Routes" description="Api calls for products" />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
