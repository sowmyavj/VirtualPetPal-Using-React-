const mongoose = require('mongoose');

const UserPet = mongoose.model('userpets');

let exportedMethods = {
    async getfedProgress(noOfTimesToBeFeeded,noOfTimesFed){
        let feedProgress= Math.round((noOfTimesFed/noOfTimesToBeFeeded)*100);
        //console.log(feedProgress);
        //console.log("typeof"+typeof(feedProgress));
        return feedProgress;

    },
    async getWalkProgress(noOfTimesToWalk,noOfTimesWalked){
        let walkProgress= Math.round((noOfTimesWalked/noOfTimesToWalk)*100);
        //console.log(walkProgress);
        //console.log("typeof"+typeof(walkProgress));
        return walkProgress;

    },
    async getPetProgress(noOfTimesToPet,noOfTimesPetted){
        let petProgress= Math.round((noOfTimesPetted/noOfTimesToPet)*100);
       // console.log(petProgress);
        //console.log("typeof"+typeof(walkProgress));
        return petProgress;

    },
    
    async getUserPet(user_id, pet_id){
        //console.log("Inside getUserPet"+user_id+" "+pet_id);

        let query  = UserPet.where({ userGoogleId: user_id, "pet_id": pet_id }); 
        let userPet =await query.findOne();   
        return userPet;
    },
    async feedUserPet(user_id, pet_id){
        //console.log("Inside feedUserpet"+user_id+" "+pet_id)
        let execUpdate  = await UserPet.updateOne({ userGoogleId: user_id, "pet_id": pet_id }, 
        {$inc : { noOfTimesFed : 1 }}); 
       // console.log("execUpdate "+JSON.stringify(execUpdate));

    },
    async walkUserPet(user_id, pet_id){
        console.log("Inside walkUserPet"+user_id+" "+pet_id)
        let execUpdate  = await UserPet.updateOne({ userGoogleId: user_id, "pet_id": pet_id }, 
        {$inc : { noOfTimesWalked : 1 }}); 
        //console.log("execUpdate "+JSON.stringify(execUpdate));
    },
    async petUserPet(user_id, pet_id){
        console.log("Inside petUserpet"+user_id+" "+pet_id)
        let execUpdate  = await UserPet.updateOne({ userGoogleId: user_id, "pet_id": pet_id }, 
        {$inc : { noOfTimesPetted : 1 }}); 
       // console.log("execUpdate "+JSON.stringify(execUpdate));
    }
  
}

module.exports = exportedMethods;