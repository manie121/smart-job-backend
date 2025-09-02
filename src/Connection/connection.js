const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://manie88513:mani121@cluster.zcznhsu.mongodb.net/?retryWrites=true&w=majority&appName=cluster')
.then(()=> console.log("connected successfully"))
.catch((err)=>{
    console.error("Data connection failed:", err);
});

module.exports = mongoose;