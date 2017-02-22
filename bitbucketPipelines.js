'use strict';
var request = require('request')
var promiseWaterfall = require('promise.waterfall')

var USER
var PW
var TEAM
var REPO
var BRANCH
var commitEndpoint
var statusesEndpoint

module.exports = function(config, callback){

	USER = config.username
	PW = config.password
	TEAM = config.team
	REPO = config.repo
	BRANCH = config.branch
	commitEndpoint = 'https://api.bitbucket.org/2.0/repositories/'+TEAM+'/'+REPO+'/refs/branches/'
	statusesEndpoint = 'https://api.bitbucket.org/2.0/repositories/'+TEAM+'/'+REPO+'/commit/{{ID}}/statuses'

	promiseWaterfall([
  		getLatestCommit.bind(commitEndpoint+BRANCH),
  		getBuildStatuses.bind(statusesEndpoint)
	]).then(function(value){
  		callback(value, null)
	}).catch(function(value){
		callback(null, value)
	})
}

/*
 * Get Latest Commit
 */
function getLatestCommit(endpoint) {
    return new Promise((resolve,reject)=>{
      request.get(this, {
        'auth': {
          'user': USER,
          'pass': PW
        }
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let data = JSON.parse(body);
          resolve(data.target.hash)
        } else {
          reject(response)
        }
      });

    });
}
function getBuildStatuses(commit) {
    return new Promise((resolve,reject)=>{
      //console.log(this.replace('{{ID}}',commit))

      request.get(this.replace('{{ID}}',commit), {
        'auth': {
          'user': USER,
          'pass': PW
        }
      }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          let data = JSON.parse(body);
          resolve(data.values[0].state)
        } else {
          reject(response)
        }
      });

    });
}
