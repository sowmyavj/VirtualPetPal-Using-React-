const requireLogin = require('../middlewares/requireLogin');
const GoodieModel = require('../models/UserGoodies');

module.exports = app => {
    app.get('/api/user/goodies', requireLogin,async (req, res) => {
        let userGoodies = await GoodieModel.getUserGoodie(req.user.googleId);
        res.send(userGoodies);

    });
};