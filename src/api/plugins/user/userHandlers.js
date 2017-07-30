const Boom = require('boom');
const User = require("../../models/user");

module.exports = (server) => {

    const login = (request, reply) => {

        const checkAndAllow = async () => {

            try {

                let user = await User.findOne({ email: request.payload.email });
                if (!user) {
                    throw new Error("Check your email adress or password!");
                }

                if(!user.comparePassword(request.payload.password)){
                    throw new Error("Check your email adress or password!");
                }

                let token=await user.getUserToken();

                return reply(token);

            } catch (error) {
                return reply(Boom.unauthorized(error.message));
            }

        };
        checkAndAllow();

    };

    const signup = (request, reply) => {

        const checkAndSave = async () => {

            try {
                
                let user = await User.findOne({ email: request.payload.email });
                if (user) {
                    throw new Error("User with the same email adress already exists!");
                }

                let newUser = new User({ ...request.payload });
                let doc = await newUser.save();

                return reply("done");

            } catch (error) {
                return reply(Boom.badRequest(error.message));
            }

        };
        checkAndSave();
    };





    return {
        login,
        signup
    }
};