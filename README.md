This is a simple module to get the build status of a repository that is using Bitbuckets' new pipeline feature.

It requires that you update config.js:

 module.exports = {
     username: "you",
     password: "your password",
     team: "your team",
     repo: "your repo",
     branch: "branch that you want to query"
 }



`node main.js`
