import { getCategory } from "@/app/actions";
import ProductCard from "@/components/home/ProductCard";
import { unstable_noStore as noStore } from "next/cache";

export default async function CategoryPage({ params, }: { params: { category: string }; }) {
    noStore();
    const data = await getCategory(params.category);
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
                {data.map((product) => (
                    <ProductCard
                        id={product.id}
                        key={product.id}
                        name={product.name}
                        price={product.price}
                        images={product.images}
                        summary={product.summary}
                    />
                ))}
            </div>
        </section>
    );
}