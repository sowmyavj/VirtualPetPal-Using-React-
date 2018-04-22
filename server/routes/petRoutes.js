const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const UserPetModel = require('../models/UserPets');
const PetModel = require('../models/Pet');

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
       
            
        //console.log("cats "+pets);
        res.send(pets);
        

    });
    app.get('/api/userpet/:petId',requireLogin, async(req,res)=>{
        let petId=req.params.petId;
        let userId = req.user.googleId;
        let userpet={};
        let userpetInfo = await UserPetModel.getUserPet(userId,petId);
        userpet._id= userpetInfo._id;
        userpet.userGoogleId=userpetInfo.userGoogleId;
        userpet.pet_id= userpetInfo.pet_id;
        userpet.noOfTimesFed = userpetInfo.noOfTimesFed;
        userpet.noOfTimesPetted = userpetInfo.noOfTimesPetted;
        userpet.noOfTimesWalked = userpetInfo.noOfTimesWalked;
        userpet.happinessLevel = userpetInfo.happinessLevel;
        userpet.currentDate = userpetInfo.currentDate;
        userpet.__v = userpetInfo.__v ;


        let pet = await PetModel.getPet(petId);
        let feedProgress= await UserPetModel.getfedProgress(pet.noOfTimesToFeed, userpet.noOfTimesFed)
        //console.log("feedProgress "+feedProgress);
        let walkProgress= await UserPetModel.getWalkProgress(pet.noOfTimesToWalk, userpet.noOfTimesWalked)
        let petProgress= await UserPetModel.getPetProgress(pet.noOfTimesToPet, userpet.noOfTimesPetted)

        userpet.feedProgress = feedProgress;
        userpet.walkProgress = walkProgress;
        userpet.petProgress = petProgress;
        userpet['userspet']=true;

        //console.log("userpet  "+JSON.stringify(userpet));

        res.send(userpet);

    
    });
    app.get('/api/pet/:petId',requireLogin, async(req,res)=>{
        //console.log("Request!!!!!!!"+JSON.stringify(req.params));
        let petId=req.params.petId;
        //console.log(petId);
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
        //console.log(singlePet);
        res.send(singlePet);
    });

    app.post('/api/pet/feed/:petId',requireLogin, async(req,res)=>{
        //console.log("inside post user pet");
        let petId=req.params.petId;
        let userId = req.user.googleId;
        const updatePetFeed = await UserPetModel.feedUserPet(userId,petId);
        let userpet ={};
        let userpetInfo= await UserPetModel.getUserPet(userId, petId);
        userpet._id= userpetInfo._id;
        userpet.userGoogleId=userpetInfo.userGoogleId;
        userpet.pet_id= userpetInfo.pet_id;
        userpet.noOfTimesFed = userpetInfo.noOfTimesFed;
        userpet.noOfTimesPetted = userpetInfo.noOfTimesPetted;
        userpet.noOfTimesWalked = userpetInfo.noOfTimesWalked;
        userpet.happinessLevel = userpetInfo.happinessLevel;
        userpet.currentDate = userpetInfo.currentDate;
        userpet.__v = userpetInfo.__v ;


        let pet = await PetModel.getPet(petId);
        let feedProgress= await UserPetModel.getfedProgress(pet.noOfTimesToFeed, userpet.noOfTimesFed)
        //console.log("feedProgress "+feedProgress);
        let walkProgress= await UserPetModel.getWalkProgress(pet.noOfTimesToWalk, userpet.noOfTimesWalked)
        let petProgress= await UserPetModel.getPetProgress(pet.noOfTimesToPet, userpet.noOfTimesPetted)

        userpet.feedProgress = feedProgress;
        userpet.walkProgress = walkProgress;
        userpet.petProgress = petProgress;
        userpet['userspet']=true;

        //console.log("post userpet"+userpet);
        res.send(userpet);
    });

    app.post('/api/pet/pet/:petId',requireLogin, async(req,res)=>{
        let petId=req.params.petId;
        let userId = req.user.googleId;
        const updatePetFeed = await UserPetModel.petUserPet(userId,petId);
        let userpet ={};
        let userpetInfo= await UserPetModel.getUserPet(userId, petId);
        userpet._id= userpetInfo._id;
        userpet.userGoogleId=userpetInfo.userGoogleId;
        userpet.pet_id= userpetInfo.pet_id;
        userpet.noOfTimesFed = userpetInfo.noOfTimesFed;
        userpet.noOfTimesPetted = userpetInfo.noOfTimesPetted;
        userpet.noOfTimesWalked = userpetInfo.noOfTimesWalked;
        userpet.happinessLevel = userpetInfo.happinessLevel;
        userpet.currentDate = userpetInfo.currentDate;
        userpet.__v = userpetInfo.__v ;


        let pet = await PetModel.getPet(petId);
        let feedProgress= await UserPetModel.getfedProgress(pet.noOfTimesToFeed, userpet.noOfTimesFed)
        //console.log("feedProgress "+feedProgress);
        let walkProgress= await UserPetModel.getWalkProgress(pet.noOfTimesToWalk, userpet.noOfTimesWalked)
        let petProgress= await UserPetModel.getPetProgress(pet.noOfTimesToPet, userpet.noOfTimesPetted)

        userpet.feedProgress = feedProgress;
        userpet.walkProgress = walkProgress;
        userpet.petProgress = petProgress;
        userpet['userspet']=true;

        res.send(userpet);
    });

    app.post('/api/pet/walk/:petId',requireLogin, async(req,res)=>{
        let petId=req.params.petId;
        let userId = req.user.googleId;
        const updatePetFeed = await UserPetModel.walkUserPet(userId,petId);
        let userpet ={};
        let userpetInfo=await UserPetModel.getUserPet(userId, petId);
        userpet._id= userpetInfo._id;
        userpet.userGoogleId=userpetInfo.userGoogleId;
        userpet.pet_id= userpetInfo.pet_id;
        userpet.noOfTimesFed = userpetInfo.noOfTimesFed;
        userpet.noOfTimesPetted = userpetInfo.noOfTimesPetted;
        userpet.noOfTimesWalked = userpetInfo.noOfTimesWalked;
        userpet.happinessLevel = userpetInfo.happinessLevel;
        userpet.currentDate = userpetInfo.currentDate;
        userpet.__v = userpetInfo.__v ;


        let pet = await PetModel.getPet(petId);
        let feedProgress= await UserPetModel.getfedProgress(pet.noOfTimesToFeed, userpet.noOfTimesFed)
        //console.log("feedProgress "+feedProgress);
        let walkProgress= await UserPetModel.getWalkProgress(pet.noOfTimesToWalk, userpet.noOfTimesWalked)
        let petProgress= await UserPetModel.getPetProgress(pet.noOfTimesToPet, userpet.noOfTimesPetted)

        userpet.feedProgress = feedProgress;
        userpet.walkProgress = walkProgress;
        userpet.petProgress = petProgress;
        userpet['userspet']=true;

        res.send(userpet);
    });
    app.post('/api/pet/add/:petId',requireLogin, async(req,res)=>{

        let petId=req.params.petId;
        let userId = req.user.googleId;
        console.log("Server route addPet "+petId);
        let userpet ={};

        const addedUserPetInfo = await UserPetModel.addPet(userId,petId);
        userpet._id= addedUserPetInfo._id;
        userpet.userGoogleId=addedUserPetInfo.userGoogleId;
        userpet.pet_id= addedUserPetInfo.pet_id;
        userpet.noOfTimesFed = addedUserPetInfo.noOfTimesFed;
        userpet.noOfTimesPetted = addedUserPetInfo.noOfTimesPetted;
        userpet.noOfTimesWalked = addedUserPetInfo.noOfTimesWalked;
        userpet.happinessLevel = addedUserPetInfo.happinessLevel;
        userpet.currentDate = addedUserPetInfo.currentDate;
        userpet.feedProgress = 0;
        userpet.walkProgress = 0;
        userpet.petProgress = 0;
        userpet['userspet']=true;

        console.log("Post add pet: "+JSON.stringify(userpet));
        res.send(userpet);

    });

};
