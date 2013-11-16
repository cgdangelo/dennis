angular.module('dennis.project', ['ngResource']).
  factory 'Project', ['$resource', ($resource) ->
    Project = $resource '/api/projects/:id', id: "@id",
      update:
        method: 'PUT'

    Project
  ]
