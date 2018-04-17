const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

const Pet = mongoose.model('pets');
module.exports = app => {
    app.get('/api/dashboard',requireLogin, async(req,res)=>{
        const pets =await Pet.find();
        console.log("pets "+pets);
        res.send(pets);

    });

};
