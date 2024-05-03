import prismadb from "@/lib/prismadb";

export const getProductCount = async (storeId: string) => {
    const totalProduct = await prismadb.product.count({
        where: {
            storeId
        }
    });

    return totalProduct;
}