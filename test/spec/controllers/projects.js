'use strict';

describe('Controller: ProjectListCtrl', function () {
  var $httpBackend, $rootScope, $controller;
  var TestProjectListCtrl,
      projects = [
        {
          "_id": {"$oid": "Object ID #1"},
          "name": "Project Name #1",
          "synopsis": "Short description of Project #1",
          "repo":"git@github.com:user/project-1.git"
        },

        {
          "_id": {"$oid": "Object ID #2"},
          "name": "Project Name #2",
          "synopsis": "Short description of Project #2",
          "repo":"git@github.com:user/project-2.git"
        },

        {
          "_id": {"$oid": "Object ID #3"},
          "name": "Project Name #3",
          "synopsis": "Short description of Project #3",
          "repo":"git@github.com:user/project-3.git"
        }
      ];


  beforeEach(function () {
    module('dennis');
  });

  beforeEach(inject(function ($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/api/projects').respond(projects);

    $rootScope = $injector.get('$rootScope');
    $controller = $injector.get('$controller');
    TestProjectListCtrl = function () {
      return $controller('ProjectListCtrl', {'$scope': $rootScope});
    }
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get list of projects from api', function () {
    $httpBackend.expectGET('/api/projects');
    var controller = TestProjectListCtrl();
    $httpBackend.flush();
  });

  it('should add projects to list', function () {
    var controller = TestProjectListCtrl();
    $httpBackend.flush();
    expect($rootScope.projects.length).toBe(3);
  });

  it('should remove project from list when deleting', function () {
    var deletingProject = projects[0],
        controller = TestProjectListCtrl();
    $httpBackend.flush();
    $httpBackend.expectDELETE('/api/projects/' + escape(deletingProject._id.$oid)).respond(function() {
      $rootScope.projects.pop();
      return $rootScope.projects;
    });
    $rootScope.destroy(deletingProject);
    $httpBackend.flush();
    expect($rootScope.projects.length).toBe(2);
  });
});
