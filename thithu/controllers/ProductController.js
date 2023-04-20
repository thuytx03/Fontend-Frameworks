window.ProductController = function ($scope, $http, $window, $location) {
  let apiUrl = "http://localhost:3000/product";
  $scope.getData = function () {
    $http.get(apiUrl).then(function (response) {
      if (response.status == 200) {
        $scope.product = response.data;
       
      }
    });
  };
  $scope.getData();

  $scope.kiemTraDuLieu = {
    name: false,
    price: false,
    categoryName: false,
  };
  $scope.onClose = function () {
    $scope.inputValue = {
      name: "",
      price: "",
      categoryName: "",
    };
    $scope.editId = 0;
  };
  $scope.onSubmitForm = function () {
    let flag = false;
    const arr = ["name", "price", "categoryName"];
    for (let index = 0; index < arr.length; index++) {
      const arr2 = arr[index];
      if (!$scope.inputValue || !$scope.inputValue[arr2]) {
        $scope.kiemTraDuLieu[arr2] = "Vui lòng nhập trường dữ liệu này";
        flag = true;
      } else {
        $scope.kiemTraDuLieu[arr2] = false;
      }
    }
    if($scope.inputValue.price && $scope.inputValue.price <100){
      $scope.kiemTraDuLieu.price="Phải lớn hơn 100";
      flag = true;
    }else{
      $scope.kiemTraDuLieu.price=false; 
    }
    if (!flag) {
      //thêm sản phẩm
      let newItem = {
        name: $scope.inputValue.name,
        price: $scope.inputValue.price,
        categoryName: $scope.inputValue.categoryName,
      };
      $http.post(apiUrl, newItem).then(function (response) {
        if (response.status == 201) {
          $scope.getData();
          $window.alert("Thêm sản phẩm thành công!");
        }
      });
      $scope.onClose();
    }
  };

  $scope.onEdit = function (editId) {
    $scope.editId = editId;
    $location.path(`product/${editId}/edit`);
  };

  $scope.onDelete = function (deleteId) {
    let confirm = window.confirm("Bạn có chắc muốn xoá sản phẩm");
    if (confirm) {
      $http.delete(`${apiUrl}/${deleteId}`).then(function (response) {
        if (response.status == 200) {
          $scope.getData();
        }
      });
    }
  };
};
