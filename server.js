const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Doctor = require("./models/Doctor");
const Surgery = require("./models/Surgery");
const Specialization = require("./models/Specialization");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/curewell")
  .then(() => console.log("MongoDB Connected"));



app.get("/doctors", async (req, res) => {
  res.json(await Doctor.find());
});

app.post("/doctors", async (req, res) => {
  const { doctorId, doctorName, specializationCode } = req.body;

  const exists = await Doctor.findOne({ doctorId });
  if (exists) return res.status(400).json({ message: "ID exists ❌" });

  await new Doctor({ doctorId, doctorName, specializationCode }).save();
  res.json({ message: "Added" });
});

app.put("/doctors/:id", async (req, res) => {
  const id = Number(req.params.id);

  await Doctor.updateOne(
    { doctorId: id },
    { $set: { doctorName: req.body.doctorName } }
  );

  res.json({ message: "Updated" });
});

app.delete("/doctors/:id", async (req, res) => {
  await Doctor.deleteOne({ doctorId: Number(req.params.id) });
  res.json({ message: "Deleted" });
});

app.get("/doctors/specialization/:code", async (req, res) => {
  res.json(await Doctor.find({ specializationCode: req.params.code }));
});


app.get("/specialization", async (req, res) => {
  res.json(await Specialization.find());
});

app.post("/specialization", async (req, res) => {
  await new Specialization(req.body).save();
  res.json({ message: "Added" });
});



app.get("/surgery", async (req, res) => {
  res.json(await Surgery.find());
});


app.get("/surgery/today", async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const data = await Surgery.find({
      surgeryDate: today
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({
      message: "Error fetching today surgery"
    });
  }
});
app.post("/surgery", async (req, res) => {
  await new Surgery(req.body).save();
  res.json({ message: "Added" });
});

app.put("/surgery/:id", async (req, res) => {
  const { startTime, endTime } = req.body;

  if (startTime >= endTime) {
    return res.status(400).json({ message: "Invalid time ❌" });
  }

  await Surgery.updateOne(
    { surgeryId: Number(req.params.id) },
    { $set: { startTime, endTime } }
  );

  res.json({ message: "Updated" });
});

app.listen(5000, () => console.log("Server running"));
