angular.module('dennis.project', ['ngResource']).
  factory 'Project', ['$resource', ($resource) ->
    Project = $resource '/api/projects/:oid', oid: "@_id.$oid",
      update:
        method: 'PUT'

    Project
  ]
