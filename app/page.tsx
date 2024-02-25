import CategoriesBar from "@/components/CategoriesBar";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import { products } from "@/constants";

export default function Home() {
  return (
    <div>
      <CategoriesBar />
      <HeroBanner />
      <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:flex xl:flex-row xl:flex-wrap items-center justify-center gap-4 mt-16 p-4 xl:p-0 max-w-[1600px] mx-auto">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
