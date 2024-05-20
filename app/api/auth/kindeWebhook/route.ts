import db from "../../../../lib/ts/db";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  noStore();
  const redirectUrl = process.env.NODE_ENV === "development" ? process.env.DEV_BASE_URL : process.env.PROD_BASE_URL;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user === null || !user.id) {
    throw new Error("Unauthorized user");
  }

  let dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    
    dbUser = await db.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        profileImage: user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
        connectedAccountId: "",
      },
    });
  }

return NextResponse.redirect(redirectUrl as string);
}