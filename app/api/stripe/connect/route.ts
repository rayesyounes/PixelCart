import db from "@/lib/ts/db";
import { stripe } from "@/lib/ts/stripe";
import { headers } from "next/headers";

export async function POST(req: Request) {
    const body = await req.text();

    const signature = headers().get("Stripe-Signature") as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_CONNECT_WEBHOOK_SECRET as string
        );
    } catch (error: unknown) {
        return new Response("webhook error", { status: 400 });
    }

    switch (event.type) {
        case "account.updated": {
            const account = event.data.object;

            const data = await db.user.update({
                where: {
                    connectedAccountId: account.id,
                },
                data: {
                    stripeConnectedLinked:
                        !(account.capabilities?.transfers === "pending" || account.capabilities?.transfers === "inactive"),
                },
            });
            break;
        }
        default: {
            console.log("default event");
        }
    }

    return new Response(null, { status: 200 });
}