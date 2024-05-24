import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SettingsForm from "@/components/forms/SettingsForm";
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import React from "react";
import db from "@/lib/ts/db";

async function getData(userId: string) {
  const data = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      email: true,
    },
  });

  return data;
}

export default async function SettingsPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/");
    // throw new Error("Not Authorized");
  }

  const data = await getData(user.id);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <SettingsForm
          firstName={data?.firstName as string}
          lastName={data?.lastName as string}
          email={data?.email as string}
        />
      </Card>
    </section>
  );
}