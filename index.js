#!/usr/bin/env node

var fs = require("fs");
var spawn = require('child_process').spawn;
var readline = require('readline');

var request = require("request");
var semver = require("semver");

function fetchCurrentNpmRelease(pkg, cb) {
  request("http://registry.npmjs.org/" + pkg, function(err, res, body) {
    if (err) return cb(err);
    if (res.statusCode === 404) return cb();
    var data = JSON.parse(body);
    if (data.error === "not_found") return cb();
    var versions = Object.keys(data.versions).sort(semver.compare);
    cb(null, versions[versions.length-1]);
  });
}

function askSemver(default_, cb) {
  rl.question("New version> ", function(version) {
    if (!version.trim()) return cb(null, default_);
    if (semver.valid(version)) return cb(null, version);
    askSemver(default_, cb);
  });
}


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

console.log("Version in package.json:", packageJSON.version);
fetchCurrentNpmRelease(packageJSON.name, function(err, npmVersion) {
  if (err) {
    console.log("Failed to read npm release version");
  }
  else {
    console.log("Current npm release:", npmVersion || "(not released yet)");
  }

  askSemver(packageJSON.version, function cb(err, version) {
    if (version && npmVersion && version === npmVersion) {
      console.log("Version", version, "is already released in npm");
      return askSemver(packageJSON.version, cb);
    }
    packageJSON.version = version;
    fs.writeFileSync("./package.json", JSON.stringify(packageJSON, null, "  "));

    console.log("Releasing and tagging version", version);
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
});
