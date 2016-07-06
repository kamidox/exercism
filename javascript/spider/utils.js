module.exports.promisify = function (callbackBasedApi) {
    var args = [].slice.call(arguments);

    return new Promise((resolve, reject) => {
        args.push(function (err, result) {
            if (err) {
                return reject(err);
            }
            if (arguments.length <= 2) {
                return resolve(result);
            } else {
                resolve([].slice.call(arguments, 1));
            }
        });
        callbackBasedApi.apply(null, args);
    });
};

