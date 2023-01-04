var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const common = require("../common/common");
const admincontroller = require('../controller/admincontroller')
const app = express();
const multer = require('multer')  
app.use(bodyParser.urlencoded({ extended: true })) 


//multer
const storage = multer.memoryStorage({
 destination: function (req, file, cb) {
     cb(null, '')
 }
})

const filefilter = (req, file, cb) => {
 if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
     cb(null, true)
 } else {
     cb(null, false)
 }
}

const upload = multer({ storage: storage, fileFilter: filefilter });


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/adminlogin',admincontroller.login);
router.post('/createadmin',admincontroller.createAdmin);
router.get('/getprofile',common.checkAdmin,admincontroller.getProfile);
router.post('/updateprofile',common.postcheckAdmin,admincontroller.updateProfile);
router.get('/getallcampaigns',common.checkAdmin,admincontroller.getAllCampaigns);
router.post('/getcampaigndetails',common.postcheckAdmin,admincontroller.getCampaignDetails);
router.get('/getallinfluencers',common.checkAdmin,admincontroller.getAllInfluencers);
router.post('/getinfluencerdetails',common.postcheckAdmin,admincontroller.getInfluencerDetails);
router.get('/getallbrands',common.checkAdmin,admincontroller.getAllBrands);
router.post('/getbranddetails',common.postcheckAdmin,admincontroller.getBrandDetails);
// router.get('/getcampaigndetails',common.checkBrand,brandscontroller.getCampaignDetails);
// router.post('/addbillingaddress',common.postcheckBrand,brandscontroller.addBillingAddress);
// router.post('/updatebillingaddress',common.postcheckBrand,brandscontroller.updateBillingAddress);
// router.post('/deletebillingaddress',common.postcheckBrand,brandscontroller.deleteBillingAddress);
// router.post('/uploadimage',common.postcheckBrand, upload.single('profileimage'), brandscontroller.uploadImage);

module.exports = router;
