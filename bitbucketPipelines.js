'use strict';
var request = require('request')
var promiseWaterfall = require('promise.waterfall')

var args = process.argv.slice(2);

const USER = args[0]
const PW = args[1]
const TEAM = args[2]
const REPO = args[3]

const commitEndpoint = 'https://api.bitbucket.org/2.0/repositories/'+TEAM+'/'+REPO+'/refs/branches/'
const commitEndpointBranch = 'dev'
const statusesEndpoint = 'https://api.bitbucket.org/2.0/repositories/'+TEAM+'/'+REPO+'/commit/{{ID}}/statuses'



promiseWaterfall([
  getLatestCommit.bind(commitEndpoint+commitEndpointBranch),
  getBuildStatuses.bind(statusesEndpoint)
]).then(function(value){
  console.log(value);
}).catch(console.error)


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
      console.log(this.replace('{{ID}}',commit))

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
