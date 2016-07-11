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
 */
TaskQueue.prototype.pushTask = function (task) {
    this.queue.push(task);
    this.nextTask();
};

/**
 * Shedule the next task in TaskQueue to run
 */
TaskQueue.prototype.nextTask = function () {
    while (this.running < this.concurrency && this.queue.length > 0) {
        var task = this.queue.shift();
        task().then(() => {
            this.running --;
            this.nextTask();
        });
        this.running ++;
    }
};

module.exports = TaskQueue;

