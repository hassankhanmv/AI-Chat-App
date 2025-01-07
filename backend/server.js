require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/Users");

// Initialize App
const app = express();

// Use CORS middleware
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", userRoutes);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://mhassankhanmv:hassan123@mern.ezoct0n.mongodb.net/?retryWrites=true&w=majority&appName=mern",
    {
      // newUrlParser: true,
      // useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));

// port is set by the environment
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening to this PORT ${port}`);
});
