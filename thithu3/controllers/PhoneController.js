window.PhoneController = function ($scope,$http,$window,$location) {
  $scope.title = "Trang chủ";

  let apiUrl="http://localhost:3000/dienthoai";

  $scope.getData=function(){
    $http.get(apiUrl).then(function(response){
        if(response.status==200){
            $scope.dienthoai=response.data
        }
    })
  }
  $scope.getData();

  $scope.kiemTraDuLieu={
    "ten":false,
    "hang":false,
    "dungLuong":false,
    "gia":false
  }

  $scope.onSubmitForm=function(){
    let flag=false;
    const array=["ten", "hang", "dungLuong", "gia"];
    for (let index = 0; index < array.length; index++) {
        const array2 = array[index];
        if(!$scope.inputValue || !$scope.inputValue[array2]){
            $scope.kiemTraDuLieu[array2]="Vui lòng nhập trường này";
            flag = true;
        }else{
            $scope.kiemTraDuLieu[array2]=false
        }
    }

    if(!flag){
        let newItem={
            ten:$scope.inputValue.ten,
            hang:$scope.inputValue.hang,
            dungLuong:$scope.inputValue.dungLuong,
            gia:$scope.inputValue.gia,
        }

        $http.post(apiUrl,newItem).then(function(response){
            if(response.status==201){
                $scope.getData();
                $window.alert("Thêm sản phẩm thành công");
            }
        })
    }
  }

  $scope.onEdit=function(editId){
    $scope.editId=editId;
    $location.path(`phone/${editId}/edit`);
  }


  $scope.onDelete=function(deleteId){
    let confirm=window.confirm("Are you sure you want to delete");
    if(confirm){
        $http.delete(`${apiUrl}/${deleteId}`).then(function(response){
            if(response.status==200){
                $scope.getData();
            }
        })
    }
    
  }






};
