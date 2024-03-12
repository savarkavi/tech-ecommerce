import Order from "@/lib/models/order";
import { currentUser } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items, total, payment_intent_id } = await req.json();
  const orderData = {
    userId: user.publicMetadata.userId,
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    console.log(payment_intent_id);

    const currentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (currentIntent) {
      const updatedIntent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );

      const existingOrder = await Order.findOne({
        paymentIntentId: payment_intent_id,
      });
      if (!existingOrder) {
        return NextResponse.json(
          { error: "Invalid payment Intent" },
          { status: 400 }
        );
      }

      const updatedOrder = await Order.findOneAndUpdate(
        { paymentIntentId: payment_intent_id },
        { amount: total, products: items }
      );

      return NextResponse.json({ paymentIntent: updatedIntent });
    }
  } else {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentId = paymentIntent.id;
    await Order.create(orderData);

    return NextResponse.json({ paymentIntent });
  }
}
