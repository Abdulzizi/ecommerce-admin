import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getProductCount } from "@/actions/get-total-products";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-total-sales";
import { Overview } from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
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
  console.log(graphRevenue);

  // console.log(totalRevenue);
  // console.log(salesCount);
  // console.log(productCount);

  /**
  const data = [
    { name: "Jan", total: 120000 },
    { name: "Feb", total: 1000000 },
    { name: "Mar", total: 1200000 },
    { name: "Apr", total: 1234200 },
    { name: "May", total: 523000 },
    { name: "Jun", total: 1032000 },
    { name: "Jul", total: 432000 },
    { name: "Aug", total: 431421 },
    { name: "Sep", total: 92152 },
    { name: "Oct", total: 21341 },
    { name: "Nov", total: 1200 },
    { name: "Des", total: 0 },
  ];
   */

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
              <Overview data={graphRevenue} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
