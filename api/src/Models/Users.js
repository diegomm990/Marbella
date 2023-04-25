const { Schema, model, default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs');

const UsersSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: Array
    },
    phone: {
        type: String
    }
    },
    {
        timestamps: true
    }
);

UsersSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UsersSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

const Users = model("Users", UsersSchema, 'users');
module.exports = Users;
