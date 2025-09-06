const express = require('express');
const cors = require('cors');
const path = require("path");
const { default: connectDB } = require('./src/Connection/connection.js');

const app = express();
require('./src/Connection/connection.js');

const userRouter = require('./src/Router/UsersRouter.js')
const jobRouter = require('./src/Router/JobRouter.js');
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.get("/", (req, res) => {
    res.send("Server is running");
});

// ✅ Use absolute path for uploads
const uploadsPath = path.resolve(__dirname, "../Uploads"); 
// go up from src/ to project root uploads

console.log("Serving uploads from:", uploadsPath);

app.use("/uploads", express.static(uploadsPath));


app.use("/api/user", userRouter);
app.use("/api/jobs", jobRouter);

app.listen(port, () => {
    console.log("server is running on " + port);
});