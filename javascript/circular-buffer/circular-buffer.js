function CircularBuffer (cap) {
    'use strict';

    var buffer = new Array(cap);
    var rpos = 0;
    var wpos = 0;

    return {
        read: function () {
            if (isBufferEmpty()) {
                throw new BufferEmptyException();
            }
            var data = buffer[rpos];
            buffer[rpos] = null;
            rpos = (rpos + 1) % cap;
            return data;
        },

        write: function (data) {
            if (data === null || data === undefined) {
                return wpos;
            }
            if (isBufferFull()) {
                throw new BufferFullException();
            }

            buffer[wpos] = data;
            wpos = (wpos + 1) % cap;
            return wpos;
        },

        forceWrite: function (data) {
            var ret;
            try {
                ret = this.write(data);
            } catch (e) {
                if (e instanceof BufferFullException) {
                    buffer[rpos] = data;
                    rpos = (rpos + 1) % cap;
                    ret = rpos;
                } else {
                    throw e;
                }
            }
            return ret;
        },

        clear: function () {
            buffer = new Array(cap);
            rpos = 0;
            wpos = 0;
        }

    };

    function isBufferFull () {
        return buffer.filter(function (element) {
            return element !== null && element !== undefined;
        }).length === cap;
    }

    function isBufferEmpty () {
        return buffer.every(function (element) {
            return element === null || element === undefined;
        });
    }
}

function BufferEmptyException () {
    'use strict';
    this.name = 'BufferEmptyException';
    this.message = 'Buffer is empty';
}

function BufferFullException () {
    'use strict';
    this.name = 'BufferFullException';
    this.message = 'Buffer is full';
}

module.exports = {
    circularBuffer: function (cap) {
        'use strict';
        return new CircularBuffer(cap);
    },

    bufferFullException: function () {
        'use strict';
        return new BufferFullException();
    },

    bufferEmptyException: function () {
        'use strict';
        return new BufferEmptyException();
    }
};

