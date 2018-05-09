const mongoose = require('mongoose');

const { Schema } = mongoose;
//Create UserPet schema

const PetSchema = new Schema({
    name: String,
    pet_id: String,
    typeOfPet : Number,
    gender : Number,
    noOfTimesToFeed:Number,
    noOfTimesToPet:Number,
    noOfTimesToWalk: Number,
    profilephotoLink:String,
    testimonials:Array,
    description: String 
});
mongoose.model('pets',PetSchema);

const UserPetSchema = new Schema({
    userGoogleId: String,
    pet_id: String,
    noOfTimesFed: Number,
    noOfTimesPetted: Number,
    noOfTimesWalked: Number,
    happinessLevel: Number,
    currentDate: Date
});

mongoose.model('userpets', UserPetSchema);
const userPet = mongoose.model('userpets');

const UserGoodieSchema = new Schema({
    userGoogleId: String,
    goodie_id: String,
    quantity: Number
   
});

mongoose.model('usergoodies', UserGoodieSchema);
const userGoodie = mongoose.model('usergoodies');

const initPets = async()=>{
    console.log("Init pets")
    const Pet = mongoose.model('pets');
    let pet1 = await new Pet({
        name: "Tom",
        pet_id: "97bya930-167d-453a-9513-b6da678c2c91",
        typeOfPet: 0,
        gender: 1,
        noOfTimesToFeed: 3,
        noOfTimesToWalk: 2,
        noOfTimesToPet:3,
        profilephotoLink: "K4mSJ7kc0As",
        testimonials: [],
        description: "My Favourite food is cheese!"
    }).save();
    let pet2=await new Pet({ name: "Pluto",
        pet_id : "24bya930-167d-453a-9513-b6da678c2c9b",
        typeOfPet : 1,
        gender : 1,
        noOfTimesToFeed:4,
        noOfTimesToWalk: 1,
        noOfTimesToPet:3,
        profilephotoLink:"nEqpHsZv9HI",
        testimonials:[],
        description: "I love chasing other dogs!"}).save();

    let pet3=await new Pet({ name: "Comet",
        pet_id : "88bya930-167d-453a-9513-b6da678c9e1b",
        typeOfPet : 0,
        gender : 1,
        noOfTimesToFeed:5,
        noOfTimesToWalk: 1,
        noOfTimesToPet:4,
        profilephotoLink:"DziZIYOGAHc",
        testimonials:[],
        description: "I love running around the lawn"}).save();
    let pet4=await new Pet({ name: "Charm",
        pet_id : "12nya930-167d-453a-9513-b6da678c9e1b",
        typeOfPet : 1,
        gender : 0,
        noOfTimesToFeed:3,
        noOfTimesToWalk: 2,
        noOfTimesToPet:5,
        profilephotoLink:"uiJ49cEhEf0",
        testimonials:[],
        description: "I like worms"}).save();
    let pet5=await new Pet({ name: "Hero",
        pet_id : "81yyv130-167d-453a-9513-b6da678c9e1b",
        typeOfPet : 0,
        gender : 1,
        noOfTimesToFeed:4,
        noOfTimesToWalk: 2,
        noOfTimesToPet:3,
        profilephotoLink:"OsOQhAzcEKc",
        testimonials:[],
        description: "I love fish!"}).save();
    let pet6=await new Pet({ name: "Felicity",
        pet_id : "90ppp130-167d-453a-9513-b6da678c9e1b",
        typeOfPet : 1,
        gender : 1,
        noOfTimesToFeed:4,
        noOfTimesToWalk: 1,
        noOfTimesToPet:4,
        profilephotoLink:"IFxjDdqK_0U",
        testimonials:[],
        description: "I love salmon!"}).save();
    //var pet5 = makePetDoc('Hero', "Cat","M", 4,0,["5.jpg"],[])
    //var pet6 = makePetDoc('Felicity', "Cat","F", 3,0,["6.jpg"],[])

}
const initUserPets = async () => {
    console.log("UserPet!!");
    let user1Pet1 = await new userPet({
        userGoogleId: "104959878843234314059",
        pet_id: "97bya930-167d-453a-9513-b6da678c2c91",
        noOfTimesFed: 2,
        noOfTimesPetted:1,
        noOfTimesWalked: 0,
        happinessLevel: 3,
        currentDate: new Date()
    }).save();
    let user1Pet2 = await new userPet({
        userGoogleId: "104959878843234314059",
        pet_id: "24bya930-167d-453a-9513-b6da678c2c9b",
        noOfTimesFed: 3,
        noOfTimesPetted:0,
        noOfTimesWalked: 1,
        happinessLevel: 4,
        currentDate: new Date()
    }).save();
    let user2Pet1 = await new userPet({
        userGoogleId: "114723772229743033814",
        pet_id: "97bya930-167d-453a-9513-b6da678c2c91",
        noOfTimesFed: 2,
        noOfTimesPetted:1,
        noOfTimesWalked: 0,
        happinessLevel: 3,
        currentDate: new Date()
    }).save();
    //105578366045462687191
    let user3Pet1 = await new userPet({
        userGoogleId: "105578366045462687191",
        pet_id: "97bya930-167d-453a-9513-b6da678c2c91",
        noOfTimesFed: 0,
        noOfTimesPetted:2,
        noOfTimesWalked: 0,
        happinessLevel: 2,
        currentDate: new Date()
    }).save();  
    let user3Pet2 = await new userPet({
        userGoogleId: "105578366045462687191",
        pet_id: "24bya930-167d-453a-9513-b6da678c2c9b",
        noOfTimesFed: 0,
        noOfTimesPetted:1,
        noOfTimesWalked: 0,
        happinessLevel: 1,
        currentDate: new Date() 
    }).save(); 

}

//initPets();


//initUserPets();
let exportedMethods = {
    initPets,
    initUserPets
}
module.exports = exportedMethods;

