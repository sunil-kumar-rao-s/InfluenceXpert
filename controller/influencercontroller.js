const {
    body,
    validationResult
  } = require("express-validator");
  const {
    sanitizeBody
  } = require("express-validator/filter");

  const Influencer = require("../schema/influencer");
  
  const Campaigns = require("../schema/campaign");




exports.createInfluencer = [
    sanitizeBody("influencerName").trim(),
    sanitizeBody("email").trim(),
    sanitizeBody("phone").trim(),
    sanitizeBody("city").trim(),
    sanitizeBody("password").trim(),
    sanitizeBody("isVerified").trim(),
    async (req, res) => {
      try {
        let mobileNumberData = await Influencer.findOne({
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
          const user = new Influencer({
            influencerName: req.body.influencerName,
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
              message: "Influencer created successfully.",
              data
            });
          } catch (err) {
           
            res.status(203).json({
              status: false,
              message: "Could not able to create Influencer.",
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
        let data = await Influencer.findOne({
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
      let data = await Influencer.findOne({
        _id: req.query.influencerId
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
    sanitizeBody("influencerId").trim(),
    sanitizeBody("userName").trim(),
    sanitizeBody("email").trim(),
    sanitizeBody("city").trim(),
    async (req, res) => {
      let updateValue = {
        influencerName: req.body.influencerName,
        email: req.body.email,
        phone: req.body.phone,
        emailNotifications:req.body.emailNotifications,
        pushNotifications:req.body.pushNotifications,
        city:req.body.city,
        influencerBio:req.body.influencerBio,
        gender:req.body.gender,
        
      };
      try {
        let data = await Influencer.findOneAndUpdate({
          _id: req.body.influencerId
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

  exports.getAllCampaigns = async (req, res) => {
    try {
        console.log(req.body)
      let data = await Campaigns.find({
        "campaignStatus" : req.body.campaignStatus,"platform": {$all: req.body.platform}
      }).populate();
      res.status(200).json({
        status: true,
        Campaigns: data
      });
    } catch (err) {
      res.status(203).json({
        status: false,
        message: "Campaigns not found.",
        error:err
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

  exports.facebookDetails = [
    sanitizeBody("influencerId").trim(),
    
    async (req, res) => {
      let updateValue = {
        profileName: req.body.profileName,
        profileLink: req.body.profileLink,
        followers: req.body.followers,
        bio:req.body.bio,
        isEnabled:req.body.isEnabled,
        pricePerPost:req.body.pricePerPost,
        
      };
      try {
        let data = await Influencer.findOneAndUpdate({
          _id: req.body.influencerId
        }, {
          $push: { "facebook": updateValue}
        }, {
          new: true
        });
        if (data) {
          res.status(200).json({
            status: true,
            message: "facebook details updated successfully.",
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

  exports.instagramDetails = [
    sanitizeBody("influencerId").trim(),
    
    async (req, res) => {
      let updateValue = {
        profileName: req.body.profileName,
        profileLink: req.body.profileLink,
        followers: req.body.followers,
        bio:req.body.bio,
        isEnabled:req.body.isEnabled,
        pricePerPost:req.body.pricePerPost,
        
      };
      try {
        let data = await Influencer.findOneAndUpdate({
          _id: req.body.influencerId
        }, {
          $push: { "instagram": updateValue}
        }, {
          new: true
        });
        if (data) {
          res.status(200).json({
            status: true,
            message: "instagram details updated successfully.",
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

  exports.youtubeDetails = [
    sanitizeBody("influencerId").trim(),
    
    async (req, res) => {
      let updateValue = {
        profileName: req.body.profileName,
        profileLink: req.body.profileLink,
        followers: req.body.followers,
        bio:req.body.bio,
        isEnabled:req.body.isEnabled,
        pricePerPost:req.body.pricePerPost,
        
      };
      try {
        let data = await Influencer.findOneAndUpdate({
          _id: req.body.influencerId
        }, {
          $push: { "youtube": updateValue}
        }, {
          new: true
        });
        if (data) {
          res.status(200).json({
            status: true,
            message: "youtube details updated successfully.",
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

  exports.addBillingAddress = [
    sanitizeBody("influencerId").trim(),
    
    async (req, res) => {
      let updateValue = {
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        city:req.body.city,
        state:req.body.state,
        
      };
      try {
        let data = await Influencer.findOneAndUpdate({
          _id: req.body.influencerId
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
    sanitizeBody("influencerId").trim(),
    
    async (req, res) => {
      let updateValue = {
        name: req.body.name,
        address1: req.body.address1,
        address2: req.body.address2,
        city:req.body.city,
        state:req.body.state,
        
      };
      try {
        let data = await Influencer.findOneAndUpdate({
          _id: req.body.influencerId, "billingAddress._id":req.body.billingAddressId
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
    sanitizeBody("influencerId").trim(),
    
    async (req, res) => {
     
      try {
        let data = await Influencer.findOneAndUpdate({
          _id: req.body.influencerId
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
          Key:req.body.influencerId + path.extname(req.file.originalname),               // Name of the image
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
        
         let data1 =  Influencer.findByIdAndUpdate({
          _id: req.body.influencerId
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

  exports.requestCampaign = [
    sanitizeBody("influencerId").trim(),
    sanitizeBody("influencerName").trim(),
    sanitizeBody("influencerUrl").trim(),
    sanitizeBody("influencerPrice").trim(),
    sanitizeBody("campaignId").trim(),
    sanitizeBody("campaignName").trim(),
    sanitizeBody("campaignURL").trim(),
    
    async (req, res) => {
      
      let createRequest = {
        influencerId: req.body.influencerId,
        influencerName: req.body.influencerName,
        influencerUrl: req.body.influencerUrl,
        influencerPrice: req.body.influencerPrice,
        influencerStatus: "requested"
      }

      let sentRequest = {
        campaignId: req.body.campaignId,
        campaignName: req.body.campaignName,
        campaignURL: req.body.campaignURL,
        campaignStatus: "requested"
      }

      try {
        let data =await Campaigns.findOneAndUpdate({
          campaignId: req.body.campaignId
        }, {
          $addToSet: { "requests":createRequest}
        }, {
          new: true
        }, function(err,resp){
          if(err){
            res.status(500).json({
              status: false,
              message: "Something went wrong!!!",
              err
            });
          }
          else{
            Influencer.findOneAndUpdate({
              _id:req.body.influencerId
            },{
              $addToSet:{"requestedCampaigns" : sentRequest}
            },{new:true},function(err,resp){
              if(err){
                res.status(500).json({
                  status: false,
                  message: "Something went wrong!!",
                  err
                });
              }
              else{
                
                  res.status(200).json({
                    status: true,
                    message: "request created!!!!!!!!!!!!!!!!!!",
                    data
                  });
                
              }
            })
            
          }
          
        });

        
        
      } catch (err) {
        res.status(500).json({
          status: false,
          message: "Something went wrong!!!",
          error: err
        });
      }
    }
  ];

  exports.updatePassword = [
    sanitizeBody("influencerId").trim(),
    sanitizeBody("oldPassword").trim(),
    sanitizeBody("newPassword").trim(),
    async (req, res) => {
      try {
        let data = await Influencer.findOne({
          _id: req.body.influencerId,
  
        }, (err, client) => {
  
          if (!client.autheticate(req.body.oldPassword)) {
            return res.status(203).json({
              status: false,
              message: "Old password doesnt match.",
  
            });
          } else {
  
            client.password = req.body.newPassword;
            client.save();
            return res.status(200).json({
              status: true,
              message: "Password changed Successfully.",
            });
          }
        });
      } catch (err) {
        res.status(500).json({
          status: false,
          message: "Something went wrong!!!",
          error: err
        });
      }
    }
  ];