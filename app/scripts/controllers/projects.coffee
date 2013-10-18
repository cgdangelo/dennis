angular.module('dennis').controller 'ProjectListCtrl', ($scope, Project) ->
  $scope.projects = Project.query()
  $scope.destroy = (project) ->
    Project.delete oid: project._id.$oid, (response) ->
      $scope.projects = response

angular.module('dennis').controller 'ProjectNewCtrl', ($scope, $location, Project) ->
  $scope.save = ->
    Project.save $scope.project, ->
      $location.path '/'

angular.module('dennis').controller 'ProjectEditCtrl', ($scope, $routeParams, Project) ->
  Project.get oid: $routeParams.oid, (project) =>
    @.original = project
    $scope.project = new Project project

  $scope.save = ->
    $scope.project.update()
