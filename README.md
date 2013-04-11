# npm-mkrelease

Node module release tool inspired by
[jarn.mkrelease](http://pypi.python.org/pypi/jarn.mkrelease).

## Installation

    npm install -g npm-mkrelease

## Usage

Run `npm-mkrelease` in a Node module directory where the package.json file is.

It does following:

  1. Displays the current npm release and package.json version
  1. Prompts for new version number
  1. Writes it to package.json
  1. Pushes package to npm
  1. Commits new version number to Git
  1. Tags the commit with the version number
  1. Pushes everything to Git origin

## Example

    Version in package.json: 0.1.3
    Current npm release: 0.1.3
    New version> 0.2.0
    npm http PUT https://registry.npmjs.org/npm-mkrelease
    npm http 409 https://registry.npmjs.org/npm-mkrelease
    npm http GET https://registry.npmjs.org/npm-mkrelease
    npm http 200 https://registry.npmjs.org/npm-mkrelease
    npm http PUT https://registry.npmjs.org/npm-mkrelease/-/npm-mkrelease-0.2.0.tgz/-rev/7-83abaf627ee5a620a7338bcfab0e80c7
    npm http 201 https://registry.npmjs.org/npm-mkrelease/-/npm-mkrelease-0.2.0.tgz/-rev/7-83abaf627ee5a620a7338bcfab0e80c7
    npm http PUT https://registry.npmjs.org/npm-mkrelease/0.2.0/-tag/latest
    npm http 201 https://registry.npmjs.org/npm-mkrelease/0.2.0/-tag/latest
    + npm-mkrelease@0.2.0
    [master 2b8ec74] Release 0.2.0
     1 file changed, 2 insertions(+), 2 deletions(-)
    To git@github.com:epeli/npm-mkrelease.git
     * [new tag]         0.2.0 -> 0.2.0
    To git@github.com:epeli/npm-mkrelease.git
       4e43cb1..2b8ec74  master -> master
    DONE

## Warning!

This tool is bit opinionated and does things you might not be able to revert.
Do not use it if you are not sure that it does what you want.
