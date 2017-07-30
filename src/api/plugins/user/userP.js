const Joi = require('joi');
const Handlers = require("./userHandlers");

const userPlugin = {

    register: (server, options, next) => {
        const handlers = Handlers(server);

        server.route({
            method: "POST",
            path: "/login",
            handler: handlers.login,
            config: {
                validate: {
                    payload: {
                        email: Joi.string().email().required().required(),
                        password: Joi.string().min(6).max(30).required()
                    }
                },
                auth: false

            }
        });

         server.route({
            method: "GET",
            path: "/test",
            handler: (request, reply) => {
                reply({ data: "oldu bu iş" });

            }
        }); 


        /*        server.route({
                    method: "POST",
                    path: "/signup",
                    handler: handlers.signup,
                    config: {
                        validate: {
                            payload: {
                                firstName: Joi.string().min(3).max(20).required(),
                                lastName: Joi.string().min(3).max(20).required(),
                                email: Joi.string().email().required().required(),
                                password: Joi.string().min(6).max(30).required()
                            }
                        },
                        auth: false
        
                    }
                });*/

        next();

    }


};


userPlugin.register.attributes = {
    name: 'userPlugin',
    version: '1.0.0'
};

module.exports = userPlugin;
