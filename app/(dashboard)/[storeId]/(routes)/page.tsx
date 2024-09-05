import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getProductCount } from "@/actions/get-total-products";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-total-sales";
import { Overview } from "@/components/admin/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Heading } from "@/components/admin/ui/heading";
import { Separator } from "@/components/admin/ui/separator";

import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, PackageOpen } from "lucide-react";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const productCount = await getProductCount(params.storeId);
  
  // Graph value
  const graphRevenue = await getGraphRevenue(params.storeId);
  // console.log(graphRevenue);

  // console.log(totalRevenue);
  // console.log(salesCount);
  // console.log(productCount);

  
  const data = [
    { name: "Jan", total: 1340000 },
    { name: "Feb", total: 1100000 },
    { name: "Mar", total: 1010000 },
    { name: "Apr", total: 1022200 },
    { name: "May", total: 523000 },
    { name: "Jun", total: 103200 },
    { name: "Jul", total: 432000 },
    { name: "Aug", total: 431421 },
    { name: "Sep", total: 922152 },
    { name: "Oct", total: 313141 },
    { name: "Nov", total: 1232200 },
    { name: "Des", total: 423000 },
  ];

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="See your sales here" />
        <Separator />

        <div className="grid gap-4 grid-cols-3">
          {/* Revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Income
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{salesCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <PackageOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productCount}</div>
            </CardContent>
          </Card>

          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview(Rp Currency)</CardTitle>
            </CardHeader>

            <CardContent className="pl-2">
              <Overview data={data} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
