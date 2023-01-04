const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const adminschema = new Schema(
  {
    adminName: { type: String, required: true },
   
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String },
    privilege: { type: String },
    encry_password: { type: String, required: true },
    lastActiveAt: {type:Date},
    
    // Key: {type:String,default:"null"},
    
    salt: String,
     
  },
  {
    timestamps: true
  }
);

adminschema
.virtual("password")
.set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function () {
    return this._password;
});

  

adminschema.methods = {
  autheticate: function (plainpassword) {
    
    return this.securePassword(plainpassword) === this.encry_password;
},

securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("admins", adminschema);
