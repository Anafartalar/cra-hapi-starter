

// server methods
const methods = (server,next) => {

    const logger = (log) => {
        console.log(`[${new Date().toString()}] - ${log}`);
        next(null,true);
    };
    server.method('logger', logger, {});



    return true;

}


module.exports = methods;