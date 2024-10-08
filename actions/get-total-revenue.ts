import prismadb from "@/lib/prismadb";

export const getTotalRevenue = async (storeId: string) => {
    const paidOrders = await prismadb.order.findMany({
        where: {
            storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        }
    });

    const TotalRevenue = paidOrders.reduce((total, order) => {
        const orderTotal  = order.orderItems.reduce((orderSum, item) => {
            return orderSum + item.product.price.toNumber();
        }, 0);

        return total + orderTotal;
    }, 0)

    // console.log("Total Revenue:", TotalRevenue);
    return TotalRevenue;
}