require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");

// Initialize App
const app = express();

// Use CORS middleware
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  // console.log(req.path, req.method);
  console.log(`Request received: ${req.path} ${req.method}`);
  res.status(err.statusCode).send(err.message);
  next();
});

// Routes
app.get("/", (req, res, next) => {
  try {
    res.send("Hello World");
} catch(e) {
    next(e);
}
  
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
