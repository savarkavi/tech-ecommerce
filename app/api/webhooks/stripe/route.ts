import Stripe from "stripe";
import { NextResponse } from "next/server";
import Order from "@/lib/models/order";
import { updateOrder } from "@/lib/actions/order";

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

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;

    if (charge.payment_intent && typeof charge.payment_intent === "string") {
      await updateOrder(charge.payment_intent, charge.billing_details.address);
    }

    return NextResponse.json({ message: "Event recieved" });
  }

  return NextResponse.json({ message: "Ok" });
}
