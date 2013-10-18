'use strict'

angular.module('dennis', [
  'ngResource',
  'dennis.project'
])
  .config(($routeProvider) ->
    $routeProvider.
      when('/',
        redirectTo: '/projects'
      ).
      when('/projects',
        controller: 'ProjectListCtrl',
        templateUrl: '/projects/list.html'
      ).
      when('/projects/new',
        controller: 'ProjectNewCtrl',
        templateUrl: '/projects/detail.html'
      ).
      when('/projects/edit/:oid',
        controller: 'ProjectEditCtrl',
        templateUrl: '/projects/detail.html'
      ).
      otherwise(redirectTo: '/projects')
  )
