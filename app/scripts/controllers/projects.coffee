angular.module('dennis').controller 'ProjectListCtrl', ['$scope', 'Project', ($scope, Project) ->
  $scope.list = -> $scope.projects = Project.query()

  # Call destroy action, pass list action as callback
  $scope.destroy = (project) -> project.$delete $scope.list

  $scope.list()
]

angular.module('dennis').controller 'ProjectNewCtrl', ['$scope', '$location', 'Project', ($scope, $location, Project) ->
  $scope.save = ->
    Project.save $scope.project, -> $location.path '/'
]

angular.module('dennis').controller 'ProjectEditCtrl', ['$scope', '$routeParams', '$location', 'Project', ($scope, $routeParams, $location, Project) ->
  Project.get oid: $routeParams.oid, (project) ->
    $scope.project = project
    $scope.original = angular.copy project

  $scope.save = ->
    if not angular.equals($scope.original, $scope.project)
      $scope.project.$update -> $location.path '/'
]
