'use strict';

describe('controllers: Project', function () {
  var $httpBackend, $rootScope, $controller, $location,
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

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  describe('ProjectListCtrl', function () {
    var TestProjectListCtrl;

    beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET', '/api/projects').respond(projects);

      $rootScope = $injector.get('$rootScope');
      $controller = $injector.get('$controller');
      TestProjectListCtrl = function () {
        return $controller('ProjectListCtrl', {'$scope': $rootScope});
      }
    }));

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
  });

  describe('ProjectEditCtrl', function () {
    var TestProjectEditCtrl;

    beforeEach(inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      $httpBackend.when('GET').respond(projects[0]);

      $rootScope = $injector.get('$rootScope');
      $location = $injector.get('$location');
      $controller = $injector.get('$controller');
      TestProjectEditCtrl = function () {
        return $controller('ProjectEditCtrl', {'$scope': $rootScope});
      }
    }));

    it('should save if object is changed', function () {
      var controller = TestProjectEditCtrl();
      $httpBackend.flush();
      $rootScope.project.name = "Project #2 New Name";

      $httpBackend.expectPUT('/api/projects/' + escape($rootScope.project._id.$oid)).respond();
      $rootScope.save();
      $httpBackend.flush();
    });

    it('should not save if objects are alike', function () {
      var controller = TestProjectEditCtrl();
      $httpBackend.flush();
      $rootScope.save();
    });
  });
});
