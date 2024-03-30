import { Order } from "../../../lib/models/models";
import { currentUser } from "@clerk/nextjs";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items, total, payment_intent_id } = await req.json();
  const productIds = items.map((id: string) => new mongoose.mongo.ObjectId(id));

  const orderData = {
    userId: user.publicMetadata.userId,
    amount: total,
    currency: "inr",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: productIds,
  };

  let paymentIntent;

  if (payment_intent_id) {
    paymentIntent = await stripe.paymentIntents.retrieve(payment_intent_id);
    const updatedIntent = await stripe.paymentIntents.update(
      payment_intent_id,
      { amount: total * 100 }
    );
  } else {
    paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      description: "Test transaction for ecommerce project",
    });
  }

  orderData.paymentIntentId = paymentIntent.id;

  const existingOrder = await Order.findOne({
    paymentIntentId: paymentIntent.id,
  });

  if (existingOrder) {
    const updatedOrder = await Order.findOneAndUpdate(
      { paymentIntentId: paymentIntent.id },
      { amount: total, products: productIds }
    );
  } else {
    await Order.create(orderData);
  }

  return NextResponse.json({ paymentIntent });
}
