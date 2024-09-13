// KIểm tra dữ liệu rỗng, kiểm tra định dạng Email, kiểm tra giới hạn ký tự, kiểm tra xem giá trị nhập vào có trong khoảng hay không, kiểm tra nhập vào chữ không cho phép số
function checkEmptyValue(theThongBao, value) {
  if (value == "") {
    // thông báo lỗi dành cho người dùng
    theThongBao.innerHTML = "Vui lòng không bỏ trống";
    return false;
  } else {
    // Xoá thông báo khi không còn lỗi
    theThongBao.innerHTML = "";
    return true;
  }
}

// value = "abcdef" ==> yêu cầu người dùng dữ liệu nhập vào từ 4 đến 10 ký tự
// 6 đến 10
function checkMinMaxValue(theThongBao, value, min, max) {
  let doDai = value.length;

  if (doDai < min || doDai > max) {
    theThongBao.innerHTML = `Vui lòng nhập trong khoảng từ ${min} đến ${max}`;
    return false;
  } else {
    // không bị lỗi tối thiểu và tối đa ký tự
    theThongBao.innerHTML = "";
    return true;
  }
}

function checkEmailValue(theThongBao, value) {
  let regexEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let checkEmail = regexEmail.test(value); // true || false
  if (checkEmail) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = "Vui lòng nhập đúng định dạng Email";
    return false;
  }
}

// 1 ký tự viết hoa, 1 ký tự đặc biệt
function checkPasswordValue() {
  let regexPassword = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
  let checkPassword = regexPassword.test(value);
  if (checkPasswordValue) {
    theThongBao.innerHTML = "";
    return true;
  } else {
    theThongBao.innerHTML = `Vui lòng nhập mật khẩu có ít nhất 1 ký tự viết hoa và ký tự đặc biệt`;
    return false;
  }
}
