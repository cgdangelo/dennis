'use strict'

angular.module('dennis', [
  'ngResource',
  'dennis.project'
])
  .config(($routeProvider) ->
    $routeProvider.
      # Projects
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
        when('/projects/edit/:id',
          controller: 'ProjectEditCtrl',
          templateUrl: '/projects/detail.html'
        ).

      otherwise(redirectTo: '/projects')
  )
