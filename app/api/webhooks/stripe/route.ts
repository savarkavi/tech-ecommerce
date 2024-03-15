import Stripe from "stripe";
import { NextResponse } from "next/server";
import Order from "@/lib/models/order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge = event.data.object;

      try {
        await Order.create({
          userId: "asfdaf",
          amount: 200,
          currency: "inr",
          status: "pending",
          deliveryStatus: "pending",
          paymentIntentId: "asdadscsdcfs",
          products: [{ name: "iphone" }],
        });
        return NextResponse.json({ received: true });
      } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json(
          { error: "Failed to update order" },
          { status: 500 }
        );
      }

    default:
      console.log(`Unhandled event type ${event.type}`);
      return NextResponse.json({ message: "Ok" });
  }
}
