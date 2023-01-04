var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const common = require("../common/common");
const brandscontroller = require('../controller/brandscontroller')
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


router.post('/addbrand',brandscontroller.createBrand);
router.post('/brandlogin',brandscontroller.login);
router.get('/getprofile',common.checkBrand,brandscontroller.getProfile);
router.post('/updateprofile',common.postcheckBrand,brandscontroller.updateProfile);
router.post('/createcampaign',common.postcheckBrand,brandscontroller.createCampaign);
router.post('/updatecampaign',common.postcheckBrand,brandscontroller.updateCampaign);
router.get('/getallcampaigns',common.checkBrand,brandscontroller.getAllCampaigns);
router.get('/getcampaigndetails',common.checkBrand,brandscontroller.getCampaignDetails);
router.post('/addbillingaddress',common.postcheckBrand,brandscontroller.addBillingAddress);
router.post('/updatebillingaddress',common.postcheckBrand,brandscontroller.updateBillingAddress);
router.post('/deletebillingaddress',common.postcheckBrand,brandscontroller.deleteBillingAddress);
router.post('/deletebillingaddress',common.postcheckBrand,brandscontroller.deleteBillingAddress);
router.post('/brandaction',common.postcheckBrand,brandscontroller.brandAction);
router.post('/uploadimage',common.postcheckBrand, upload.single('profileimage'), brandscontroller.uploadImage);

module.exports = router;
