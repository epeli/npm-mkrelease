
# npm-mkrelease

Release tool for Node modules inspired by
[jarn.mkrelease](http://pypi.python.org/pypi/jarn.mkrelease).

## Installation

    npm install -g npm-mkrelease

## Usage

Run `npm-mkrelease` in a Node module directory where the package.json file is.

It does following:

  1. Prompts for new version number
  2. Pushes package to npm
  3. Commits new version number to Git
  4. Tags the commit with the version number
  5. Pushes everything to Git origin

## Warning!

This tool manipulates your package.json, creates commits, pushes them and
publishes packages to npmjs.org. Do not use if your not sure what it does!
