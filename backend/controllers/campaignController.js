const createCampaign = async (req, res) => {
  res.status(200).json({ message: 'Campaign created (mock)' });
};

const getCampaigns = async (req, res) => {
  res.status(200).json({ message: 'List of campaigns (mock)' });
};

module.exports = {
  createCampaign,
  getCampaigns,
};
