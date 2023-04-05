window.BookRoomController = function ($scope, $http) {
  //tham số $http là giao thức để gọi api
  $scope.title = "Đặt phòng";
  let apiURL = " http://localhost:3000/bill"; // điền link api mà mình muốnn gọi

  $scope.getData = function () {
    $http.get(apiURL).then(function (response) {
      // console.log(response);
      if (response.status === 200) {
        $scope.bill = response.data;
      }
    });
  };
  $scope.getData();

  $scope.kiemTraDuLieu = {
    ngaynhanphong: false,
    ngaytraphong: false,
    name: false,
    cmnd: false,
    ngaysinh: false,
    gender: false,
    email: false,
    address: false,
    numberphone: false,
    pttt: false,
  };

  $scope.onClose = function () {
    $scope.inputValue = {
      ngaynhanphong: "",
      ngaytraphong: "",
      name: "",
      cmnd: "",
      ngaysinh: "",
      gender: "",
      email: "",
      address: "",
      numberphone: "",
      pttt: "",
    };
    $scope.editId = 0;
  };

  $scope.onSubmitForm = function () {
    let flag = false;
    const arr = [
      "ngaynhanphong",
      "ngaytraphong",
      "name",
      "cmnd",
      "ngaysinh",
      "gender",
      "email",
      "address",
      "numberphone",
      "pttt",
    ];

    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const cmndRegex = /^\d+$/;

    for (let i = 0; i < arr.length; i++) {
      const arr2 = arr[i];
      if (!$scope.inputValue || !$scope.inputValue[arr2]) {
        $scope.kiemTraDuLieu[arr2] = "Vui lòng nhập trường này";
        flag = true;
      } else {
        switch (arr2) {
          case "numberphone":
            if (!phoneRegex.test($scope.inputValue[arr2])) {
              $scope.kiemTraDuLieu[arr2] = "Số điện thoại không đúng định dạng";
              flag = true;
            } else {
              $scope.kiemTraDuLieu[arr2] = false;
            }
            break;
          case "email":
            if (!emailRegex.test($scope.inputValue[arr2])) {
              $scope.kiemTraDuLieu[arr2] = "Email không đúng định dạng";
              flag = true;
            } else {
              $scope.kiemTraDuLieu[arr2] = false;
            }
            break;
          case "cmnd":
            if (!cmndRegex.test($scope.inputValue[arr2])) {
              $scope.kiemTraDuLieu[arr2] = "CMND || CCCD phải là số";
              flag = true;
            } else {
              $scope.kiemTraDuLieu[arr2] = false;
            }
            break;
          default:
            $scope.kiemTraDuLieu[arr2] = false;
        }
      }
    }

    if (!flag) {
      function formatDate(dateString) {
        const dateObj = new Date(dateString);
        const year = dateObj.getFullYear();
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        const date = dateObj.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${date}`;
      }

      const ngaySinh = formatDate($scope.inputValue.ngaysinh);
      const ngayNhanPhong = formatDate($scope.inputValue.ngaynhanphong);
      const ngayTraPhong = formatDate($scope.inputValue.ngaytraphong);

      //xử lý sửa
      let editId = $scope.editId;
      // kiểm tra nếu tồn tại edtId là sửa
      if (editId) {
        //tạo đối tượng updateItem
        let updateItem = {
          ngaynhanphong: ngayNhanPhong,
          ngaytraphong: ngayTraPhong,
          name: $scope.inputValue.name,
          cmnd: $scope.inputValue.cmnd,
          ngaysinh: ngaySinh,
          gender: $scope.inputValue.gender,
          email: $scope.inputValue.email,
          address: $scope.inputValue.address,
          numberphone: $scope.inputValue.numberphone,
          pttt: $scope.inputValue.pttt,
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
        ngaynhanphong: ngayNhanPhong,
        ngaytraphong: ngayTraPhong,
        name: $scope.inputValue.name,
        cmnd: $scope.inputValue.cmnd,
        ngaysinh: ngaySinh,
        gender: $scope.inputValue.gender,
        email: $scope.inputValue.email,
        address: $scope.inputValue.address,
        numberphone: $scope.inputValue.numberphone,
        pttt: $scope.inputValue.pttt,
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

  // Sửa
  $scope.onEdit = function (editId) {
    $scope.editId = editId;
    $http.get(`${apiURL}/${editId}`).then(function (response) {
      if (response.status == 200) {
        $scope.inputValue = {
          ngaynhanphong: new Date(response.data.ngaynhanphong),
          ngaytraphong: new Date(response.data.ngaytraphong),
          name: response.data.name,
          cmnd: response.data.cmnd,
          ngaysinh: new Date(response.data.ngaysinh),
          gender: response.data.gender,
          email: response.data.email,
          address: response.data.address,
          numberphone: response.data.numberphone,
          pttt: response.data.pttt,
        };
        
        
      }
      console.log(response);
    });
  };

  //Xoá
  $scope.onDelete = function (deleteId) {
    let confirm = window.confirm("Are you sure you want to delete");
    if (confirm) {
      $http.delete(`${apiURL}/${deleteId}`).then(function (response) {
        if (response.status == 200) {
          $scope.getData();
        }
      });
    }
  };
};
