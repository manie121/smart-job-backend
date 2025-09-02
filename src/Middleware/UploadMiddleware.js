const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Go one level up from /src/Middleware to /src
        cb(null, path.resolve(__dirname, "../../Uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


// Only allow images
const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Only .jpeg, .jpg, .png allowed!"));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter
});

module.exports = upload;