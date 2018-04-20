const mongoose = require('mongoose');

const { Schema } = mongoose;
//Create UserPet schema
const UserPetSchema = new Schema({
    userGoogleId: String,
    pet_id: String,
    noOfTimesFed: Number,
    noOfTimesWalked: Number,
    happinessLevel: Number,
    currentDate: Date
});

mongoose.model('userpets', UserPetSchema);
const userPet = mongoose.model('userpets');

const init = async () => {
    console.log("UserPet!!");
    let user1Pet1 = await new userPet({
        userGoogleId: "104959878843234314059",
        pet_id: "97bya930-167d-453a-9513-b6da678c2c9b",
        noOfTimesFed: 2,
        noOfTimesWalked: 0,
        happinessLevel: 10,
        currentDate: new Date()
    }).save();
    let user1Pet2 = await new userPet({
        userGoogleId: "104959878843234314059",
        pet_id: "24bya930-167d-453a-9513-b6da678c2c9b",
        noOfTimesFed: 3,
        noOfTimesWalked: 1,
        happinessLevel: 50,
        currentDate: new Date()
    }).save();
    let user2Pet1 = await new userPet({
        userGoogleId: "114723772229743033814",
        pet_id: "97bya930-167d-453a-9513-b6da678c2c9b",
        noOfTimesFed: 2,
        noOfTimesWalked: 0,
        happinessLevel: 10,
        currentDate: new Date()
    }).save();
  /*   let user3Pet1 = await new userPet({
        userGoogleId: "114723772229743033814",
        pet_id: "97bya930-167d-453a-9513-b6da678c2c9b",
        noOfTimesFed: 0,
        noOfTimesWalked: 0,
        happinessLevel: 10,
        currentDate: new Date()
    }).save();  */

}

init();
