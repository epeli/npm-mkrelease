# npm-mkrelease

Node module release tool inspired by
[jarn.mkrelease](http://pypi.python.org/pypi/jarn.mkrelease).

## Installation

    npm install -g npm-mkrelease

## Usage

Run `npm-mkrelease` in a Node module directory where the package.json file is.

It does following:

  1. Prompts for new version number
  2. Writes it to package.json
  3. Pushes package to npm
  4. Commits new version number to Git
  5. Tags the commit with the version number
  6. Pushes everything to Git origin

## Warning!

This tool is bit opinionated and does things you might not be able to revert. Do
not use it if you are not sure that it does what you want.
