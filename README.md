This is a simple module to get the build status of a repository that is using Bitbuckets' new pipeline feature.

If you're using this as an npm package, you need to send a config object like the bottom most config.js example.  You don't have to use a file, it's just what I've done here.

```
var bb = require('bitbucket_pipeline_build_status')
var config = require('./config.js')

bb(config, function(value, err){
	console.log(value);
})
```

If you're just going to use this JS via `node main.js` then update the config.js.  

 ```
 module.exports = {
     username: "you",
     password: "your password",
     team: "your team",
     repo: "your repo",
     branch: "branch that you want to query"
 }
 ```
