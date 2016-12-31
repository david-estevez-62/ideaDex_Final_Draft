var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var shortid= require('shortid');

/**
 * Create a schema (blueprint) for all users in the database.
 * If you want to collect additional info, add the fields here.
 * We are setting required to true so that if the field is not
 * given, the document is not inserted. Unique will prevent
 * saving if a duplicate entry is found.
 */
var userSchema = mongoose.Schema({
  local: {
        email:          {
        type    : String
                        },
        password:       {
        type    : String,
        required: true
                        }
  },
  facebook: {
        id      : String,
        token   : String
  },
  gmail: {
        id      : String,
        token   : String
  },
  username: {
        type    : String,
        unique  : true,
        required: true,
  },
  posts: [
  
      {
        contents   : [],
        _id : {
            type   : String,
            default: shortid.generate
        },
        username   : String,
        date: {
          type     : Date, 
          default  : Date()
        },
        privacy    : Boolean,
        rating     : 0,
        category   : String,
        uwv        : []
      }

    ],
  followers        : [String],
  following        : [String],
  discover         : [],
  favorites        : [],
  notifications    : [],
  theme: {
    type           : String,
    default        : 'default'
  },
  imageUrl : {
    type           : String, 
    default        : '/img/gravatar.jpg'
  }
});


/**
 * This allows us to hook into the pre-save DB flow. Our
 * callback will be called whenever a new user is about to
 * be saved to the database so that we can encrypt the password.
 */
userSchema.pre('save', function(next){

  // First, check to see if the password has been modified. If not, just move on.
  if(!this.isModified('local.password')) return next();

  // Store access to "this", which represents the current user document
  var user = this;

  // Generate an encryption "salt." This is a special way of increasing the
  // encryption power by wrapping the given string in a secret string. Something
  // like "secretpasswordsecret" and then encrypting that result.
  bcrypt.genSalt(10, function(err, salt){

    // If there was an error, allow execution to move to the next middleware
    if(err) return next(err);

    // If we are successful, use the salt to run the encryption on the given password
    bcrypt.hash(user.local.password, salt, function(err, hash){

      // If there was an error, allow execution to move to the next middleware
      if(err) return next(err);

      // If the encryption succeeded, then replace the un-encrypted password
      // in the given document with the newly encrypted one.
      user.local.password = hash;

      // Allow execution to move to the next middleware
      return next();
    });
  });
});

// userSchema.methods.generateHash = function(password, cb){
//   bcrypt.genSalt(10, function(err, salt){
//     if (err) console.log (err);
//     bcrypt.hash(password, salt, function(err, hash){
//       if (err) console.log (err);
//       return cb(err, hash);
//     });
//   });
// };

userSchema.methods.comparePassword = function(candidatePassword, next){
  // compare the encrypted password to the user-entered password
  
  bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch){
    // console.log(candidatePassword);
    if(err){
      return next(err);
    }
    return next(null, isMatch);
  });
};


// Make user model available through exports/require
module.exports = mongoose.model('user', userSchema);
