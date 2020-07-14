const { Schema, connect, model} = require('mongoose');

connect('mongodb://localhost/chat');

const UserSchema = new Schema({
    _id: String,
    first_name: String,
    last_name: String,
    timezone: String,
    locale: String,
    profile_pic: String,
});

userModel = model('user', UserSchema);

module.exports = {
    create: (data, callback) => {
        let item = {
            _id: data._id,
            first_name: data.first_name,
            last_name: data.last_name,
            timezone: data.timezone,
            locale: data.locale,
            profile_pic: data.profile_pic,
        };

        let nuevo = new userModel(item).save();
        callback(item);
    } 
}