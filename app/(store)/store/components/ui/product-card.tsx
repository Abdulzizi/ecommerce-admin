"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency  from "./currency";
import IconButton  from "./icon-button";
import usePreviewModal from "../../hooks/use-preview-modal";
import useCart from "../../hooks/use-cart";
import { Product } from "@/types";

interface ProductCard {
  data: Product
}

const ProductCard: React.FC<ProductCard> = ({
  data
}) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/store/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };
  
  return ( 
      <div 
        onClick={handleClick} 
        className="bg-white dark:bg-gray-800 group cursor-pointer rounded-xl border dark:border-gray-700 p-3 space-y-4"
      >
        {/* Image & actions */}
        <div className="aspect-square rounded-xl bg-gray-100 dark:bg-gray-700 relative">
          <Image 
            src={data.images?.[0]?.url} 
            alt="" 
            fill
            className="aspect-square object-cover rounded-md"
          />
          <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
            <div className="flex gap-x-6 justify-center">
              <IconButton 
                onClick={onPreview} 
                icon={<Expand size={20} className="text-gray-600 dark:text-gray-300" />}
              />
              <IconButton
                onClick={onAddToCart} 
                icon={<ShoppingCart size={20} className="text-gray-600 dark:text-gray-300" />} 
              />
            </div>
          </div>
        </div>
        {/* Description */}
        <div>
          <p className="font-semibold text-lg text-gray-900 dark:text-white">{data.name}</p>
          <p className="text-sm text-gray-500 dark:text-white">{data.category?.name}</p>
        </div>
        {/* Price & Review */}
        <div className="flex items-center justify-between">
          <Currency value={data?.price} />
        </div>
      </div>  
  )
}

export default ProductCard