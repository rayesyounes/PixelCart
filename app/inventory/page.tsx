import React from "react";
import db from "@/lib/ts/db";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { unstable_noStore as noStore } from "next/cache";
import InventoryForm from "@/components/forms/InventoryForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


async function CheckStripeLink(userId: string) {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      stripeConnectedLinked: true,
    },
  });

  if (data?.stripeConnectedLinked === false) {
    return redirect("/billing");
  }

  return null;
}


export default async function InventoryRoute() {

  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  
  if (!user) {
    return redirect("/");
  }

  await CheckStripeLink(user.id);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-14">
      <Card>
        <InventoryForm />
      </Card>
    </section>
  );
}