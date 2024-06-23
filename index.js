const connectDB = require("./db/db");
const express = require("express");
const dotenv = require("dotenv");
const routerAuth = require("./routes/auth");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const port = 8002;

app.use("/auth", routerAuth);

app.listen(port, () => {
  console.log("Server running");
});
