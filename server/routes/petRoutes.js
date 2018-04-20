const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');

const Pet = mongoose.model('pets');
const UserPet = mongoose.model('userpets');

module.exports = app => {
    app.get('/api/dashboard',requireLogin, async(req,res)=>{
        //console.log("Req"+req.user.googleId);
        const userpets =await UserPet.find({ userGoogleId: req.user.googleId});
       // console.log("typeof userpets"+typeof(userpets));
        let petIdlist=[];
        userpets.forEach(function(p) { petIdlist.push(p.pet_id); } )
        let pets = await Pet.find({"pet_id": {$in : petIdlist} });
        //console.log("Dashboard pets "+pets);
        res.send(pets);

    });

    app.get('/api/type/:type',requireLogin, async(req,res)=>{

        let type=req.params.type;
        console.log("/api/type/:type "+type);
        let pets=[];
        const userpets =await UserPet.find({ userGoogleId: req.user.googleId});
        let petIdlist=[];
        userpets.forEach(function(p) { petIdlist.push(p.pet_id); } )
        if(type>=0){
            var query  = Pet.where({ typeOfPet: type, "pet_id": {$nin : petIdlist} }); 
             pets =await query.find();
        }
        else{
            pets =await Pet.find({"pet_id": {$nin : petIdlist}});
        }
       
            
        console.log("cats "+pets);
        res.send(pets);
        

    });


    

    app.get('/api/pet/:petId',requireLogin, async(req,res)=>{
        console.log("Request!!!!!!!"+JSON.stringify(req.params));
        let petId=req.params.petId;
        console.log(petId);
        var query  = Pet.where({ pet_id: petId }); 
        let x =await query.findOne();
        let singlePet={};
        singlePet.testimonials=x.testimonials;
        x._id=x._id;
        singlePet.pet_id=x.pet_id;
        singlePet.name=x.name;
        singlePet.typeOfPet=x.typeOfPet;
        singlePet.gender=x.gender;
        singlePet.noOfTimesToFeed=x.noOfTimesToFeed;
        singlePet.noOfTimesToWalk=x.noOfTimesToWalk;
        singlePet.profilephotoLink=x.profilephotoLink;
        singlePet.description=x.description;

        const userpets =await UserPet.find({ userGoogleId: req.user.googleId});
        let petIdlist=[];
        userpets.forEach(function(p) { petIdlist.push(p.pet_id); } )
        if(petIdlist.indexOf(singlePet.pet_id)>-1){
            console.log("This is users pet");
            singlePet['userspet']=true;
           
        }
        else{
            console.log("This is not users pet");
            singlePet['userspet']=false;
        }
            
        //const singlePet =await Pet.findOne({name : "Charm"});
        console.log(singlePet);
        res.send(singlePet);
    });

};
