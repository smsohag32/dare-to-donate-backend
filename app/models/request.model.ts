import mongoose, { Schema, Document } from "mongoose";

interface IAddress {
   street?: string;
   city?: string;
   state?: string;
   zip?: string;
   country?: string;
}

interface IRequest extends Document {
   request_maker: mongoose.Schema.Types.ObjectId;
   donor_id: mongoose.Schema.Types.ObjectId;
   status: "pending" | "accept" | "declined" | "donate";
   hospital: string;
   address?: IAddress;
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
         street: { type: String, required: false },
         city: { type: String, required: false },
         state: { type: String, required: false },
         zip: { type: String, required: false },
         country: { type: String, required: false },
      },
      note: { type: String, default: "", required: false },
   },
   { timestamps: true }
);

const Request = mongoose.models.requests || mongoose.model<IRequest>("requests", RequestSchema);
export default Request;
