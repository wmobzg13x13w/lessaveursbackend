import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "piece"],
      default: "kg",
    },
    description: {
      type: String,
      required: false,
      default: "",
    },
    images: {
      type: [String],
      required: false,
      default: ["/uploads/placeholder.svg"],
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
