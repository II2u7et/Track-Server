const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next){
    const user = this;
    if (!user.isModified('password')){
        return next();
    }

    bycrypt.genSalt(10, (err,salt) => {
        if(err){return (err)}

        bycrypt.hash(user.password, salt, (err,hash) => {
            if(err){return next(err)}
            user.password = hash;
            next();
        });
    });
    
});

userSchema.methods.comparePassword = function(candidatePassword){
    const user = this;
    return new Promise((resolve, reject) => {
        bycrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if(err) { return reject(err); }

            if(!isMatch) { return reject(false); }

            resolve(true);
        } )
    });
}

mongoose.model('User', userSchema);