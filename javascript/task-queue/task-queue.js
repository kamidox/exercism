/* javascript parallel execution: task queue */
function TaskQueue (concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
}

TaskQueue.prototype.pushTask = function (task, callback) {
    this.queue.push([task, callback]);
    this.nextTask();
};

TaskQueue.prototype.nextTask = function () {
    while (this.running < this.concurrency && this.queue.length > 0) {
        var [task, callback] = this.queue.shift();
        task(err => {
            callback(err, task);
            this.running --;
            /*
             * FIXME: why `process.nextTick(this.nextTask);` do not work!!!
             * sync & async hell!!!
            **/
            this.nextTask();
        });
        this.running ++;
    }
};

module.exports = TaskQueue;

