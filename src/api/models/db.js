const Mongoose = require('mongoose');

const mongoConnect = (server, db_url) => {

    // Use native promises
    Mongoose.Promise = global.Promise;

    Mongoose.connect(db_url);

    Mongoose.connection.on('error', function (err) {
        server.methods.logger('Mongoose default connection error: ' + err);
    });

};

module.exports = { mongoConnect };


// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose