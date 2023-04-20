window.TacGiaController=function($scope,$http,$window,$location){
    let apiUrl="http://localhost:3000/tacgia";

    $scope.getData=function(){
        $http.get(apiUrl).then(function(response){
            if(response.status==200){
                $scope.tacgia=response.data
            }
        })
    }
    $scope.getData();

    $scope.kiemTraDuLieu={
        name:false,
        tuoi:false,
        gioiTinh:false,
        diaChi:false
    }
    $scope.onSubmitForm=function(){
        let flag=false;
        const array=["name", "tuoi", "gioiTinh", "diaChi"];
        for (let index = 0; index < array.length; index++) {
            const array2 = array[index];
            if(!$scope.inputValue || !$scope.inputValue[array2]){
                $scope.kiemTraDuLieu[array2]="Vui lòng nhập trường này";
                flag = true;
            }else{
                $scope.kiemTraDuLieu[array2]=false;
            }
            
        }

        if(!flag){
            let newItem={
                name:$scope.inputValue.name,
                tuoi:$scope.inputValue.tuoi,
                gioiTinh:$scope.inputValue.gioiTinh,
                diaChi:$scope.inputValue.diaChi
            }
            $http.post(apiUrl,newItem).then(function(response){
                if(response.status==201){
                    $window.alert("Thêm sản phẩm thành công");
                    $scope.getData();

                }
            })
        }
    }
    $scope.onEdit=function(editId){
        $scope.editId=editId;
        $location.path(`tac-gia/${editId}/edit`);
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
}