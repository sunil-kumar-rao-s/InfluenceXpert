// const Admin = require("../schema/adminmodel");
const Influencer = require('../schema/influencer');
const Brand = require('../schema/brandschema');
const Admin = require('../schema/adminschema');

// exports.checkAdmin = async (req, res, next) => {
//   try {
//     let data = await Admin.findOne({ _id: req.body.adminId });
    
//     if (data) {
//       next();
//     } else {
//       res.status(203).json({
//         status: false,
//         message: "This user is not an admin."
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//         status: false,
//         message: "Something went wrong!!!",
//         error:err
//       });
//   }
// };


exports.postcheckInfluencer = async (req, res, next) => {
  try {
    let data = await Influencer.findOne({ _id: req.body.influencerId });
    if (data) {
      next();
    } else {
      res.status(203).json({
        status: false,
        message: "This user is not an influencer."
      });
    }
  } catch (err) {
    res.status(500).json({
        status: false,
        message: "Something went wrong!!!",
        error:err
      });
  }
};

exports.checkInfluencer = async (req, res, next) => {
  try {
    let data = await Influencer.findOne({ _id: req.query.influencerId });
    if (data) {
      next();
    } else {
      res.status(203).json({
        status: false,
        message: "This user is not an influencer."
      });
    }
  } catch (err) {
    res.status(500).json({
        status: false,
        message: "Something went wrong!!!",
        error:err
      });
  }
};

exports.postcheckAdmin = async (req, res, next) => {
  try {
    let data = await Admin.findOne({ _id: req.body.adminId });
    if (data) {
      next();
    } else {
      res.status(203).json({
        status: false,
        message: "This user is not an admin."
      });
    }
  } catch (err) {
    res.status(500).json({
        status: false,
        message: "Something went wrong!!!",
        error:err
      });
  }
};

exports.checkAdmin = async (req, res, next) => {
  try {
    let data = await Admin.findOne({ _id: req.query.adminId });
    if (data) {
      next();
    } else {
      res.status(203).json({
        status: false,
        message: "This user is not an admin."
      });
    }
  } catch (err) {
    res.status(500).json({
        status: false,
        message: "Something went wrong!!!",
        error:err
      });
  }
};

// exports.calculateTotalAmount = async (transcationList) => {
//   let totalAmount = 0;
//   if (transcationList.length >0) {
//     await  transcationList.forEach((item) => {
//       if (item.isPaid){
//         totalAmount = totalAmount+ item.amount
//       }
//     });
//   }
//   return totalAmount;
// }


exports.checkBrand = async (req, res, next) => {
  try {
    let data = await Brand.findOne({ _id: req.query.brandId });
    if (data) {
        next();
      } else {
        res.status(203).json({
          status: false,
          message: "This user is not a brand."
        });
      }
  } catch (err) {
    res.status(200).json({
        status: false,
        message: "Something went wrong!!!",
        error:err
      });
  }
};

exports.postcheckBrand = async (req, res, next) => {
  try {
    let data = await Brand.findOne({ _id: req.body.brandId });
    if (data) {
        next();
      } else {
        res.status(203).json({
          status: false,
          message: "This user is not a brand."
        });
      }
  } catch (err) {
    res.status(200).json({
        status: false,
        message: "Something went wrong!!!",
        error:err
      });
  }
};

// exports.postcheckHost = async (req, res, next) => {
//   try {
//     let data = await Host.findOne({ _id: req.body.hostId });
    
//     if (data) {
//       if(data.hostStatus == "true"){
//         next();
//       }
//       else{
//         res.status(203).json({
//           status: false,
//           message: "This user is blocked."
//         });
//       }
     
//     } else {
//       res.status(203).json({
//         status: false,
//         message: "This user is not a host."
//       });
//     }
//   } catch (err) {
//     res.status(500).json({
//         status: false,
//         message: "Something went wrong!!!",
//         error:err
//       });
//   }
// };