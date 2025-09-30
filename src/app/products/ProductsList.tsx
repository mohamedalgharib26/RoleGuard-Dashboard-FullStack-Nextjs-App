"use client";

import { Product } from "@/generated/prisma";
import React, { useCallback, useState } from "react";
import { MemoizedProductItem } from "./SingleProduct";
import AddProduct from "./AddProduct";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, PostData } from "@/store/Api/ReactQuery";

type props = {
  initialProducts: Product[];
};
const ProductsList: React.FC<props> = ({ initialProducts }) => {
  const [cartCount, setCartCount] = useState<number>(0);

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialData: initialProducts,
  });

  const handleAddToCart = useCallback((productId: string) => {
    console.log(`Adding product ${productId} to cart.`);
    setCartCount((prevCount) => prevCount + 1);
  }, []);
  const qc = useQueryClient();
  const Mutation = useMutation({
    mutationFn: async (productId: string) =>
      PostData<string, void>(
        `http://localhost:3000/api/products/${productId}`,
        undefined,
        {
          method: "DELETE",
        }
      ),
    onSuccess: async () => {
      toast.success("Product Deleted successfully ...");
      await qc.invalidateQueries();
    },
    onError: () => toast.error("Error .. "),
  });

  const handleDeleteProduct = useCallback(
    async (productId: string) => {
      Mutation.mutate(productId);
    },
    [Mutation]
  );

  return (
    <>
      {products && (
        <div>
          <h3 className="text-center mt-3">Cart Count: {cartCount}</h3>
          <div className="flex  justify-center items-center md:flex-wrap">
            {products.map((product: Product) => (
              <MemoizedProductItem
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                DeleteProduct={handleDeleteProduct}
              />
            ))}
          </div>
          <AddProduct
            onAddProduct={() => toast.success("Product Added ....")}
          />
        </div>
      )}
    </>
  );
};

export default ProductsList;
