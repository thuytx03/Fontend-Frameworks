window.GioiThieuController = function ($scope, $routeParams, $http) {
  // $routeParams sẽ ra một đối tượng chưa param trên url
  // console.log($routeParams.name);
  $scope.title = "Đây là trang giới thiệu";

  //tham số $http là giao thức để gọi api
  let apiURL = " http://localhost:3000/posts"; // điền link api mà mình muốnn gọi

  $scope.getData = function () {
    $http.get(apiURL).then(function (response) {
      //khi gọi api thành công cục reponse se nhận dữ liệu
      // console.log(response);
      if (response.status == 200) {
        $scope.danhsach = response.data;
      }
    });
  };
  $scope.getData();
  
  $scope.kiemTraDuLieu = {
    ten: false, //chưa có lỗi mặc định là false
    tuoi: false,
  };
  $scope.onClose = function () {
    $scope.inputValue = {
      ten: "",
      tuoi: "",
    };
    $scope.editId = 0;
  };
  $scope.onSubmitForm = function () {
    let flag = false;
    if (!$scope.inputValue || !$scope.inputValue.ten) {
      $scope.kiemTraDuLieu.ten = true; //có lỗi là true
      flag = true;
    }

    if (!$scope.inputValue || !$scope.inputValue.tuoi) {
      $scope.kiemTraDuLieu.tuoi = true; //có lỗi là true
      flag = true;
    }
    if (!flag) {
      //xử lý sửa
      let editId = $scope.editId;
      // kiểm tra nếu tồn tại edtId là sửa
      if (editId) {
        //tạo đối tượng updateItem
        let updateItem = {
          ten: $scope.inputValue.ten,
          tuoi: $scope.inputValue.tuoi,
        };
        $http
          .put(
            `${apiURL}/${editId}`, //đường link cập nhật theo id
            updateItem //dữ liệu được update
          )
          .then(function (response) {
            if (response.status === 200) {
              $scope.getData(); //gọi lại hàm getData để update lại
            }
          });
        $scope.onClose();
        return;
      }

      let newItem = {
        ten: $scope.inputValue.ten,
        tuoi: $scope.inputValue.tuoi,
      };
      $http
        .post(
          apiURL, // đường dẫn api
          newItem //dữ liệu thêm
        )
        .then(function (response) {
          console.log(response);  
          if (response.status == 201) {
            $scope.getData();
          }
        });
      $scope.onClose();
    }
  };
  $scope.onEdit = function (editId) {
    $scope.editId = editId;
    // goij API để lấy dữ liệu theo edit ID và bắn lên form
    $http.get(`${apiURL}/${editId}`).then(function (response) {
      if (response.status == 200) {
        //hiển thị thông tin cần sửa lên form
        $scope.inputValue = {
          ten: response.data.ten,
          tuoi: response.data.tuoi,
        };
      }
      console.log(response);
    });
  };
  $scope.onDelete = function (deleteId) {
    let confirm = window.confirm("Bạn có muốn xoá không?");
    if (confirm) {
      //xoá
      $http.delete(`${apiURL}/${deleteId}`).then(function (response) {
        if (response.status == 200) {
          //hiển thị thông tin cần sửa lên form
          $scope.getData();
        }
      });
    }
  };
};
