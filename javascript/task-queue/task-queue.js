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

    function makeCallback(self, task, callback) {
        return function (err) {
            callback(err, task);
            self.running --;
            /**
             * FIXME: why `process.nextTick(this.nextTask);` do not work!!!
             * sync & async hell!!!
             **/
            // console.log(`schedule task#${task.taskid}`);
            // process.nextTick(this.nextTask);
            self.nextTask();
        }
    }

    while (this.running < this.concurrency && this.queue.length > 0) {
        var [task, callback] = this.queue.shift();
        task(makeCallback(this, task, callback));
        this.running ++;
    }
};

module.exports = TaskQueue;

