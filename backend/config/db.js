const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/socialmedia", { useNewUrlParser: true, useUnifiedTopology: true, })
 console.log("Mongoose connected ")
  } catch (err) {
    console.log(err.message)
process.exit()
  }
};


module.exports  = connectDB
