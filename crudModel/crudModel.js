import mongoose from "mongoose";

const crudSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    remark: String,
  },
  {
    timestamps: true,
  }
);
const crudModel = mongoose.model("Crud", crudSchema);
export default crudModel;
