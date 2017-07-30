
const Hapi = require("hapi");
const Path = require("path");
const Token = require("./src/api/jwt/token");
const Config = require('config');
const DB = require("./src/api/models/db");

const env = process.env;

const server = new Hapi.Server();
server.connection({
  host: env.OPENSHIFT_NODEJS_IP || 'localhost',
  port: Number(env.OPENSHIFT_NODEJS_PORT || 3001)
});
//register server methods
require("./src/api/util/methods")(server);






//connect to MongoDB
DB.mongoConnect(server, Config.get('mongoDB.url'));


const plugins = [

  {
    register: require('hapi-auth-jwt2'),
    options: {}
  }, {
    register: require("inert"),
    options: {},
  }, {
    register: require('hapi-io'),
    options: {}
  }, {
    register: require("./src/api/plugins/user/userP"),
    options: {}
  }

];


server.register(plugins, (err) => {
  if (err) {
    console.log('Plugins failled :', err);
  }

  server.auth.strategy('jwt', 'jwt', {
    key: Config.get('token.secret'),
    validateFunc: Token.validate,
    verifyOptions: { algorithms: ['HS256'] }
  });
  server.auth.default('jwt');

  server.route({
    method: "GET",
    path: "/static/{param*}",
    handler: {
      directory: {
        path: Path.join(__dirname, "src/client/build/static")
        //index:true
      }
    },
    config: { auth: false }
  });


  // everyting except above routes
  server.route({
    method: "GET",
    path: "/{p*}",
    handler: function (request, reply) {

      if (request.params.p == "favicon.ico") {
        return reply.file(Path.join(__dirname, "src/client/build/favicon.ico"));
      }

      reply.file(Path.join(__dirname, "src/client/build/index.html"));
    },
    config: { auth: false }
  });



  server.start(() => {
    console.log('Server running at:', server.info.uri);
  });


});