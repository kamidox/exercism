function asyncFlow(generatorFunc) {
    
    function callback(err) {
        if (err) {
            return generator.throw(err);
        }
        var rets = [].slice.call(arguments, 1);
        generator.next(rets.length > 1 ? rets : rets[0]);
    }

    var generator = generatorFunc(callback);
    generator.next();
}

function asyncFlowWithThunk(generatorFunc) {

    function callback(err) {
        if (err) {
            return generator.throw(err);
        }
        var rets = [].slice.call(arguments, 1);
        var thunk = generator.next(rets.length > 1 ? rets : rets[0]).value;
        thunk && thunk(callback);
    }

    var generator = generatorFunc();
    var thunk = generator.next().value;
    thunk && thunk(callback);
}

exports.asyncFlow = asyncFlow;
exports.asyncFlowWithThunk = asyncFlowWithThunk;
