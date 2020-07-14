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
    },
    show: (callback)=>{
        userModel.find({},(err,items) =>{
            if(!err){
                callback(JSON.stringify(items));
            }else{
                return console.log(err);
            }
        });
    },
    update: (data,callback) => {
        userModel.findOne({_id: data._id}, (err,item)=>{
            item.first_name = data.first_name;
            item.last_name = data.last_name;
            item.timezone = data.timezone;
            item.locale = data.locale;
            item.profile_pic = data.profile_pic;
            item.save();
            callback(item);
        });
    },
    delete: (_id,callback) =>{
        userModel.findOne({_id: _id},(err,post)=>{
            post.remove();
            callback(_id);
        });
    }  
}