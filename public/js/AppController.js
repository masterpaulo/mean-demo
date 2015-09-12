
function AppCtrl($http){
	console.log('Hello world form controller');
	//var contacts = '';
	var list = this;

	var refresh = function(){
		$http.get('/contactlist').success(function(res){
			console.log("I got the data I requested.");
			list.contacts = res;
		});
	};
	refresh();
	list.addContact = function(){
		console.log(list.contact);
		$http.post('/contactlist', list.contact).success(function(res){
			console.log(res);
			refresh();
		});
	}
	list.remove = function(id){
		console.log("removing entry : "+ id);
		$http.delete('/contactlist/' + id).success(function(res){
			console.log(res);
			refresh();
		});

	}
	list.edit = function(id){
		console.log("editing entry : " + id);
		$http.get('/contactlist/' + id).success(function(res){
			console.log(res);
			list.contact = res;
			refresh();

		});
	}
	list.update = function(){
		console.log(list.contact._id);
		$http.put('/contactlist/' + list.contact._id, list.contact).success(function(res){
			refresh();
		});
	}
	list.clear = function(){
		list.contact = "";
	}
}

angular.module('contactListApp',[])
	.controller('AppCtrl', AppCtrl);