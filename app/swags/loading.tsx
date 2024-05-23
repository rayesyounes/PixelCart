import LoadingProduct from "@/app/products/[category]/loading";

export default function LoadingSwags() {
    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid gird-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
                <LoadingProduct />
                <LoadingProduct />
                <LoadingProduct />
            </div>
        </div>
    );
}