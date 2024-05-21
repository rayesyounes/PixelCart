import Link from "next/link";
import { Suspense } from "react";
import { getCategories, iAppProps } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/home/ProductCard";
import { LoadingProductCard } from "@/components/home/ProductCard";


export default function ProductShelf({ category }: iAppProps) {
    return (
        <section className="mt-12">
            <Suspense fallback={<LoadingState />}>
                <LoadRows category={category} />
            </Suspense>
        </section>
    );
}

async function LoadRows({ category }: iAppProps) {
    const data = await getCategories({ category: category });
    return (
        <>
            <div className="md:flex md:items-center md:justify-between">
                <h2 className="text-2xl font-extrabold tracking-tighter ">
                    {data.title}
                </h2>
                <Link
                    href={data.link}
                    className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
                >
                    All Products <span>&rarr;</span>
                </Link>
            </div>

            <div className="grid gird-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
                {data.data.map((product) => (
                    <ProductCard
                        images={product.images}
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        summary={product.summary}
                    />
                ))}
            </div>
        </>
    );
}

function LoadingState() {
    return (
        <div>
            <Skeleton className="h-8 w-56" />
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
                <LoadingProductCard />
                <LoadingProductCard />
                <LoadingProductCard />
            </div>
        </div>
    );
}