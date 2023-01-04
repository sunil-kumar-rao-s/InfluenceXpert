const mongoose = require("mongoose");
const { Schema } = mongoose;
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const Campaign = new Schema(
  {
    campaignId: { type: String, required: true, unique: true }, 
    brandId: { type: String, required: true }, 
    campaignName: { type: String, required: true },
    campaignType: { type: String, required: true },
    platform: { type: String, required: true },
    productCategory: { type: String, required: true },
    influencerType: { type: String, required: true },
    campaignDurationFrom: { type: String, required: true },
    campaignDurationTo: { type: String, required: true },
    description: { type: String, required: true },
    campaignStatus: { type: String, default: "created" }, //created,assigned,ongoing,completed
    awardedTo: { type: String, default: "none" }, //here comes the influencer id 
    isVerified: { type: String, default: "false" },
    progress: { type: String, default: "0" }, //will be updated by influencer
    requests: [{influencerId : {type : String},
               influencerName : {type : String},
               influencerUrl : {type : String},
               influencerStatus : {type : String, default:"null"},
               influencerPrice : {type : String}
              
              }],
    isReqOpen: {type: String, default : "true"}          
  },
  {
    timestamps: true
  }
);



module.exports = mongoose.model("CAmpaigns", Campaign);
