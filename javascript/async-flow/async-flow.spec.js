var asyncFlow = require('./async-flow').asyncFlow;
var asyncFlowWithThunk = require('./async-flow').asyncFlowWithThunk;

describe('async-flow', () => {

    function createFunc(timeout) {
        return function (callback) {
            setTimeout(function () {
                callback(null, timeout);
            }, timeout);
        }
    }

    it('basic', (done) => {
        let timeout1 = 5;
        let timeout2 = 2;
        var f1 = createFunc(timeout1);
        var f2 = createFunc(timeout2);

        asyncFlow(function* (callback) {
            var ret1 = yield f1(callback);
            expect(ret1).toEqual(timeout1);
            var ret2 = yield f2(callback);
            expect(ret2).toEqual(timeout2);
            done();
        });
    });

    
    it('error handler', (done) => {
        function errorFunc(callback) {
            setTimeout(function() {
                callback('error happened in async func');
            }, 2);
        }

        asyncFlow(function* (callback) {
            var errCatched = false;
            try {
                yield errorFunc(callback);
            } catch(e) {
                expect(e).toEqual('error happened in async func');
                errCatched = true;
            }
            expect(errCatched).toEqual(true);
            done();
        })
    });
        
    
    it('basic with thunk', (done) => {
        let timeout1 = 5;
        let timeout2 = 2;
        var f1 = createFunc(timeout1);
        var f2 = createFunc(timeout2);

        function f1Thunk() {
            return function (callback) {
                f1(callback);
            }
        }

        function f2Thunk() {
            return function (callback) {
                f2(callback);
            }
        }

        asyncFlowWithThunk(function* () {
            var ret1 = yield f1Thunk();
            expect(ret1).toEqual(timeout1);
            var ret2 = yield f2Thunk();
            expect(ret2).toEqual(timeout2);
            done();
        });        
    });
        
    it('error handler with thunk', (done) => {
        function errorFunc(callback) {
            setTimeout(function() {
                callback('error happened in async func');
            }, 2);
        }

        function errorFuncThunk() {
            return function (callback) {
                errorFunc(callback);
            };
        }

        asyncFlowWithThunk(function* () {
            var errCatched = false;
            try {
                yield errorFuncThunk();
            } catch(e) {
                expect(e).toEqual('error happened in async func');
                errCatched = true;
            }
            expect(errCatched).toEqual(true);
            done();
        });
    });

});
