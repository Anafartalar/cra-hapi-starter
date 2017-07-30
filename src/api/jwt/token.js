const JWT = require('jsonwebtoken');
const Config = require('config');

const token = () => {

  const validate = (decoded, request, callback) => {
    if (!decoded.id) {
      callback(null, false);
    }
    else {
      callback(null, true);
    }

  };

  const generate = (userId) => {

    return new Promise((resolve, reject) => {
      JWT.sign({ id: userId }, Config.get('token.secret'), {expiresIn: '3h'}, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });

    });
  };

  return {
    validate,
    generate
  };

};

module.exports=token();
