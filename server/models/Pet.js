const mongoose=require('mongoose');

const { Schema } = mongoose;
//Create Pet schema
const PetSchema = new Schema({
    name: String,
    typeOfPet : Number,
    gender : Number,
    noOfTimesToFeed:Number,
    noOfTimesToWalk: Number,
    profilephotoLink:String,
    testimonials:Array,
    description: String
});

const init = async()=>{
    mongoose.model('pets',PetSchema);
    const Pet = mongoose.model('pets');
    let pet1=await new Pet({ name: "Tom",
        typeOfPet : 0,
        gender : 1,
        noOfTimesToFeed:3,
        noOfTimesToWalk: 0,
        profilephotoLink:"1.jpg",
        testimonials:[],
        description:"My Favourite food is cheese"}).save();
        let pet2=await new Pet({ name: "Pluto",
        typeOfPet : 1,
        gender : 1,
        noOfTimesToFeed:4,
        noOfTimesToWalk: 1,
        profilephotoLink:"4.jpg",
        testimonials:[],
        description: "I love chasing other dogs!"
    }).save();

        let pet3=await new Pet({ name: "Comet",
        typeOfPet : 0,
        gender : 1,
        noOfTimesToFeed:5,
        noOfTimesToWalk: 1,
        profilephotoLink:"../images/2.jpg",
        testimonials:[],
        description: "I love running around the lawn"}).save();
        let pet4=await new Pet({ name: "Charm",
        typeOfPet : 1,
        gender : 0,
        noOfTimesToFeed:3,
        noOfTimesToWalk: 2,
        profilephotoLink:"3.jpg",
        testimonials:[],
        description: "I like worms"}).save();
        let pet5=await new Pet({ name: "Hero",
        typeOfPet : 0,
        gender : 1,
        noOfTimesToFeed:4,
        noOfTimesToWalk: 0,
        profilephotoLink:"6.jpg",
        testimonials:[],
        description: "I love fish!"}).save();
    //var pet5 = makePetDoc('Hero', "Cat","M", 4,0,["5.jpg"],[])
    //var pet6 = makePetDoc('Felicity', "Cat","F", 3,0,["6.jpg"],[])

}
init();

