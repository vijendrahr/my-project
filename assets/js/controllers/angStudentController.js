define(function () {
    return ['$scope', '$http', function($scope, $http) {
      
 
function resetItem(){
   $scope.student = {
	  studId:,
	  name : '',
      email : '',
      phone : '',
      id : ''
   };              
   $scope.displayForm = '';
   
}
resetItem();
 
 $scope.addItem = function () {
   resetItem();
   $scope.displayForm = true;
 }
 
 
$scope.saveItem = function () {
  var stud = $scope.student;
      if (stud.id.length == 0){
            $http.get('/student/create?studId=' + stud.studId + '&name=' + stud.name + '&email=' +  stud.email + '&phone=' +  stud.phone).success(function(data) {
              $scope.items.push(data);
              $scope.displayForm = '';
              removeModal();
            }).
  error(function(data, status, headers, config) {
    alert(data.summary);
  });
          }
          else{
            $http.get('/student/update/'+ stud.id +'?name=' + stud.name + '&email=' +  stud.email + '&phone=' +  stud.phone).success(function(data) {
              $scope.displayForm = '';
              removeModal();
            }).
  error(function(data, status, headers, config) {
    alert(data.summary);
  });
          }
        };
 
$scope.editItem = function (data) {       
        $scope.student = data;
        $scope.displayForm = true;
}
 
        $scope.removeItem = function (data) {
          if (confirm('Do you really want to delete?')){
            $http['delete']('/student/' + data.id).success(function() {
              $scope.items.splice($scope.items.indexOf(data), 1);
            });
          }
        };
 
        $http.get('/student/find').success(function(data) {
          for (var i = 0; i < data.length; i++) {
            data[i].index = i;
          }
          $scope.items = data;
        });
 
        function removeModal(){
          $('.modal').modal('hide');          
      }
 
    }];
});