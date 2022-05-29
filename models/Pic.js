const mongoose = require("mongoose");

const picSchema = new mongoose.Schema({
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
   },
   picUrl:{
       type:String,
       required:true,

   },
   code:{
      type: String,
      required:true ,
      unique: true
   }
});

module.exports = mongoose.model("Pic", picSchema);
