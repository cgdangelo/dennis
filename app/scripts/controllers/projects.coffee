angular.module('dennis').controller 'ProjectListCtrl', ['$scope', 'Project', ($scope, Project) ->
  $scope.projects = Project.query()
  $scope.destroy = (project) ->
    Project.delete oid: project._id.$oid, (response) ->
      $scope.projects = response
]

angular.module('dennis').controller 'ProjectNewCtrl', ['$scope', '$location', 'Project', ($scope, $location, Project) ->
  $scope.save = ->
    Project.save $scope.project, ->
      $location.path '/'
]

angular.module('dennis').controller 'ProjectEditCtrl', ['$scope', '$routeParams', '$location', 'Project', ($scope, $routeParams, $location, Project) ->
  Project.get oid: $routeParams.oid, (project) =>
    $scope.project = new Project project
    $scope.original = angular.copy project

  $scope.save = ->
    if not angular.equals($scope.original, $scope.project)
      $scope.project.update()

    $location.path '/'
]
