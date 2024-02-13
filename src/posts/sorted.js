'use strict';

const assert = require('assert');

module.exports = function (Posts) {
    Posts.calculatePostIndices = function (postData, start) { // start is a number
        assert(typeof (start) === 'number', 'start must be a number');
        postData.forEach((post, index) => { // index is a number
            assert(typeof (index) === 'number', 'index must be a number');
            if (post) {
                post.index = start + index; // post.index is a number
                assert(typeof (post.index) === 'number', 'post.index must be a number');
            }
        });
    };
};
