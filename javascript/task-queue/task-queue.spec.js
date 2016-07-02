var TaskQueue = require('./task-queue');

describe ('task-queen', function() {
    function genTask(taskid) {
        var task = function (done) {
            var taken = Math.floor(Math.random() * 100);
            task.startAt = Date.now();
            task.taken = taken;
            // console.log(`task#${task.taskid} started at ${task.startAt}. Will finish in ${taken} ms.`);
            /* task must use callback async */
            setTimeout(() => done(), taken);
        };
        task.taskid = taskid;
        return task;
    }

    function taskDone(err, task) {
        task.finishAt = Date.now();
        // console.log(`task#${task.taskid} finished at ${task.finishAt}. Actually take ${task.finishAt - task.startAt} ms.`);
    }

    function nextTask(err, task) {
        taskDone(err, task);
        if (task.taskid < 3) {
            var taskQueue = task.belongTo;
            var newTask = genTask(task.taskid + 1);
            newTask.belongTo = taskQueue;
            taskQueue.pushTask(newTask, nextTask);
        }
    }

    it('single task', function(done) {
        var taskQueue = new TaskQueue(2);
        taskQueue.pushTask(genTask(0), (err, task) => {
            taskDone(err, task);
            expect(taskQueue.running).toEqual(1);
            expect(task.taken <= (task.finishAt - task.startAt)).toBe(true);
            done();
        });
   });

    it('sequence execute task', function(done){
        var taskQueue = new TaskQueue(2);
        var task = genTask(1);
        task.belongTo = taskQueue;
        taskQueue.pushTask(task, (err, t) => {
            nextTask(err, t);
            expect(taskQueue.running).toEqual(2);
            expect(t.taken <= (t.finishAt - t.startAt)).toBe(true);
            done();
        });
        expect(taskQueue.running).toEqual(1);
    });

    it('parallel execute task', function(done) {
        var taskQueue = new TaskQueue(2);

        function taskDoneCallback (err, t) {
            taskDone(err, t);
            expect(taskQueue.running >= 0).toBe(true);
            expect(t.taken <= (t.finishAt - t.startAt)).toBe(true);
            if (taskQueue.queue.length > 0) {
                expect(taskQueue.running).toEqual(taskQueue.concurrency);
            }
            if (taskQueue.queue.length === 0) {
                done();
            }
        }

        var startTaskId = 4;
        var endTaskId = 9;
        for (let id = startTaskId; id < endTaskId; id ++) {
            var task = genTask(id);
            taskQueue.pushTask(task, taskDoneCallback);
        }
        expect(taskQueue.queue.length + taskQueue.running).toEqual(endTaskId - startTaskId);
        expect(taskQueue.running).toEqual(2);
    });
});


