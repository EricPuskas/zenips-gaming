require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const path = require("path");
const express = require("express");
const app = express();
const { PORT, NODE_ENV } = require("./config/keys");
const passport = require("passport");
const formData = require("express-form-data");
const auth = require("./routes/auth");
const users = require("./routes/user");
const posts = require("./routes/posts");
const patchNotes = require("./routes/patch_notes");
const articles = require("./routes/articles");
const tags = require("./routes/tags");
const messages = require("./routes/messages");
const time = 60 * 1000 * 60 * 24 * 30; // 30 days
const helmet = require("helmet");

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(formData.parse());
// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./middleware/passport")(passport);

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/patchnotes", patchNotes);
app.use("/api/articles", articles);
app.use("/api/tags", tags);
app.use("/api/messages", messages);

// Serve static assets if in production
if (NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build", { maxAge: time }));
  app.get("/robots.txt", function(req, res) {
    res.type("text/plain");
    res.send("User-agent: *\nDisallow: /");
  });
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listen to Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
