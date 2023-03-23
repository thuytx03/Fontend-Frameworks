window.TrangChuController = function ($scope) {
  $scope.title = "Bài 1 - Lab 4";
  $scope.ten = "thuy";
  $scope.tuoi = 19;
  $scope.sdt = "89821423432";
  $scope.diem = 8.5;
};
window.BaiTap2Controller = function ($scope) {
  $scope.title = "Bài 2 - Lab 4";
  $scope.info = [
    {
      ten: "thuy",
      tuoi: 18,
      sdt: "1234234",
      diem: 8.5,
    },
    {
      ten: "xuan",
      tuoi: 19,
      sdt: "123423476",
      diem: 9,
    },
  ];
};
window.BaiTap3Controller = function ($scope) {
    $scope.title = "Bài 3 - Lab 4";
    $scope.info=
    [
    {
        ten:"thuy",
        tuoi:18,
        sdt:"1234234",
        diem:8.5,
        img:"img/70.jfif"
    },
    {
        ten:"xuan",
        tuoi:19,
        sdt:"123423476",
        diem:9,
        img:"img/70.jfif"


    }
    ];
  };

  window.BaiTap4Controller = function ($scope) {
    $scope.title = "Bài 4 - Lab 4";
    $scope.calculate = function () {
        var a = parseFloat($scope.width);
        var b = parseFloat($scope.length);
        $scope.acreage = a * b;
        $scope.perimeter = (a + b) * 2;
    }
  };

  window.BaiTap5Controller = function ($scope) {
    $scope.title = "Bài 5 - Lab 4";
    $scope.hienthi = function () {

        $scope.a;
        var b = parseFloat($scope.diem);
        if (b > 5) {
            var name = $scope.name;
            var ma = $scope.ma;
            var mail = $scope.mail;
            $scope.a = "đậu";
        } if (b < 5) {
            var name = $scope.name;
            var ma = $scope.ma;
            var mail = $scope.mail;
            $scope.a = "rớt";
        }

    }
  };
