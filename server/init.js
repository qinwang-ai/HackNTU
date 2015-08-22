'use strict';
var path = require('path');
var fs = require('fs-extra');
var sleep = require('sleep');


fs.removeSync(path.join(__dirname, '/repo'));

fs.copySync(path.join(__dirname, '/storage/db1.rdb'), path.join(__dirname, '/repo/db.rdb'));


for(var i = 1; i <= 10; i++) {
  console.log('Init Status: ' + i*10 + '% ...');
  sleep.usleep(300000);
}

console.log('---------------------------------');
console.log('Init Complete!');
