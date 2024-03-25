import { Schema, model } from "mongoose";

const CATEGORIES = [
  "entertainment",
  "food",
  "government",
  "healthcare",
  "housing",
  "insurance",
  "miscellaneous",
  "payments",
  "salary",
  "transportation",
];

const transactionSchema = new Schema(
  {
    senderAccount: { type: Schema.Types.ObjectId, ref: "Account" },
    receiverAccount: { type: Schema.Types.ObjectId, ref: "Account" },
    type: {
      type: String,
      lowercase: true,
      required: true,
      enum: ["deposit", "withdrawal", "transfer", "loan payment"],
    },
    amount: { type: Number, required: true, min: 0.01 },
    vendor: { type: String, lowercase: true, trim: true, required: true },
    category: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      enum: CATEGORIES,
    },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export default model("Transaction", transactionSchema);
