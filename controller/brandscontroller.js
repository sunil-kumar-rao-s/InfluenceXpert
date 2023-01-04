const {
    body,
    validationResult
  } = require("express-validator");
  const {
    sanitizeBody
  } = require("express-validator/filter");
  var path = require('path')
  const Aws = require('aws-sdk')    
  const Brands = require("../schema/brandschema");
  const multer = require('multer')            
  const Campaigns = require("../schema/campaign");
  const Influencer = require("../schema/influencer");
  
  const s3 = new Aws.S3({
    accessKeyId:"AKIA3LOZEMDNHC6HNRWA",              // accessKeyId that is stored in .env file
    secretAccessKey:"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"       // secretAccessKey is also store in .env file
})


  exports.createBrand = [
    sanitizeBody("brandName").trim(),
    sanitizeBody("email").trim(),
    sanitizeBody("phone").trim(),
    sanitizeBody("city").trim(),
    sanitizeBody("password").trim(),
    sanitizeBody("isVerified").trim(),
    async (req, res) => {
      try {
        let mobileNumberData = await Brands.findOne({
          $or: [{
            phone: req.body.phone,
            email: req.body.email
          }]
        });
        if (mobileNumberData) {
          res.status(203).json({
            status: false,
            message: "Email or phone number already exist."
          });
        } else {
          const user = new Brands({
            brandName: req.body.brandName,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            password: req.body.password,
            // isVerified: req.body.isVerified,
          });
          try {
            const data = await user.save();
            res.status(200).json({
              status: true,
              message: "User created successfully.",
              data
            });
          } catch (err) {
           
            res.status(203).json({
              status: false,
              message: "Could not able to create user.",
              error: err
            });
          }
        }
      } catch (err) {
        res.status(500).json({
          status: false,
          message: "Something went wrong!!!",
          error: err
        });
      }
    }
  ];
  
  exports.login = [
   
    async (req, res) => {
      try {
        let data = await Brands.findOne({
          email: req.body.email
        }, (err, client) => {
          if (err || !client) {
            return res.status(203).json({
              status: false,
              message: "User not registered."
            });
          }
          if (!client.autheticate(req.body.password)) {
            return res.status(203).json({
              status: false,
              message: "Invalid phone number or password."
            });
          }
         
  
          res.status(200).json({
            status: true,
            message: "User logged in successfully.",
            data: client
          });
        });
  
  
  
      } catch (err) {
        res.status(500).json({
            status: true,
            message: "User not logged in.",
            data: client
          });
      }
    }
  ];
  
  exports.getProfile = async (req, res) => {
    try {
      let data = await Brands.findOne({
        _id: req.query.brandId
      }).select("-password");
      res.status(200).json({
        status: true,
        profileData: data
      });
    } catch (err) {
      res.status(203).json({
        status: false,
        message: "Profile details not found."
      });
    }
  };

  exports.updateProfile = [
    sanitizeBody("brandId").trim(),
    sanitizeBody("userName").trim(),
    sanitizeBody("email").trim(),
    sanitizeBody("city").trim(),
    async (req, res) => {
      let updateValue = {
        brandName: req.body.brandName,
        email: req.body.email,
        phone: req.body.phone,
        emailNotifications:req.body.emailNotifications,
        pushNotifications:req.body.pushNotifications,
        city:req.body.city,
        brandRegId:req.body.brandRegId,
        brandGSTIN:req.body.brandGSTIN,
        brandWebsite:req.body.brandWebsite,
        brandBio:req.body.brandBio,
      };
      try {
        let data = await Brands.findOneAndUpdate({
          _id: req.body.brandId
        }, {
          $set: updateValue
        }, {
          new: true
        }).select("-password");
        if (data) {
          res.status(200).json({
            status: true,
            message: "Profile updated successfully.",
            data
          });
        } else {
          res.status(203).json({
            status: false,
            message: "requested user not found.",
            data
          });
        }
      } catch (err) {
        res.status(500).json({
          status: false,
          message: "Something went wrong!!!",
          error: err
        });
      }
    }
  ];

  exports.createCampaign = [
    sanitizeBody("campaignName").trim(),
    sanitizeBody("description").trim(),
    async (req, res) => {
      try {
          const  campaignid = Date.now() + req.body.brandId ;
          const campaign = new Campaigns({
            campaignId: campaignid,
            brandId : req.body.brandId,
            campaignName: req.body.campaignName,
            campaignType: req.body.campaignType,
            platform: req.body.platform,
            productCategory: req.body.productCategory,
            influencerType: req.body.influencerType,
            campaignDurationFrom: req.body.campaignDurationFrom,
            campaignDurationTo: req.body.campaignDurationTo,
            description: req.body.description,
            campaignStatus: req.body.campaignStatus,
            awardedTo: req.body.awardedTo,
            
            
          });
          try {
            const data = await campaign.save();
            res.status(200).json({
              status: true,
              message: "Campaign created successfully.",
              data
            });
          } catch (err) {
           
            res.status(203).json({
              status: false,
              message: "Could not able to create campaign.",
              error: err
            });
          }
        
      } catch (err) {
        res.status(500).json({
          status: false,
          message: "Something went wrong!!!",
          error: err
        });
      }
    }
  ];

  exports.updateCampaign = [
    sanitizeBody("campaignId").trim(),
    async (req, res) => {
      try {
         
          let campaign = {
            
            
            campaignName: req.body.campaignName,
            campaignType: req.body.campaignType,
            platform: req.body.platform,
            productCategory: req.body.productCategory,
            influencerType: req.body.influencerType,
            campaignDurationFrom: req.body.campaignDurationFrom,
            campaignDurationTo: req.body.campaignDurationTo,
            description: req.body.description,
           
            
            
          }
          let data = await Campaigns.findOneAndUpdate({
            campaignId: req.body.campaignId
          }, {
            $set: campaign
          }, {
            new: true
          })
          if (data) {
            res.status(200).json({
              status: true,
              message: "Campaign updated successfully.",
              data
            });
          } else {
            res.status(203).json({
              status: false,
              message: "Campaign not found.",
              data
            });
          }
      } catch (err) {
        res.status(500).json({
          status: false,
          message: "Something went wrong!!!",
          error: err
        });
      }
    }
  ];

  exports.getAllCampaigns = async (req, res) => {
    try {
      let data = await Campaigns.find({
        brandId: req.query.brandId
      });
      res.status(200).json({
        status: true,
        Campaigns: data
      });
    } catch (err) {
      res.status(203).json({
        status: false,
        message: "Campaigns not found."
      });
    }
  };

  exports.getCampaignDetails = async (req, res) => {
    try {
      let data = await Campaigns.findOne({
        campaignId: req.query.campaignId
      });
      res.status(200).json({
        status: true,
        Campaigns: data
      });
    } catch (err) {
      res.status(203).json({
        status: false,
        message: "Campaign not found."
      });
    }
  };

  exports.addBillingAddress = [
    sanitizeBody("brandId").trim(),
    
    async (req, res) => {
      let updateValue = {
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        city:req.body.city,
        state:req.body.state,
        
      };
      try {
        let data = await Brands.findOneAndUpdate({
          _id: req.body.brandId
        }, {
          $push: { "billingAddress": updateValue}
        }, {
          new: true
        });
        if (data) {
          res.status(200).json({
            status: true,
            message: "billing address updated successfully.",
            data
          });
        } else {
          res.status(203).json({
            status: false,
            message: "requested user not found.",
            data
          });
        }
      } catch (err) {
        res.status(500).json({
          status: false,
          message: "Something went wrong!!!",
          error: err
        });
      }
    }
  ];

  exports.updateBillingAddress = [
    sanitizeBody("brandId").trim(),
    
    async (req, res) => {
      let updateValue = {
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        city:req.body.city,
        state:req.body.state,
        
      };
      try {
        let data = await Brands.findOneAndUpdate({
          _id: req.body.brandId, "billingAddress._id":req.body.billingAddressId
        }, {
          $set: { "billingAddress.$": updateValue}
        }, {
          new: true
        });
        if (data) {
          res.status(200).json({
            status: true,
            message: "billing address updated successfully.",
            data
          });
        } else {
          res.status(203).json({
            status: false,
            message: "requested user not found.",
            data
          });
        }
      } catch (err) {
        res.status(500).json({
          status: false,
          message: "Something went wrong!!!",
          error: err
        });
      }
    }
  ];

  exports.deleteBillingAddress = [
    sanitizeBody("brandId").trim(),
    
    async (req, res) => {
     
      try {
        let data = await Brands.findOneAndUpdate({
          _id: req.body.brandId
        }, {
          $pull: { "billingAddress":{"_id":req.body.billingAddressId}}
        }, {
          new: true
        });
        if (data) {
          res.status(200).json({
            status: true,
            message: "billing address deleted successfully.",
            data
          });
        } else {
          res.status(203).json({
            status: false,
            message: "requested user not found.",
            data
          });
        }
      } catch (err) {
        res.status(500).json({
          status: false,
          message: "Something went wrong!!!",
          error: err
        });
      }
    }
  ];
 
  exports.uploadImage = [
    
    
    async (req, res) => {
     
      try{

        console.log("file---------------------------------"+ path.extname(req.file.originalname))
        const params = {
          Bucket:"influencexpert",      
          Key:req.body.brandId + path.extname(req.file.originalname),               // Name of the image
          Body:req.file.buffer,                    // Body which will contain the image in buffer format
          ACL:"public-read-write",                 // defining the permissions to get the public link
          ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
      };

      s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).send({"err":error})  
        }
        
        let camp = {
          profileImage:data.Location
        }
        
         let data1 =  Brands.findByIdAndUpdate({
          _id: req.body.brandId
        }, {
          profileImage:data.Location
        }, {
          new: true
        },function(err,dat){
          if(err){
            res.status(500).json({
              status: true,
              message: "Profile not updated successfully.",
             
              
            });
            
            }
            else{
              res.status(200).json({
                status: true,
                message: "Profile updated successfully.",
               
                
              });
          }
        })
  
        console.log("data1")
      
       
    })

   
       
      
    
    
}
      
      catch{
        res.status(203).json({
          status: false,
          message: "requested 8414887849 not found.",
         
        });

      }
    }
  ];

  exports.brandAction = [
    sanitizeBody("influencerId").trim(),
    sanitizeBody("campaignId").trim(),
    sanitizeBody("action").trim(),
    
    async (req, res) => {

      if(req.body.action == "accept"){
        Campaigns.findOneAndUpdate({
          campaignId: req.body.campaignId
        },{
         $set: {  "isReqOpen": "false", "awardedTo": req.body.influencerId}
       }, {
         new: true
       },function(err,resp){
         if(err){
          res.status(500).json({
            status: false,
            message: "something went wrong!!",
            
          });
         }
         else{
           Influencer.findOneAndUpdate({
            _id: req.body.influencerId, "requestedCampaigns.campaignId": req.body.campaignId
           },{
            $set: { "requestedCampaigns.$.campaignStatus" : "accepted"}
          }, {
            new: true
          },function(err,resp){
            if(err){
              console.log(err)
              res.status(500).json({
                status: false,
                message: "Something went wrong!!!",
                err
              });
            }
            else{
              res.status(200).json({
                status: true,
                message: " successfully.",
                
              });
            }
            })
         }
       });
      }
      else if(req.body.action == "reject"){
         Influencer.findOneAndUpdate({
           _id: req.body.influencerId, "requestedCampaigns.campaignId": req.body.campaignId
         },{
          $set: { "requestedCampaigns.$.campaignStatus" : "rejected"}
        }, {
          new: true
        },function(err,resp){
          if(err){
            res.status(500).json({
              status: false,
              message: "Something went wrong!!!",
              err
            });
          }
          else{
            Campaigns.findOneAndUpdate({
              campaignId: req.body.campaignId, "requests.influencerId": req.body.influencerId
            },{
             $set: {  "requests.$.influencerStatus": "rejected"}
           }, {
             new: true
           },function(err,resp){
             if(!err){
              res.status(200).json({
                status: true,
                message: "1successfully.",
                
              });
             }
           });
          }
        })
      }

      else{
        res.status(500).json({
          status: false,
          message: "you can either accept or reject only!!!",
          
        });
      }
      
      
    }
  ];