window.NhanVienController = function ($scope, $http, $filter) {
  $scope.title = "Quản lý nhân viên";
  $scope.today = new Date();


  let apiURL = "http://localhost:3000/nhanvien";

  $scope.getData = function () {
    $http.get(apiURL).then(function (response) {
      if (response.status == 200) {
        $scope.nhanvien = response.data;
      }
    });
  };
  $scope.getData();

  $scope.kiemTraDuLieu = {
    name: false,
    gender: false,
    year: false,
    level: false,
    sogiolamviec: false,
  };
  $scope.onClose = function () {
    $scope.inputValue = {
      name: "",
      gender: "",
      year: "",
      level: "",
      sogiolamviec: "",
    };
    $scope.editId = 0;

  };

  $scope.onSubmitForm = function () {
    let flag = false;
    const arr = ["name", "gender", "year", "level", "sogiolamviec"];
    for (let i = 0; i < arr.length; i++) {
      const arr2 = arr[i];
      if (!$scope.inputValue || !$scope.inputValue[arr2]) {
        $scope.kiemTraDuLieu[arr2] = "Vui lòng nhập trường này";
        flag = true;
      } else {
        $scope.kiemTraDuLieu[arr2] = false;
      }
    }   
    if (!flag) {
      
      if ($scope.inputValue.level == 1) {
        $scope.totalMoney = $scope.inputValue.sogiolamviec * Number(70);
      } else if ($scope.inputValue.level == 2) {
        $scope.totalMoney = $scope.inputValue.sogiolamviec * Number(90);
      } else {
        $scope.totalMoney = $scope.inputValue.sogiolamviec * Number(120);
      }
      
      //xử lý sửa
      let editId = $scope.editId;
      // kiểm tra nếu tồn tại edtId là sửa
      if (editId) {
        //tạo đối tượng updateItem
        let updateItem = {
          name: $scope.inputValue.name,
          gender: $scope.inputValue.gender,
          year: $scope.inputValue.year,
          level: $scope.inputValue.level,
          sogiolamviec: $scope.inputValue.sogiolamviec,
          totalMoney: $scope.totalMoney,
        };
        $http
          .put(
            `${apiURL}/${editId}`, //đường link cập nhật theo id
            updateItem //dữ liệu được update
          )
          .then(function (response) {
            if (response.status == 200) {
              $scope.getData(); //gọi lại hàm getData để update lại
            }
          });
        $scope.onClose();
        return;
      }

      let newItem = {
        name: $scope.inputValue.name,
        gender: $scope.inputValue.gender,
        year: $scope.inputValue.year,
        level: $scope.inputValue.level,
        sogiolamviec: $scope.inputValue.sogiolamviec,
        totalMoney: $scope.totalMoney,
        
      };

      $http.post(apiURL, newItem).then(function (response) {
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
      
      $http.get(`${apiURL}/${editId}`).then(function (response) {
        if (response.status == 200) {
            $scope.inputValue={
                name:response.data.name,
                gender:response.data.gender,
                year:response.data.year,
                level:response.data.level,
                sogiolamviec:response.data.sogiolamviec,
            }
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
