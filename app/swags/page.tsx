import db from "@/lib/ts/db";
import { redirect } from "next/navigation";
import ProductCard from "@/components/home/ProductCard";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData(userId: string) {
    const data = await db.product.findMany({
        where: {
            userId: userId,
        },
        select: {
            name: true,
            images: true,
            price: true,
            summary: true,
            id: true,
        },
    });

    return data;
}

export default async function SwagsRoute() {
    noStore();
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect("/");
    }

    const swags = await getData(user.id);
    return (
        <section className="max-w-7xl mx-auto px-4 md:px-8">
            <h1 className="text-2xl font-bold">My Swags</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 sm:grid-cols-2 mt-4">
                {swags.map((item) => (
                    <ProductCard
                        key={item.id}
                        id={item.id}
                        images={item.images}
                        name={item.name}
                        price={item.price}
                        summary={item.summary}
                    />
                ))}
            </div>
        </section>
    );
}