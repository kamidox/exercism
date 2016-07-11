var TaskQueue = require('../task-queue');

describe('task-queue', function () {

    function createTask(taskName, timeout, result, resolved, callback) {
        return function () {
            return new Promise((resolve, reject) => {
                setTimeout(function() {
                    result.push('task ' + taskName);
                    if (resolved) {
                        resolve(taskName);
                    } else {
                        reject('error', taskName);
                    }
                    if (callback) callback(taskName);
                }, timeout);
            });
        }
    }

    it('basic', function (done) {
        var q = new TaskQueue(2);
        expect(q.concurrency).toEqual(2);

        var order = [];
        q.pushTask(createTask(1, 10, order, true));
        q.pushTask(createTask(2, 20, order, true));
        q.pushTask(createTask(3, 15, order, true));

        q.pushTask(createTask(4, 50, order, true, () => {
            expect(order).toEqual(['task 1', 'task 2', 'task 3', 'task 4']);
            done();
        }));
    });

    it('reject', function (done) {
        var q = new TaskQueue(2);

        var order = [];
        q.pushTask(createTask(1, 10, order, false));
        q.pushTask(createTask(2, 20, order, false));
        q.pushTask(createTask(3, 15, order, false));

        q.pushTask(createTask(4, 50, order, false, () => {
            expect(order).toEqual(['task 1', 'task 2', 'task 3', 'task 4']);
            done();
        }));
    });
});