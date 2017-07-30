const Mongoose = require("mongoose");
const Bcrypt = require('bcryptjs');
const Token = require("../jwt/token");


const userSchema = Mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }

});

userSchema.pre('save',function(next){
    let hashedPas=Bcrypt.hashSync(this.password, 8);
    this.password=hashedPas;
    next();
});

userSchema.methods.comparePassword=function(password){
    return Bcrypt.compareSync(password, this.password);
};

userSchema.methods.getUserToken= async function(){
    let token= await Token.generate(this._id);
    return {name:`${this.firstName} ${this.lastName}`,token};
};

/*userSchema
.virtual('token')
.get(function () {
  return {name:`${this.firstName} ${this.lastName}`,token:token};
});*/


module.exports=Mongoose.model("User",userSchema);

