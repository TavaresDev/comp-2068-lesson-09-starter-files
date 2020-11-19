// // minimal code for any model
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({});

// module.exports = mongoose.model('user', UserSchema)

//Start
const mongoose = require('mongoose');
//encript password
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    // atributes
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        dropDups: true,
        validate: [
            {
                //value will be the email the user 
                //is attemptin to store
                validator: async function (value) {
                    const emailCount = await this.model('User')
                        .countDocuments({ email: value});
                    return emailCount === 0;
                },
                message: props => `${props.value} Please try a diferent Username/password Combination`
            },
            {
                validator: function (value) {
                    // email format regex
                    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value.toLowerCase());
                },
                message: props => `Please ensure your email address is in the correct format.`
            },
            {
                validator: function (value) {
                    return this.emailConfirmation === value;
                },
                message: props => `Your email and email confirmation must match.`
            }
        ]
    }
});

UserSchema.virtual('emailConfirmation')
.get(function () {
  return this._emailConfirmation;
})
.set(function (value) {
  this._emailConfirmation = value;
});

UserSchema.virtual('password')
.get(function () {
  return this._password;
})
.set(function (value) {
    if(value !== this._passwordConfirmation) {
        this.invalidate('password', 'Password and password confirmation must match')
    }
  this._password = value;
});
UserSchema.virtual('passwordConfirmation')
.get(function () {
  return this._passwordConfirmation;
})
.set(function (value) {
  this._passwordConfirmation = value;
});


UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});
  

module.exports = mongoose.model('User', UserSchema)
