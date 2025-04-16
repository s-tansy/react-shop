// import products from "../data/products";
// import ProductCard from "../components/ProductCard";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">全部商品</h1>
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ProductList />
      </div> */}
      <ProductList />
    </div>
  );
}
