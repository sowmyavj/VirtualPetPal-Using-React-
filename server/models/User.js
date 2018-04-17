const mongoose=require('mongoose');
const { Schema } = mongoose;
//Create User schema
const UserSchema = new Schema({
    googleId: String,
    credits: {  type : Number,
                default : 0
    }
});

//Create a new collection - users
mongoose.model('users',UserSchema);
