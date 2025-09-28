import ProductsList from "./ProductsList";

async function Products() {
  const res = await fetch("http://localhost:3000/api/products");
  const initialProducts = await res.json();

  return <ProductsList initialProducts={initialProducts} />;
}

export default Products;
