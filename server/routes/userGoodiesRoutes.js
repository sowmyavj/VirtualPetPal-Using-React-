const requireLogin = require('../middlewares/requireLogin');
const GoodieModel = require('../models/UserGoodies');
const UserModel = require('../models/User');
const UserPetModel = require('../models/UserPets');
const PetModel = require('../models/Pet');

module.exports = app => {
    app.get('/api/user/goodies', requireLogin, async (req, res) => {
        let userGoodies = await GoodieModel.getUserGoodie(req.user.googleId);
        res.send(userGoodies);

    });
    app.post('/api/pet/goodies/:petId', requireLogin, async (req, res) => {
        // console.log("/api/pet/pet/:petId ");
        let petId = req.params.petId;
        let userId = req.user.googleId;
        let userGoodies = await GoodieModel.getUserGoodie(req.user.googleId);
        
        if (userGoodies && userGoodies.quantity) {
            let updateUserGoodies = await GoodieModel.decrementUserGoodies(userId);
            //console.log("updateUserGoodies  "+JSON.stringify(updateUserGoodies));
            await UserPetModel.updateUserPetHappiness(userId, petId);
            const updatePetFeed = await UserPetModel.petUserPet(userId, petId);

        }
        
        let userpet = {};
        let userpetInfo = await UserPetModel.getUserPet(userId, petId);
        userpet._id = userpetInfo._id;
        userpet.userGoogleId = userpetInfo.userGoogleId;
        userpet.pet_id = userpetInfo.pet_id;
        userpet.noOfTimesFed = userpetInfo.noOfTimesFed;
        userpet.noOfTimesPetted = userpetInfo.noOfTimesPetted;
        userpet.noOfTimesWalked = userpetInfo.noOfTimesWalked;
        userpet.happinessLevel = userpetInfo.happinessLevel;
        userpet.currentDate = userpetInfo.currentDate;
        userpet.__v = userpetInfo.__v;

        let pet = await PetModel.getPet(petId);
        let feedProgress = await UserPetModel.getfedProgress(pet.noOfTimesToFeed, userpet.noOfTimesFed)
        let walkProgress = await UserPetModel.getWalkProgress(pet.noOfTimesToWalk, userpet.noOfTimesWalked)
        let petProgress = await UserPetModel.getPetProgress(pet.noOfTimesToPet, userpet.noOfTimesPetted)

        userpet.feedProgress = feedProgress;
        userpet.walkProgress = walkProgress;
        userpet.petProgress = petProgress;
        userpet['userspet'] = true;
        res.send(userpet);
    });
};