window.EditTacGiaController=function($scope,$http,$routeParams){
    let apiUrl="http://localhost:3000/tacgia";
    let id=$routeParams.id;

    $http.get(`${apiUrl}/${id}`).then(function(response){
        if(response.status==200){
            $scope.inputValue={
                name: response.data.name,
                tuoi: response.data.tuoi,
                gioiTinh: response.data.gioiTinh,
                diaChi: response.data.diaChi,
            }
        }
    })

    $scope.onSubmitForm=function(){
        if(id){
            let newUpdate={
                name:$scope.inputValue.name,
                tuoi:$scope.inputValue.tuoi,
                gioiTinh:$scope.inputValue.gioiTinh,
                diaChi:$scope.inputValue.diaChi,
            }

            $http.put(`${apiUrl}/${id}`,newUpdate).then(function(response){
                if(response.status=200){
                    $scope.getData();
                }
            })
        }
    }
}