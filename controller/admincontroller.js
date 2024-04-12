const {
    body,
    validationResult
  } = require("express-validator");
  const {
    sanitizeBody
  } = require("express-validator/filter");
  var hbs = require('nodemailer-express-handlebars');
  var path = require('path')
  const nodemailer = require("nodemailer");   
  const Brands = require("../schema/brandschema");
  const Admin = require("../schema/adminschema");      
  const Campaigns = require("../schema/campaign");    
  const Influencers = require("../schema/influencer");



  exports.createAdmin = [
    sanitizeBody("adminName").trim(),
    sanitizeBody("email").trim(),
    sanitizeBody("phone").trim(),
    sanitizeBody("password").trim(),
 
    async (req, res) => {
      try {
        let mobileNumberData = await Admin.findOne({
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
          const user = new Admin({
            adminName: req.body.adminName,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            // isVerified: req.body.isVerified,
          });
          try {
            const data = await user.save();
            res.status(200).json({
              status: true,
              message: "admin created successfully.",
              data
            });
          } catch (err) {
           
            res.status(203).json({
              status: false,
              message: "Could not able to create admin.",
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
        let data = await Admin.findOne({
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
      let data = await Admin.findOne({
        _id: req.query.adminId
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
        adminName: req.body.adminName,
        
      };
      try {
        let data = await Admin.findOneAndUpdate({
          _id: req.body.adminId
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
            message: "requested admin not found.",
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
      let data = await Campaigns.find({});
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
        campaignId: req.body.campaignId
      });
      res.status(200).json({
        status: true,
        Campaign: data
      });
    } catch (err) {
      res.status(203).json({
        status: false,
        message: "Campaign not found."
      });
    }
  };

  exports.getAllInfluencers = async (req, res) => {
    try {
      let data = await Influencers.find({});
      res.status(200).json({
        status: true,
        influencers: data
      });
    } catch (err) {
      res.status(203).json({
        status: false,
        message: "Campaigns not found."
      });
    }
  };

  exports.getInfluencerDetails = async (req, res) => {
    try {
      let data = await Influencers.findOne({
        _id: req.body.influencerId
      });
      res.status(200).json({
        status: true,
        influencer: data
      });
    } catch (err) {
      res.status(203).json({
        status: false,
        message: "influencer not found."
      });
    }
  };
  
  exports.getAllBrands = async (req, res) => {
    try {
      let data = await Brands.find({});
      res.status(200).json({
        status: true,
        brands: data
      });
    } catch (err) {
      res.status(203).json({
        status: false,
        message: "Campaigns not found."
      });
    }
  };

  exports.getBrandDetails = async (req, res) => {
    try {
      let data = await Brands.findOne({
        _id: req.body.brandId
      });
      res.status(200).json({
        status: true,
        brand: data
      });
    } catch (err) {
      res.status(203).json({
        status: false,
        message: "influencer not found."
      });
    }
  };


  exports.sendEmails = [
    sanitizeBody("text").trim(),
    
    async (req, res) => {
      let transporter = nodemailer.createTransport({
        host: "feedmyev.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "sunil@feedmyev.com", // generated ethereal user
          pass: "$unil'soff!ce", // generated ethereal password
        },
      });
      sut = hbs({
        viewEngine: {
          partialsDir: 'partials/',
          defaultLayout: false
        },
        viewPath: path.resolve(__dirname, '../email_template')
    });

        transporter.use('compile', sut);
      try {

        let info = await transporter.sendMail({
          from: 'sunil@feedmyev.com', // sender address
          to: req.body.to, // list of receivers
          subject: "Hello ✔", // Subject line
          template:"index", // plain text body
          
          context: {
                   
            username : req.body.username
                               
            
                          
            }
        },function(err,resp){
          if(err){
            console.log(err);
          }
          else{
            res.status(200).json({
              status: true,
              message: "Sent!!!!",
              
            });
          }
        });
        
      
     
      } catch (err) {
        console.log(err)
        res.status(500).json({
          status: false,
          message: "Something went wrong!!!",
          error: err
        });
      }
    }
  ];