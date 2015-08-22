'use strict';
var Chance = require('chance');
var co = require('co');
var urllib = require('urllib');

exports.index = {
  cicles: []
};

exports.random = function (obj) {
  var r = Math.random();
  // console.log(r);
  if(!obj) {
    return r;
  }
  return (r * (obj.max - obj.min) + obj.min).toFixed(6);
};

co(function* () {
  var chance;

  var result = 971389403;
  for(var i = 0; i < 40; i++) {
    // chance = new Chance(result);
    exports.index.cicles.push({
      center: {
        // lat: chance.floating({min: 8.581553, max: 8.583089, fixed: 6}),
        // lng: chance.floating({min:123.342051 , max: 123.343237, fixed: 6}) },
        lat: exports.random({min: 8.579553, max: 8.583089, fixed: 6}),
        lng: exports.random({min:123.342051 , max: 123.343237, fixed: 6})
      },
      radius: 100
    });
    // result = chance.integer({min: 1, max: 100000});
  }
});