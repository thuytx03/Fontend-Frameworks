window.TrangChuController = function ($scope) {
  $scope.title = "Đây là trang chủ";
  $scope.danhsach = [
    
  ];
  $scope.kiemTraDuLieu = {
    ten: false, //chưa có lỗi mặc định là false
    ngaysinh: false,
    gioitinh: false,
    dantoc: false,
    cmnd: false,
    ngaycap: false,
    noicap: false,
    tinh_hktt: false,
    huyen_hktt: false,
    xa_hktt: false,
    sonha: false,
    sdt_sv: false,
    email_sv: false,
    ten_ph: false,
    sdt_ph: false,

    cosonhaphoc: false,
    nv1: false,
    nganh1: false,
    nv2: false,
    nganh2: false,
    namtn: false,
    truongtn: false,
    tinhtn: false,
    huyentn: false,
    xatn: false,
  };
  $scope.onClose = function () {
    $scope.inputValue = {
      ten: "", 
      ngaysinh: "",
      gioitinh: "",
      dantoc: "",
      cmnd: "",
      ngaycap: "",
      noicap: "",
      tinh_hktt: "",
      huyen_hktt: "",
      xa_hktt: "",
      sonha: "",
      sdt_sv: "",
      email_sv: "",
      ten_ph: "",
      sdt_ph: "",

      cosonhaphoc: "",
      nv1: "",
      nganh1: "",
      nv2: "",
      nganh2: "",
      namtn: "",
      truongtn: "",
      tinhtn: "",
      huyentn: "",
      xatn: "",
    };
  };
  $scope.onSubmitForm = function () {
    let flag = false;
    const requiredFields = [
      "ten",
      "ngaysinh",
      "gioitinh",
      "dantoc",
      "cmnd",
      "ngaycap",
      "noicap",
      "tinh_hktt",
      "huyen_hktt",
      "xa_hktt",
      "sonha",
      "sdt_sv",
      "email_sv",
      "ten_ph",
      "sdt_ph",
      "cosonhaphoc",
      "nv1",
      "nganh1",
      "nv2",
      "nganh2",
      "namtn",
      "truongtn",
      "tinhtn",
      "huyentn",
      "xatn",
    ];

    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!$scope.inputValue || !$scope.inputValue[field]) {
        $scope.kiemTraDuLieu[field] = true; //có lỗi là true
        flag = true;
      }else{
        $scope.kiemTraDuLieu[field] = false; 
        flag = false;
      }
      
    }
    if (!flag) {
        let ds = $scope.danhsach;
        //fake id tự tăng
        let newId = ds.length > 0 ? ds[ds.length - 1].id + 1 : 1;
        let newItem = {
          id: newId,
          ten: $scope.inputValue.ten,
          ngaysinh: $scope.inputValue.ngaysinh, 
          gioitinh: $scope.inputValue.gioitinh==1?"Nam":"Nữ",
          dantoc: $scope.inputValue.dantoc,
          cmnd: $scope.inputValue.cmnd,
          ngaycap: $scope.inputValue.ngaycap,
          noicap: $scope.inputValue.noicap,
          tinh_hktt: $scope.inputValue.tinh_hktt ==1?"Hà Nội":"Phú Thọ",
          huyen_hktt: $scope.inputValue.huyen_hktt ==1?"Hoài Đức":"Đan Phượng",
          xa_hktt: $scope.inputValue.xa_hktt==1?"Đức Thượng":"Đức Giang",
          sonha: $scope.inputValue.sonha,
          sdt_sv: $scope.inputValue.sdt_sv,
          email_sv: $scope.inputValue.email_sv,
          ten_ph: $scope.inputValue.ten_ph,
          sdt_ph: $scope.inputValue.sdt_ph,

          cosonhaphoc: $scope.inputValue.cosonhaphoc ==1?"Hà Nội":"Hồ Chí Minh",
          nv1: $scope.inputValue.nv1 ==1?"CNTT":"TKDH",
          nganh1: $scope.inputValue.nganh1 ==1?"Thiết kế website":"Lập trình mobile",
          nv2: $scope.inputValue.nv2==1?"CNTT":"TKDH",
          nganh2: $scope.inputValue.nganh2 ==1?"Thiết kế website":"Lập trình mobile",
          namtn: $scope.inputValue.namtn ==2023?"2023":"2022",
          truongtn: $scope.inputValue.truongtn,
          tinhtn: $scope.inputValue.tinhtn ==1?"Hà Nội":"Phú Thọ",
          huyentn: $scope.inputValue.huyentn==1?"Hoài Đức":"Đan Phượng",
          xatn: $scope.inputValue.xatn==1?"Đức Thượng":"Đức Giang",

        };
        $scope.danhsach.push(newItem);
        $scope.onClose();
      }
  };
};
