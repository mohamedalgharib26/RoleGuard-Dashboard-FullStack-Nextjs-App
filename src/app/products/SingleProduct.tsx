import { Product } from "@prisma/client";
import { memo } from "react";

interface ProductItemProps {
  product: Product;
  onAddToCart: (productId: string) => void;
  DeleteProduct: (productId: string) => void;
}
export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onAddToCart,
  DeleteProduct,
}) => {
  return (
    <div className="p-3 border border-gray-300 m-2 rounded">
      <h4 className="mb-2 font-semibold">{product.title}</h4>
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
        onClick={() => onAddToCart(product.id)}
      >
        Add to Cart
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        onClick={() => {
          console.log(
            "Button clicked, DeleteProduct:",
            DeleteProduct,
            typeof DeleteProduct
          );
          DeleteProduct(product.id);
        }}
      >
        Delete
      </button>
    </div>
  );
};

export const MemoizedProductItem = memo(ProductItem);
