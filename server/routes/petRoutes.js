const axios = require ('axios');
const requireLogin = require('../middlewares/requireLogin');
const mongoose = require('mongoose');
const UserPetModel = require('../models/UserPets');
const PetModel = require('../models/Pet');
const GoodieModel = require('../models/UserGoodies');
const UserModel = require('../models/User');
const async = require('async');
const maxworkers = require('os').cpus().length;

const Pet = mongoose.model('pets');
const UserPet = mongoose.model('userpets')
const http = require('https')

const redis = require("redis");
const client = redis.createClient();
const bluebird = require("bluebird");


const im = require('imagemagick');
const fs = require('fs');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
bluebird.promisifyAll(fs);


let petImagesFetched=false;
let productImagesFetched=false;

function resize(params) {
    // console.log("resize")
    var queue = async.queue(resizeimg, maxworkers);
  
    fs.readdir(params.src, function(err, files) {
      files.forEach(function(file) {
        //   console.log("pushing file "+file)
        queue.push({
          src: params.src+file,
          dest: params.dest+file,
          width: params.width,
          height: params.height
        })
      });
    });
  }

  function resizeimg(params, cb) {
    // console.log("resizeimg")
    var imoptions = {
      srcPath: params.src,
      dstPath: params.dest
    };
    // console.log(imoptions)
    if (params.width !== undefined) imoptions.width = params.width;
    if (params.height !== undefined) imoptions.height = params.height;
    // console.log("before im.resize")
    im.resize(imoptions, cb);
    // console.log("after im.resize")
  }

const populateImages = async()=>{
    // console.log("petImagesFetched "+petImagesFetched);
    
    if(!petImagesFetched){
        // console.log("No images available yet.. fetching")
        petImagesFetched=true;
    //     const allpets=await Pet.find();
        let path=process.cwd();
        path+="/client/public/images/";
    //    for(var i=0;i<allpets.length;i++){
           
    //        let link="https://unsplash.com/photos/";
    //         link=link+allpets[i].profilephotoLink+"/download?force=true";
    //         let filename=path+allpets[i].profilephotoLink+".jpg"
    //         const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true'
    //     //     var imageRes = await axios({
    //     //         method: 'GET',
    //     //         url: link,
    //     //         responseType: 'stream'
    //     //     })
    //     //    imageRes.data.pipe(fs.createWriteStream(filename));
    //         console.log("finsihed writing image" + filename)
    //     }
        // console.log(path);
        // console.log(path+"/resized");
        resize({
            src: path+"pets/",
            dest: path,
            width: 375,
            height:286
          });
    //    console.log("End promise execution");
    }
}

module.exports = app => {
    app.get('/api/dashboard',requireLogin, async(req,res)=>{
        console.log("Dashboard");
       populateImages();
       const userpets =await UserPet.find({ userGoogleId: req.user.googleId});
       // console.log("typeof userpets"+typeof(userpets));
        let petIdlist=[];
        userpets.forEach(function(p) { petIdlist.push(p.pet_id); } );
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
        singlePet.noOfTimesToPet=x.noOfTimesToPet;
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
        await UserPetModel.updateUserPetHappiness(userId,petId);
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
        // console.log("/api/pet/pet/:petId ");
        let petId=req.params.petId;
        let userId = req.user.googleId;
        
        const updatePetFeed = await UserPetModel.petUserPet(userId,petId);
        await UserPetModel.updateUserPetHappiness(userId,petId);
        // console.log("/api/pet/pet/:petId 111 "+updatePetFeed);
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
        //console.log("feedProgress "+feedProgress);
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
        await UserPetModel.updateUserPetHappiness(userId,petId);
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

        //console.log("Post add pet: "+JSON.stringify(userpet));
        res.send(userpet);

    });

    app.post('/api/addgoodies',requireLogin, async(req,res)=>{
       
        //clearing out the cache
        let flushed = await client.flushdbAsync();
        console.log("/api/addgoodies ");
        console.log(flushed)
       

        let user=req.user;
        let products=req.body.products;
        //console.log(user);
        console.log(products);
        console.log(products[0]);
        let userCredits=await UserModel.getUserCredits(user.googleId);
        let total_price=0;
        for (var i = 0; i < products.length; i++) { 
            let id=products[i].id;
            let quantity=products[i].quantity;
            let price = products[i].price;
            total_price += (price * quantity);

        }
        console.log("Total price"+total_price);
        if(total_price <= userCredits){
            for (var i = 0; i < products.length; i++) { 
                let goodie ={};
                let id=products[i].id;
                let q=products[i].quantity
                let addedgoodie = await GoodieModel.addGoodie(user.googleId,id,q);
                //console.log(user);
                //console.log(products);
                //console.log(id);
                //console.log(q);
            }
            let userGoodies = await GoodieModel.getUserGoodie(user.googleId);
            let userGoodies_JSON={};
            userGoodies_JSON._id=userGoodies._id,
            userGoodies_JSON.userGoogleId=userGoodies.userGoogleId,
            userGoodies_JSON.goodie_id=userGoodies.goodie_id,
            userGoodies_JSON.quantity=userGoodies.quantity,
            userGoodies_JSON.__v=userGoodies.__v;

            let updateCredits=await UserModel.updateUserCredits(user.googleId, total_price);
            res.send(userGoodies_JSON);

        }else{
            res.send({});

        }
    });

    app.post('/api/addToCart',requireLogin, async(req,res)=>{

        let user=req.user;
        let id=req.body.id;
       
        
        let productexists = await client.existsAsync(id);
        console.log("/api/addToCart ");
        console.log(productexists)
        if (productexists == 1) {
            console.log("productexists" + id);
           
            let a=await client.incrAsync(id);
            console.log(a);
        }
        else{
            console.log("product does not exist" + id);
            let b= await client.setAsync(id, 1);
            console.log(b);

        }

        console.log("checking keys")
       
        // let keys= await client.keysAsync('*');
        //   //console.log(keys);
        //     for(var i = 0, len = keys.length; i < len; i++) {
        //       console.log(keys[i]);
        //     }
          
            console.log("end /api/addToCart")
       res.send({});
       
       
    });

    app.get('/api/getcart',requireLogin, async(req,res)=>{
        
        //console.log(" /api/getcart checking keys");
        
        client.keys('*', function (err, keys) {
            if (err) return console.log(err);
            if(keys){
                
                       // console.log("key:: ")
                        
                        for(var i = 0, len = keys.length; i < len; i++) {
                                  //console.log(keys[i]);
                                }
                        res.send(keys);
                    } 
                    else{
                        res.send([]);
                    }
                }, 
            
        );
      

    });

    app.get('/api/getcartvalues',requireLogin, (req,res)=>{
        
        console.log(" /api/getcartvalues checking keys");
        
        let keys= client.keys("*");
       
                        var ret={};
                        for(var i = 0, len = keys.length; i < len; i++) {
                                  console.log(keys[i]);
                                  //ret.push(parseInt(keys[i]));
                                  let value= client.get(keys[i]);
                                  console.log(keys[i], value)
                                  ret[keys[i]]=value;
                                }
                                console.log(ret)
                        res.send(ret);
        }); 

                   

};