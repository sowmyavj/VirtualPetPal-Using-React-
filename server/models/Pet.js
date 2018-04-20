const mongoose=require('mongoose');

const { Schema } = mongoose;
//Create Pet schema
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

const init = async()=>{
    const Pet = mongoose.model('pets');
    let pet1 = await new Pet({
        name: "Tom",
        pet_id: "97bya930-167d-453a-9513-b6da678c2c9b",
        typeOfPet: 0,
        gender: 1,
        noOfTimesToFeed: 3,
        noOfTimesToWalk: 2,
        noOfTimesToPet:3,
        profilephotoLink: "1.jpg",
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
        profilephotoLink:"4.jpg",
        testimonials:[],
        description: "I love chasing other dogs!"}).save();

    let pet3=await new Pet({ name: "Comet",
        pet_id : "88bya930-167d-453a-9513-b6da678c9e1b",

        typeOfPet : 0,
        gender : 1,
        noOfTimesToFeed:5,
        noOfTimesToWalk: 1,
        noOfTimesToPet:4,
        profilephotoLink:"2.jpg",
        testimonials:[],
        description: "I love running around the lawn"}).save();
    let pet4=await new Pet({ name: "Charm",
        pet_id : "12nya930-167d-453a-9513-b6da678c9e1b",
        typeOfPet : 1,
        gender : 0,
        noOfTimesToFeed:3,
        noOfTimesToWalk: 2,
        noOfTimesToPet:2,
        profilephotoLink:"3.jpg",
        testimonials:[],
        description: "I like worms"}).save();
    let pet5=await new Pet({ name: "Hero",
        pet_id : "81yyv130-167d-453a-9513-b6da678c9e1b",
        typeOfPet : 0,
        gender : 1,
        noOfTimesToFeed:4,
        noOfTimesToWalk: 0,
        noOfTimesToPet:3,
        profilephotoLink:"6.jpg",
        testimonials:[],
        description: "I love fish!"}).save();
        let pet6=await new Pet({ name: "Felicity",
        pet_id : "90ppp130-167d-453a-9513-b6da678c9e1b",
        typeOfPet : 1,
        gender : 1,
        noOfTimesToFeed:4,
        noOfTimesToWalk: 0,
        profilephotoLink:"5.jpg",
        testimonials:[],
        description: "I love salmon!"}).save();
    //var pet5 = makePetDoc('Hero', "Cat","M", 4,0,["5.jpg"],[])
    //var pet6 = makePetDoc('Felicity', "Cat","F", 3,0,["6.jpg"],[])

}
init();

