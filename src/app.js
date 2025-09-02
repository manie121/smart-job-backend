const express = require('express');
const cors = require('cors');
const path = require("path");
const { default: connectDB } = require('./Connection/connection');

const app = express();
require('./Connection/connection');

const userRouter = require('./Router/userRouter');
const jobRouter = require('./Router/JobRouter');
const port = 4000;

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