const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    name: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: {type: String, unique: true, default: "USER"}
});

module.exports = model('User', UserSchema);