const express = require("express");
const cors = require("cors");
const router = require("./routes/index");

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/v1", router);

app.listen(3000);
