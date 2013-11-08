angular.module('dennis.capConfig', ['ngResource']).
  factory 'CapConfig', ['$resource', ($resource) ->
    CapConfig = $resource '/api/cap-configs/:oid', oid: "@oid",
      update:
        method: 'PUT'

    CapConfig
  ]
