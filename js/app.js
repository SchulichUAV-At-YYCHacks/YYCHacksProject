//app.js

var user = angular.module('user', [])
user.controller('userctrl', function($scope){
	$scope.UserName = "Calder Kitagawa";
	$scope.UserExp = 1000;
});

var data = angular.module('data', ['angular-route'])
data.config(function($routeProvider){
	$routeProvider
});

var events = angular.module('events', []);
events.controller('eventscontroller', function($scope, $http) {
	$scope.sendData = function() {
		var data = $.param({
			json: JSON.stringify({
				type: "Events_Select"
			})
		});
		$http.post("localhost:8080", data).success(function(data, status) {
        	$scope.hello = data;
        	console.log($scope.hello);
    	})
	}
});

$(document).ready(function(){
	$('#event').click(function(){
		$('#loader').load("html/Events.html")
	});
	$('#org').click(function(){
		$('#loader').load("html/Organizations.html")
	});
	$('#map').click(function(){
		$('#loader').load("html/map.html")
	});
	$('#myEvents').click(function(){
		$('#loader').load("html/MyEvents.html")
	});
	$('#myOrgs').click(function(){
		$('#loader').load("html/MyOrganizations.html")
	});
	$('#uEvents').click(function(){
		$('#loader').load("html/UpcomingEvents.html")
	});
	$('#brandarea').click(function(){
		$('#loader').load("html/Main.html")
	});
	$('.nav-list').on('click', 'li', function() {
    	$('.nav-list li.active').removeClass('active');
    	$(this).addClass('active');
	});
});