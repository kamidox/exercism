/**
 * Javascript parallel execution task queue for Promise Object
 **/


/**
 * Create a TaskQueue with the number of concurrency
 * 
 * @param {Number} concurrency - The number of concurrency tasks
 */
function TaskQueue (concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
}

/**
 * Push a task to TaskQueue and schedule the task to run if possible
 * 
 * @param {Object} task - The Promise task to push into TaskQueue
 * @param {Function} callback - Called when task is resolved or rejected with signature callback(err, task). Optional.
 */
TaskQueue.prototype.pushTask = function (task, callback) {
    this.queue.push([task, callback]);
    this.nextTask();
};

/**
 * Shedule the next task in TaskQueue to run
 */
TaskQueue.prototype.nextTask = function () {

    function makeCallback(self, task, callback) {
        return function (err) {
            if (callback) callback(err, task);
            self.running --;
            self.nextTask();
        }
    }


    while (this.running < this.concurrency && this.queue.length > 0) {
        var [task, callback] = this.queue.shift();
        var cb = makeCallback(this, task, callback);
        task().then(cb, cb);
        this.running ++;
    }

    if (this.running + this.queue.length === 0) {
        this.drain();
    }
};

TaskQueue.drain = function () {
    console.log('Task queue is drained.')
}

module.exports = TaskQueue;

