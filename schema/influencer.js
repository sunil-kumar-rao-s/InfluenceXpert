const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const influencerSchema = new Schema(
  {
    influencerName: { type: String, required: true },
    influencerBio: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    city: { type: String },
    encry_password: { type: String, required: true },
    lastActiveAt: {type:Date},
    influencerStatus: {type: String, default: true},
    emailNotifications: {type: String, default: "true"},
    pushNotifications: {type: String, default:"true"},
    isVerified: {type:String,default:"false"},
    gender: {type:String,default:"null"},
    Key: {type:String,default:"null"},
    salt: String,
    Ratings: {type:String,default:"0"},
    billingAddress: [{name: {type: String},  
                      address1: {type:String},  
                      address2: {type:String}, 
                      city: {type:String},  
                      state: {type:String}}],
    influencerPAN: { type: String },
    facebook: [{profileLink: {type: String},  
      profileName: {type:String},  
      followers: {type:String}, 
      bio: {type:String},
      pricePerPost: {type:String},
    isEnabled:{type:String,default:"false"}}],
    instagram: [{profileLink: {type: String},  
        profileName: {type:String},  
        followers: {type:String}, 
        bio: {type:String},
        pricePerPost: {type:String},
        isEnabled:{type:String,default:"false"}}], 
    youtube: [{profileLink: {type: String},  
          profileName: {type:String},  
          followers: {type:String}, 
          bio: {type:String},
          pricePerPost: {type:String},
          isEnabled:{type:String,default:"false"}}], 
    requestedCampaigns: [{campaignId: {type: String},  
                          campaignName: {type:String},  
                          campaignUrl: {type:String}, 
                          campaignStatus: {type:String}}],      
    // brandGSTIN: { type: String },
    // brandWebsite: { type: String },
    // isSessionActive:{type:String,default:"false"}

 //password: String,
    
  
     
  },
  {
    timestamps: true
  }
);

influencerSchema
.virtual("password")
.set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
})
.get(function () {
    return this._password;
});

  

influencerSchema.methods = {
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

module.exports = mongoose.model("influencers", influencerSchema);
