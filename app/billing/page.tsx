import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import db from "@/lib/ts/db";
import { unstable_noStore as noStore } from "next/cache";



export default async function BillingRoute() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      billing
    </section>
  );
}