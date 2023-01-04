var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const common = require("../common/common");
const influencercontroller = require('../controller/influencercontroller')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))



router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/addinfluencer',influencercontroller.createInfluencer);
router.post('/influencerlogin',influencercontroller.login);
router.get('/getprofile',common.checkInfluencer,influencercontroller.getProfile);
router.post('/updateprofile',common.postcheckInfluencer,influencercontroller.updateProfile);
router.post('/facebookdetails',common.postcheckInfluencer,influencercontroller.facebookDetails);
router.post('/instagramdetails',common.postcheckInfluencer,influencercontroller.instagramDetails);
router.post('/youtubedetails',common.postcheckInfluencer,influencercontroller.youtubeDetails);
router.post('/campaignfilters',influencercontroller.getAllCampaigns);
router.post('/addbillingaddress',common.postcheckInfluencer,influencercontroller.addBillingAddress);
router.post('/updatebillingaddress',common.postcheckInfluencer,influencercontroller.updateBillingAddress);
router.post('/deletebillingaddress',common.postcheckInfluencer,influencercontroller.deleteBillingAddress);
router.post('/requestcampaign',common.postcheckInfluencer,influencercontroller.requestCampaign);



module.exports = router;
