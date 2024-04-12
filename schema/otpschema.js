const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const otpSchema = new Schema(
  {
    email: { type: String }, 
    otp: { type: String }, 
            
  },
  {
    timestamps: true
  }
);



module.exports = mongoose.model("otp", otpSchema);
