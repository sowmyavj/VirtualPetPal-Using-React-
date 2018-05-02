const mongoose = require('mongoose');
const Pet = require('./Pet');

const UserGoodies = mongoose.model('usergoodies');

let exportedMethods = {

    async addGoodie(userid, goodie_id, quantity){
        console.log("data model: add goodie"+userid+"  "+goodie_id);
        let addedGoodie  = UserGoodies.where({ "userGoogleId": userid, "goodie_id": goodie_id }); 
        let a =await addedGoodie.findOne();
        // console.log("found");
        // console.log(a);
        let userGoodieInfo = {
            userGoogleId: userid,
            goodie_id: goodie_id,
            quantity: 0
           
        }
        if(a){
            console.log("User already has this goodie");
            userGoodieInfo.quantity=a.quantity+quantity;
        }
        else{
            console.log("User does not have this goodie");
            userGoodieInfo.quantity=quantity;
        }
            
        
      
        let res=await new UserGoodies(userGoodieInfo).save();
       
        
       console.log("returning")
    //    console.log(res)
    //    console.log(userGoodieInfo)

        return res;

    //console.log("end data model: add goodie"+userid+"  "+goodie_id);
    },
   
    
    async getUserGoodie(user_id){
        console.log("getUserGoodie"+user_id);


        let query  = UserGoodies.where({ userGoogleId: user_id }); 
        let res =await query.findOne();  
        console.log(res); 
        return res;
    },

    async decrementUserGoodie(user_id,goodie_id){
        console.log("decrementUserGoodie"+user_id+" "+goodie_id);

        let query  = UserGoodies.where({ userGoogleId: user_id, "goodie_id":goodie_id }); 
        let res =await query.findOne(); 
        console.log(res);
        let query1=[];
        if(res.quantity>1)
        {
            console.log("Quantity greater tham 1");
            res.quantity--;
             query1=UserGoodies.update({userGoogleId: user_id, "goodie_id":goodie_id },res);  
        }   
        else{
            console.log("Quantity NOT greater tham 1");
             query1=UserGoodies.deleteOne({userGoogleId: user_id, "goodie_id":goodie_id });
        }
        console.log(query1);
        return res;
    },
    
  
}

module.exports = exportedMethods;