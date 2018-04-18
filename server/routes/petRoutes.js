const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

const Pet = mongoose.model('pets');
module.exports = app => {
    app.get('/api/dashboard',requireLogin, async(req,res)=>{
        const pets =await Pet.find();
        //console.log("pets "+pets);
        res.send(pets);

    });

    app.get('/api/pet/:name',requireLogin, async(req,res)=>{
        console.log("Request!!!!!!!"+JSON.stringify(req.params));
        let petName=req.params.name;
        //console.log(petName);
        var query  = Pet.where({ name: petName }); 
        const singlePet =await query.findOne();
            
        //const singlePet =await Pet.findOne({name : "Charm"});
        console.log("pets "+singlePet);
        res.send(singlePet);
    });

};
