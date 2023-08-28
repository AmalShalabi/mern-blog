const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRouters");
const path = require("path"); // Add this for static file serving
const cookieParser = require("cookie-parser");

require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_CONNECT || undefined)
  .then(() => {
    console.log("Database is connected"), { useNewUrlParser: true };
  })
  .catch((err) => console.log(err));

const app = express();
const port = process.env.API_PORT || 4000;
// ...

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", userRouter);
app.use("/", postRouter);

// Serve static files (e.g., uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ...
if (port) {
  app.listen(port, () => console.log(`server is listening on port ${port}`));
}

module.exports=app