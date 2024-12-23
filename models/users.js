import { model, models, Schema } from "mongoose";

const UserSchema=new Schema({
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    firstName:{
        type: String,
        required: [true, 'First name is required'],
    },
    lastName:{
        type: String,
        required: [true, 'Last name is required'],
    }
})

const UserModel = models.User || model('User', UserSchema);

export default UserModel;