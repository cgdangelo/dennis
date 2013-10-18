angular.module('dennis.project', ['ngResource']).
  factory 'Project', ['$resource', ($resource) ->
    Project = $resource '/api/projects/:oid', null,
      update:
        method: 'PUT'

      delete:
        method: 'DELETE'
        isArray: true

    # @FIXME
    Project::update = (data) ->
      Project.update oid: @._id.$oid, @, data

    Project
  ]
