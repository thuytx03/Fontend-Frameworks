window.EditPhoneController = function ($scope, $routeParams, $window, $http) {
  let apiUrl = "http://localhost:3000/dienthoai";

  let id = $routeParams.id;

  $http.get(`${apiUrl}/${id}`).then(function (response) {
    if (response.status == 200) {
      $scope.inputValue = {
        ten: response.data.ten,
        hang: response.data.hang,
        dungLuong: response.data.dungLuong,
        gia: response.data.gia,
      };
    }
  });

  $scope.onSubmitForm = function () {
    if (id) {
      let newUpdate = {
        ten: $scope.inputValue.ten,
        hang: $scope.inputValue.hang,
        dungLuong: $scope.inputValue.dungLuong,
        gia: $scope.inputValue.gia,
      };
      $http.put(`${apiUrl}/${id}`, newUpdate).then(function (response) {
        if(response.status=200){
            $window.alert("Cập nhật sản phẩm thành công");

            $scope.getData();
        }
      });
    }
  };
};
