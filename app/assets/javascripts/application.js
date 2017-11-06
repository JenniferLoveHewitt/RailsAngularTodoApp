//= require bootstrap
//= require jquery
//= require jquery_ujs
//= require angular
//= require angular-route
//= require angular-resource
//= require angular-rails-templates
//= require rails-ujs
//= require turbolinks
//= require_tree .

app = angular.module("todoapp", ['templates', 'ngRoute', 'ngResource']);

app.config(function($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "templates/index.html",
        controller: "TasksController"
    });
});

app.controller("TasksController", function($scope, $routeParams, $location, $resource){
    Task = $resource('/tasks/:taskId', { taskId: "@id", format: 'json' }, {
        update: {method: "PUT"},
        create: {method:'POST'},
        delete: {method:'DELETE', params: '@id', responseType: 'json'}
    });

    getTasks();

    function getTasks() {
        if ($routeParams.keywords) {
            Task.query({keywords: $routeParams.keywords}, function(results){
                $scope.tasks = results});
        }
        else {
            $scope.tasks = Task.query();
        }
    }

    $scope.propertyName = 'name';
    $scope.reverse = true;

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.toggleActive = function(task) {
        task.active = !task.active;
        task.$update();
    };

    $scope.search = function(keywords){
        $location.path("/").search('keywords', keywords);
    };

    $scope.addTask = function () {
        //task = Task.save($scope.newTask);

        var task = new Task($scope.newTask);
        task.active = true;
        task.created_at = new Date();
        task.$save();

        $scope.tasks.push(task);
        $scope.newTask = {};
    };

    $scope.delete = function(task) {
        task.$delete();
        $scope.tasks.splice( $scope.tasks.indexOf(task), 1 )
    };
});