window.GioiThieuController = function ($scope, $routeParams) {
  // $routeParams sẽ ra một đối tượng chưa param trên url
  // console.log($routeParams.name);
  $scope.title = "Đây là trang giới thiệu";
  $scope.danhsach = [
    {
      id: 1,
      ten: "Thuy",
      tuoi: 19,
    },
    {
      id: 2,
      ten: "Xuan",
      tuoi: 19,
    },
  ];

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
        for (let i = 0; i < $scope.danhsach.length; i++) {
          if ($scope.danhsach[i].id == editId) {
            ($scope.danhsach[i].ten = $scope.inputValue.ten),
              ($scope.danhsach[i].tuoi = $scope.inputValue.tuoi);
          }
        }
        $scope.onClose();
        return;
      }

      let ds = $scope.danhsach;
      //fake id tự tăng
      let newId = ds.length > 0 ? ds[ds.length - 1].id + 1 : 1;
      let newItem = {
        id: newId,
        ten: $scope.inputValue.ten,
        tuoi: $scope.inputValue.tuoi,
      };
      $scope.danhsach.push(newItem);
      $scope.onClose();
    }
  };
  $scope.onEdit = function (editId) {
    $scope.editId = editId;
    //tạo ra một đối tượng editItem
    let editItem = {
      ten: "",
      tuoi: "",
    };
    for (let i = 0; i < $scope.danhsach.length; i++) {
      if ($scope.danhsach[i].id == editId) {
        editItem.ten = $scope.danhsach[i].ten;
        editItem.tuoi = $scope.danhsach[i].tuoi;
      }
    }
    //hiển thị thông tin cần sửa lên form
    $scope.inputValue = {
      ten: editItem.ten,
      tuoi: editItem.tuoi,
    };
  };
  $scope.onDelete = function (deleteId) {
    let confirm = window.confirm("Bạn có muốn xoá không?");
    if (confirm) {
      //xoá
      $scope.danhsach = $scope.danhsach.filter(function (item) {
        return item.id !== deleteId;
      });
    }
  };
};
