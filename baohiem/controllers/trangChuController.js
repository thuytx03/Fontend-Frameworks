window.trangChuController = function ($scope, $routeParams) {
  $scope.kiemTra = false;
  if ($routeParams.name == "nhanvien") {
    $scope.title = " Nhân viên";
  } else if ($routeParams.name == "canbo") {
    $scope.title = " Cán bộ";
  } else {
    $scope.title = " Quản lý";
  }

  $scope.check = {
    name: false,
    day: false,
    gender: false,
    rank: false,
  };

  $scope.submit = () => {
    let flag = false;
    //check validate
    if (!$scope.input || !$scope.input.name) {
      $scope.check.name = true;
      flag = true;
    } else {
      $scope.check.name = false;
    }
    if (!$scope.input || !$scope.input.day) {
      $scope.check.day = true;
      flag = true;
    } else {
      $scope.check.day = false;
    }
    if (!$scope.input || !$scope.input.rank) {
      $scope.check.rank = true;
      flag = true;
    } else {
      $scope.check.rank = false;
    }

    if (!$scope.input || !$scope.input.gender) {
      $scope.check.gender = true;
      flag = true;
    } else {
      $scope.check.gender = false;
    }

    if ($scope.check.name == false && $scope.check.day == false) {
      if ($scope.input.rank == 1) {
        $scope.bac = "bậc 1";
        $scope.totalMoney = $scope.input.day * Number(700);
      } else if ($scope.input.rank == 2) {
        $scope.bac = "bậc 2";
        $scope.totalMoney = $scope.input.day * Number(1200);
      } else {
        $scope.bac = "bậc 3";
        $scope.totalMoney = $scope.input.day * Number(2400);
      }

      $scope.gender = $scope.input.gender == 1 ? "Ông" : "Bà";
      $scope.name = $scope.input.name;
      $scope.kiemTra = true;
    }
  };
};
