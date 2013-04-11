#!/usr/bin/env node

var fs = require("fs");
var spawn = require('child_process').spawn;
var readline = require('readline');



function execute(){
  var commands = Array.prototype.slice.call(arguments);
  var cb = commands.pop();

  if (commands.length === 0) {
    return cb();
  }

  var args = commands.shift();
  var command = args.shift();
  var cmd = spawn(command, args);

  cmd.stdout.pipe(process.stdout);
  cmd.stderr.pipe(process.stderr);
  cmd.on("exit", function(code){
    if (code !== 0) {
      return cb(new Error("Failed to execute " + command + " " + args.join(" ")));
    }
    commands.push(cb);
    execute.apply(null, commands);
  });
}



var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var packageJSON = JSON.parse(fs.readFileSync("./package.json").toString());
console.log("Current version is", packageJSON.version);

rl.question("New version> ", function(version) {
  version = version.trim();
  packageJSON.version = version;
  fs.writeFileSync("./package.json", JSON.stringify(packageJSON, null, "  "));

  execute(
    [ "npm", "publish" ],
    [ "git", "commit", "package.json", "-m", "Release " + version ],
    [ "git", "tag", "-a", version, "-m", "Release " + version ],
    [ "git", "push", "--tags", "origin"],
    [ "git", "push", "origin", "master"],
    function(err){
      if (err) throw err;
      rl.close();
      console.log("DONE");
    }
  );

});
