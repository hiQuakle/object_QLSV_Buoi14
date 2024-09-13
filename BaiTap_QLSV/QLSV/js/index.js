// Tổng hợp các chức năng sẽ thực hiện trong bài tập QLSV
// CRUD - (Create - Read - Update - Delete)
/**
 * Thêm Sinh Viên (Done)
 * Xoá Sinh Viên (Done)
 * Cập nhật sinh viên
 * clear dữ liệu đang có trong form
 * render dữ liệu lên giao diện (Done)
 * lưu trữ và sử dụng dữ liệu ở local storage (Done)
 * Validation dữ liệu*
 * Tìm kiếm sinh viên*
 * Thông báo cho người dùng*
 */
let arrSinhVien = [];

// ------------- 1. Thêm sinh viên ----------------
document.getElementById("formQLSV").onsubmit = function (event) {
  // Prevent Default dùng để ngăn chặn sự kiện reload
  event.preventDefault();
  console.log("Hello");
  // Thực hiện xử lý và truy cập tất cả dữ liệu từ các input đang có trên giao diện
  //   const txtMaSV = document.getElementById("txtMaSV").value;
  //   const txtTenSV = document.getElementById("txtTenSV").value;
  //   const txtEmail = document.getElementById("txtEmail").value;
  //   const txtPass = document.getElementById("txtPass").value;
  //   const txtNgaySinh = document.getElementById("txtNgaySinh").value;
  //   const khSV = document.getElementById("khSV").value;
  //   const txtDiemToan = document.getElementById("txtDiemToan").value;
  //   const txtDiemLy = document.getElementById("txtDiemLy").value;
  //   const txtDiemHoa = document.getElementById("txtDiemHoa").value;
  //                         \|
  // let arrField = document.querySelectorAll("#formQLSV input,select");
  // console.log(arrField);
  // let sinhVien = new SinhVien();
  // console.log(sinhVien);

  // for (let field of arrField) {
  //   console.log(field);
  //   // let value = field.value; // Destructuring
  //   let { value, id } = field; // field = mã sinh viên ===> txtMaSV
  //   sinhVien[id] = value;
  // }
  let sinhVien = getValueForm(); // sinhVien || null
  //cách 1:
  // if (sinhVien) {
  //   arrSinhVien.push(sinhVien);
  //   console.log(arrSinhVien);
  //   setLocalStorage("arrSinhVien", arrSinhVien);
  //   renderDataSinhVien();
  //   // Trỏ tới thẻ form
  //   event.target.reset();
  // }
  //cách 2:
  if (!sinhVien) {
    return;
  }
  arrSinhVien.push(sinhVien);
  console.log(arrSinhVien);
  setLocalStorage("arrSinhVien", arrSinhVien);
  renderDataSinhVien();
  // Trỏ tới thẻ form
  event.target.reset();
};

//------------ Hiển thị thông tin sinh viên lên table ---------------------
function renderDataSinhVien(arr = arrSinhVien) {
  let content = "";
  for (let sinhVien of arr) {
    // dữ liệu lấy từ local ==> dữ liệu nhưng ko có phương thức\
    // Tạo ra một đối tượng mới , có phương thức nhưng ko có dữ liệu
    let newSinhVien = new SinhVien();
    Object.assign(newSinhVien, sinhVien);
    let { txtMaSV, txtTenSV, txtEmail, txtPass, txtNgaySinh, khSV } =
      newSinhVien;

    content += `
    <tr>
     <td>${txtMaSV}</td>
     <td>${txtTenSV}</td>
     <td>${txtEmail}</td>
     <td>${txtPass}</td>
     <td>${txtNgaySinh}</td>
     <td>${khSV}</td>
     <td>${newSinhVien.tinhDiemTrungBinh().toFixed(3)}</td>
     <td> 
     <button onclick = "xoaSinhVien('${txtMaSV}')" class = "btn btn-danger">Xoá</button>
     <button onclick = "getInfoSinhVien('${txtMaSV}')" class = "btn btn-warning">Sửa</button>
     </td>
    </tr>
    `;
  }
  document.getElementById("tbodySinhVien").innerHTML = content;
}

window.onload = function () {
  let dataLocal = getLocalStorage("arrSinhVien"); // data : null
  if (dataLocal) {
    arrSinhVien = dataLocal;
    renderDataSinhVien;
  }
};

//-------------- Local storage -----------------------
// # Phương thức chính: setItem, getItem, removeItem
// localStorage.setItem("hoTen", "Quang Khai");
// let arrMonAn = [
//   {
//     tenMon: "Màn thầu",
//   },
//   {
//     tenMon: "Xí Quách",
//   },
// ];
// let dataString = JSON.stringify(arrMonAn);
// // console.log(dataString);
// localStorage.setItem("arr", dataString);

// let dataLocal = JSON.parse(localStorage.getItem("arr"));
// console.log(dataLocal);

// let parseValue = dataLocal ? JSON.parse(dataLocal) : null;

// localStorage.removeItem("hoTen");

// Tạo ra một function sẽ giúp đưa bất kì dữ liệu nào xuống local storage lưu trữ
function setLocalStorage(key, value) {
  let dataString = JSON.stringify(value);
  localStorage.setItem(key, dataString);
}
function getLocalStorage(key) {
  let dataLocal = localStorage.getItem(key);
  return dataLocal ? JSON.parse(dataLocal) : null;
}
//-------------- Xoá Sinh Viên -----------------------
function xoaSinhVien(maSV) {
  // Khi xoá 1 phần tử sử dụng phương thức splice (vị trí bắt đầu, số lượng phần tử cần xoá)
  console.log(maSV);
  // Xử lý tìm kiếm vị trí sinh viên trong mảng
  let index = arrSinhVien.findIndex((item, i) => item.txtMaSV == maSV); // Nếu không thoả thì ra -1
  if (index != -1) {
    arrSinhVien.splice(index, 1);
    renderDataSinhVien();
    setLocalStorage("arrSinhVien", arrSinhVien);
  }
  // Thao tác xoá sinh viên và cập nhật dữ liệu
}
//-------------- Get Info sinhVien -----------------------
// B1: Gắn function getInfoSinhVien vào button sửa và lấy maSV
// B2: Thực hiện tìm kiếm sinh viên trong mảng
// B3: Thực hiện đưa dữ liệu sinh viên lên input trong form cho người dùng chỉnh sửa
// B4: Ngăn chặn người dùng chỉnh sửa mã SV (disabled, readonly)
function getInfoSinhVien(maSV) {
  console.log(maSV);
  let sinhVien = arrSinhVien.find((item, index) => item.txtMaSV == maSV); // sinhVien || undefined
  if (sinhVien) {
    let arrField = document.querySelectorAll("form input, form select");
    for (let field of arrField) {
      // Field đại diện cho các input và select tìm kiếm được trong form
      field.value = sinhVien[field.id];
      if (field.id == "txtMaSV") {
        field.readOnly = true;
      }
    }
  }
}
//-------------- cập nhật sinhVien -----------------------
// B1: DOM tới nút button cập nhật và tạo 1 sự kiện click
// B2: Xử lý lấy dữ liệu người dùng đã cập nhật trên form (nhớ xem đã từng lấy dữ liệu ở đâu chưa ?)
// B3: Tìm kiếm tới vị trí của phần tử đang được cập nhật
// B4: Thay thế dữ liệu mới vào vị trí của phần tử được cập nhật
// B5: Thực hiện chạy lại hàm render và cập nhật xuống localStorage
// B6: Clear toàn bộ dữ liệu của form và tắt readOnly của input mã SV

document.querySelector(".btn-info").onclick = function () {
  console.log("cập nhật");
  let sinhVien = getValueForm();
  if (sinhVien) {
    let index = arrSinhVien.findIndex(
      (item, i) => item.txtMaSV == sinhVien.txtMaSV
    );
    if (index != -1) {
      arrSinhVien[index] = sinhVien;
      renderDataSinhVien();
      setLocalStorage("arrSinhVien", arrSinhVien);
      document.getElementById("txtMaSV").readOnly = false;
      document.getElementById("formQLSV").reset();
    }
  }
};

// ------------- Get value form ------------------
function getValueForm() {
  let arrField = document.querySelectorAll("#formQLSV input,select");
  console.log(arrField);
  let sinhVien = new SinhVien();
  console.log(sinhVien);

  // Tạo một biến cờ để check trường hợp khi nào trả về đối tượng sinh viên
  let flag = true;
  for (let field of arrField) {
    console.log(field);
    // let value = field.value; // Destructuring
    let { value, id } = field; // field = mã sinh viên ===> txtMaSV
    sinhVien[id] = value;

    // Truy cập tới thẻ cha gần nhất của input
    let theThongBao = field.parentElement.querySelector("span");

    checkEmptyValue(theThongBao, value);
    if (!checkEmptyValue(theThongBao, value)) {
      flag = false;
    } else {
      // dữ liệu không bị rỗng
      // if (id == "txtPass" && !checkMinMaxValue(theThongBao, value, 6, 10)) {
      //   flag = false;
      // }

      // Truy xuất các thuộc tính data-validation
      let dataValue = field.getAttribute("data-validation"); // nếu không có thuộc tính data-validation thì là undejined | email | minMax
      let dataMin = field.getAttribute("data-min");
      let dataMax = field.getAttribute("data-max");
      if (dataValue == "email" && !checkEmailValue(theThongBao, value)) {
        flag = false;
      } else if (
        dataValue == "minMax" &&
        !checkMinMaxValue(theThongBao, value, dataMin, dataMax)
      ) {
        flag = false;
      } else if (
        (dataValue == "pass" && !checkPasswordValue(theThongBao, value)) ||
        !checkMinMaxValue(theThongBao, value, dataMin, dataMax)
      ) {
        flag = false;
      }
    }
  }
  return flag ? sinhVien : null;
}

// --------------- Tìm kiếm sinh viên-------------
document.getElementById("txtSearch").oninput = function (event) {
  let keyWord = event.target.value.trim().toLowerCase(); // "noi com" || "Nồi cơm"
  let newKeyWord = removeVietnameseTones(keyWord);
  console.log(newKeyWord);
  let arrSearch = arrSinhVien.filter((item, index) => {
    // item.txtTenSV newKeyWord
    let newTenSV = removeVietnameseTones(item.txtTenSV.trim().toLowerCase());

    return newTenSV.includes(newKeyWord);
    renderDataSinhVien(arrSearch);
  });
};
