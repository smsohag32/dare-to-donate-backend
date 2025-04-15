import mongoose, { Schema, Document } from "mongoose";

interface IRequest extends Document {
   request_maker: mongoose.Schema.Types.ObjectId;
   donor_id: mongoose.Schema.Types.ObjectId;
   status: "pending" | "accept" | "declined" | "donate";
   hospital: string;
   address?: string;
   note: string;
}

const RequestSchema = new Schema<IRequest>(
   {
      request_maker: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "users",
         required: true,
      },
      donor_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "users",
         required: true,
      },
      status: {
         type: String,
         enum: ["pending", "accept", "declined", "donate"],
         default: "pending",
         required: true,
      },
      hospital: { type: String, required: true },
      address: {
         type: String,
      },
      note: { type: String, default: "", required: false },
   },
   { timestamps: true }
);

const Request = mongoose.models.requests || mongoose.model<IRequest>("requests", RequestSchema);
export default Request;
