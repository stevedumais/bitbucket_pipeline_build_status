'use strict';
var bb = require('./bitbucketPipelines.js')
var config = require('./config.js')

bb(config, function(value, err){
	console.log(value);
})
