// Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config();

// Import dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const userRouter = require("./routes/userRouter");

// Initialize Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Define routes

app.use("/user", userRouter); // Use user routes
// Define the root route to give a JSON response
app.get("/", (req, res) => {
  res.json("HELLO");
});

// Sync database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(4000, () => {
      console.log("App running on port http://localhost:4000");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
