window.EditProductController = function($scope, $routeParams, $http,$window) {
    let apiUrl="http://localhost:3000/product";
    let id = $routeParams.id;
  
    $http.get(`${apiUrl}/${id}`).then(function(response) {
      if (response.status == 200) {
        $scope.inputValue = {
          name: response.data.name,
          price: response.data.price,
          categoryName: response.data.categoryName,
        };
      }
    });
  
    $scope.onSubmitForm = function() {
      if(id){
        let updateItem={
          name:$scope.inputValue.name,
          price:$scope.inputValue.price,
          categoryName:$scope.inputValue.categoryName,
        }

        $http.put(`${apiUrl}/${id}`,updateItem).then(function(response){
          if(response.status==200){
            $window.alert("Cập nhật thành công sản phẩm");
            $scope.getData();

          }
        })
      }
    };
  };
  