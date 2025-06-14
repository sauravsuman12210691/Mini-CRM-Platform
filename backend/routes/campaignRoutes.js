const express = require('express');
const router = express.Router();
const { createCampaign, getCampaigns } = require('../controllers/campaignController');

router.post('/', createCampaign);
router.get('/', getCampaigns);

module.exports = router;
