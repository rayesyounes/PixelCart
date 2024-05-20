import db from "@/lib/ts/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import InventoryForm from "@/components/forms/InventoryForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";


export default async function InventoryRoute() {

  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <InventoryForm />
      </Card>
    </section>
  );
}