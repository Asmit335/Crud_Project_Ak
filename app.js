import express from "express";
import mongoose from "mongoose";
import crudModel from "./crudModel/crudModel.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const mongodb = mongoose
  .connect(
    "mongodb+srv://hello:hello@cluster0.ykzy9rx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("DAtabase connected Successfully.");
  });

app.post("/create", async (req, res) => {
  const crudData = await crudModel.create({
    title: req.body.title,
    description: req.body.description,
    remark: req.body.remark,
  });
  res.json({
    status: 200,
    message: "Data of crud created successfully",
    data: crudData,
  });
});

app.get("/", (req, res) => {
  res.render("index");
  // res.json({
  //   message: "This is home page",
  //   status: 200,
  // });
});

app.get("/read/:id", async (req, res) => {
  const id = req.params.id;
  const crudData = await crudModel.findById(id);
  res.json({
    status: 200,
    message: "data fetched successfullly",
    data: crudData,
  });
});
app.get("/read", async (req, res) => {
  const crudData = await crudModel.find();
  res.json({
    status: 200,
    message: "data read successfullly",
    data: crudData,
  });
});

app.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  const remark = req.body.remark;
  const crudData = await crudModel.findByIdAndUpdate(id, {
    title: title,
    description: description,
    remark: remark,
  });
  res.json({
    status: 200,
    message: "data updated successfullly",
    data: crudData,
  });
});
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const crudData = await crudModel.findByIdAndDelete(id);
  res.json({
    status: 200,
    message: "data deleted successfullly",
  });
});

app.listen(3000, (req, res) => {
  console.log("The port is running in 3000");
});
