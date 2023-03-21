
  //Khai báo angular js cùng với vùng mình sử dụng
  var app = angular.module("myapp", []);

  //thực hiệc map hàm myFunc với vùng infoController để render dữ liệu ra
  app.controller("infoController", function myInfo($scope) {
    // $scope.name="Thuỷ";
    // $scope.age="19";
    // $scope.phone="0121423534";
    $scope.info = [
      {
        name: "Thuy",
        age: 19,
        phone: "0988766663",
      },
      {
        name: "Xuan",
        age: 19,
        phone: "0988766663",
      },
    ];
    $scope.welcome='hihi';
    $scope.sayHello=function(){
        // alert("Hello");
        $scope.thongbao=$scope.test; //lấy dữ từ input sau đó gán cho biến thông báo
        if($scope.doibong==1){
            $scope.thongbao="Arsenal"; 
        }else if($scope.doibong==2){
            $scope.thongbao="MC"; 
        }else{
            $scope.thongbao="MU không có cửa vô địch";
        }

        if($scope.gioitinh==1){
            $scope.thongbao="Nam"; 
        }else if($scope.gioitinh==2){
            $scope.thongbao="Nữ"; 
        }else{
            $scope.thongbao="Bê đê";
        }
        // alert($scope.doibong); //lấy ra value của select

    }

    $scope.count=0;
    $scope.myMouse=function(){
        $scope.count++;

    }
  });