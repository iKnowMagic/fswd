'use strict';

angular.module('confusionApp')

/*
Note that I am using baseURL = '/',
this should work just fine.
If you have issues, please update to:
baseURL = 'http://localhost:3000/' or
baseURL = 'http://localhost:YOURSERVERPORT/'
*/
.constant('baseURL', '/')

.service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {

  this.getDishes = function() {
    return $resource(baseURL + 'dishes/:id', null, {
      'update': {
        method: 'PUT'
      }
    });
  };


  /*
  Assignment 4 - Task 1
  Update getPromotion() to return a resource that enables
  the fetching of the promotion data from the server
  */
  this.getPromotions = function() {
    return $resource(baseURL + 'promotions/:id');
  };

}])

.factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {

  var corpfac = {};

  /*
  Assignment 4 - Task 2
  Update corporateFactory to return the resource for the leadership
  */
  corpfac.getLeaders = function() {
    return $resource(baseURL + 'leadership/:id');
  };

  return corpfac;

}])

/*
Assignment 4 - Task 3
Implement a feedbackFactory to return the resource for the feedback
*/
.service('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL) {
  this.feedback = function() {
    return $resource(baseURL + 'feedback');
  };
}])

;
