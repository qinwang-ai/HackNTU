'use strict';
var path = require('path');
var fs = require('fs-extra');
var sleep = require('sleep');


fs.removeSync(path.join(__dirname, '/repo'));

fs.copySync(path.join(__dirname, '/storage/db2.rdb'), path.join(__dirname, '/repo/db.rdb'));

fs.copySync(path.join(__dirname, '/storage/avatar.jpg'), path.join(__dirname, '/repo/avatar.jpg'));

for(var i = 1; i <= 10; i++) {
  console.log('Sync Status: ' + i*10 + '% ...');
  sleep.usleep(500000);
}

console.log('---------------------------------');
console.log('Sync Complete!');
