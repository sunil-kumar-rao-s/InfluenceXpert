const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const BrandSchema = new Schema(
  {
    brandName: { type: String, required: true },
    brandBio: { type: String},
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    city: { type: String },
    encry_password: { type: String, required: true },
    lastActiveAt: {type:Date},
    brandStatus: {type: String, default: true},
    emailNotifications: {type: String, default: "true"},
    pushNotifications: {type: String, default:"true"},
    isVerified: {type:String,default:"false"},
    Key: {type:String,default:"null"},
    profileImage: { type: String,default:"null" },
    Ratings: {type:String,default:"0"},
    salt: String,
    billingAddress: [{name: {type: String},  
                      address1: {type:String},  
                      address2: {type:String}, 
                      city: {type:String},  
                      state: {type:String}}],
    brandRegId: { type: String },
    brandGSTIN: { type: String },
    brandWebsite: { type: String },
    // isSessionActive:{type:String,default:"false"}

 //password: String,
    
  
     
  },
  {
    timestamps: true
  }
);

BrandSchema
.virtual("password")
.set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function () {
    return this._password;
});

  

BrandSchema.methods = {
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

module.exports = mongoose.model("Brands", BrandSchema);
