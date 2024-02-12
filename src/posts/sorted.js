'use strict';

const _ = require('lodash');

const db = require('../database');
const utils = require('../utils');
const user = require('../user');
const privileges = require('../privileges');
const plugins = require('../plugins');

module.exports = function(Posts) {
    Posts.calculatePostIndices = function (postData, start) {
        postData.forEach((post, index) => {
            if (post) {
                post.index = start + index;
            }
        });
    };
}