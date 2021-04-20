const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const postRoutes = require("./api/routes/postRoutes");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.rjovb.mongodb.net/social-media-nodejs?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected!"))
  .catch(() => console.log("Error to connect mongodb!"));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
