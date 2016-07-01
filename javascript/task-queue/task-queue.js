/* javascript parallel execution: task queue */

function TaskQueue (concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
}

TaskQueue.prototype.pushTask = function (task, callback) {
    this.queue.push(task);
    this.execNextTask();
};

TaskQueue.prototype.execNextTask = function () {
    var self = this;
    function done (err) {
        self.running --;
        process.nextTick(self.execNextTask);
    }

    while (self.running < self.concurrency && self.queue.length > 0) {
        var task = self.queue.shift();
        task(done);
        self.running ++;
    }
};

