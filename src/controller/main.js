import {
  getEle,
  getInfo,
  renderUI,
  clearForm,
  clearErr,
} from "./controller.js";
import ListPerson from "../module/ListPerson.js";

/* Tạo đối tượng listPerson từ lớp đối tượng ListPerson */
const listPerson = new ListPerson();

/* Hàm lưu dữ liệu vào local storage */
const saveData = (data) =>
  localStorage.setItem("listPerson", JSON.stringify(data));

/* Hàm lấy dữ liệu từ local storage */
const getData = () => {
  if (localStorage.getItem("listPerson")) {
    listPerson.arr = JSON.parse(localStorage.getItem("listPerson"));
    renderUI(listPerson.arr);
  }
};
getData();

/* Thay đổi giao diện khi chọn Loại user */
const hideAll = () => {
  getEle("student").style.display = "none";
  getEle("employee").style.display = "none";
  getEle("customer").style.display = "none";
};

getEle("type").addEventListener("change", () => {
  const type = getEle("type").value;

  // Nếu là loại user nào thì giao diện sẽ tương ứng
  if (type === "student") {
    hideAll();
    getEle("student").style.display = "block";
  } else if (type === "employee") {
    hideAll();
    getEle("employee").style.display = "block";
  } else if (type === "customer") {
    hideAll();
    getEle("customer").style.display = "block";
  } else {
    hideAll();
  }
});

/* Sự kiện khi click vào nút "Thêm người dùng" */
getEle("btnThem").addEventListener("click", () => {
  // Đổi tiêu đề
  getEle("header-title").innerHTML = "Thêm người dùng";
  // Hiển nút Thêm
  getEle("btnAdd").style.display = "block";
  // Ẩn nút cập nhật
  getEle("btnUpdate").style.display = "none";
  // Mở khóa nhập ID
  getEle("idUser").disabled = false;
  // Clear thông tin cũ
  clearForm();
  // Hide tùy chọn
  hideAll();
  clearErr();
});

/* Thêm user */
getEle("btnAdd").addEventListener("click", () => {
  // Lấy dữ liệu user
  const user = getInfo();

  if (user) {
    // Thêm user vào listPerson
    const result = listPerson.addPerson(user);
    if (result) {
      // Đóng modal
      getEle("btnClose").click();
      // Render giao diện
      renderUI(listPerson.arr);
      // Lưu dữ liệu
      saveData(listPerson.arr);
    }
  }
});

/* Xóa user */

// Xóa từ click trực tiếp
const delPerson = (id) => {
  // gọi phương thức xóa
  listPerson.delPerson(id);
  // lưu dữ liệu vào storage
  saveData(listPerson.arr);
  // render giao diện
  renderUI(listPerson.arr);
};
window.delPerson = delPerson;

// Xóa từ ID
getEle("btn-del").onclick = () => {
  // lấy id từ form
  const id = Number(getEle("delID").value);
  // gọi hàm
  delPerson(id);
  // reset form
  getEle("delID").value = "";
};

/* Edit user */
const editPerson = (id) => {
  // Đổi tiêu đề
  getEle("header-title").innerHTML = "Cập nhật người dùng";
  // Ẩn nút Thêm
  getEle("btnAdd").style.display = "none";
  // Hiện nút cập nhật
  getEle("btnUpdate").style.display = "block";
  // Clear thông báo lỗi cũ
  clearErr();

  // Lấy thông tin user bằng id
  const user = listPerson.findUser(id);

  // Đưa data lên giao diện
  getEle("idUser").value = user.id;
  getEle("idUser").disabled = true;
  getEle("nameUser").value = user.name;
  getEle("address").value = user.address;
  getEle("email").value = user.email;
  getEle("type").value = user.type;

  if (user.type === "student") {
    hideAll();
    getEle("student").style.display = "block";

    getEle("math").value = user.math;
    getEle("physics").value = user.physics;
    getEle("chemistry").value = user.chemistry;
    return;
  }

  if (user.type === "employee") {
    hideAll();
    getEle("employee").style.display = "block";

    getEle("workingDay").value = user.workingDay;
    getEle("dailySalary").value = user.dailySalary;
    return;
  }

  if (user.type === "customer") {
    hideAll();
    getEle("customer").style.display = "block";

    getEle("companyName").value = user.companyName;
    getEle("billInvoice").value = user.billInvoice;
    getEle("review").value = user.review;
    return;
  }
};
window.editPerson = editPerson;

/* Cập nhật user */
getEle("btnUpdate").addEventListener("click", () => {
  const user = getInfo();
  if (user) {
    const result = listPerson.updatePerson(user);
    if (result) {
      // render giao diện
      renderUI(listPerson.arr);
      // lưu dữ liệu vào local storage
      saveData(listPerson.arr);
      // Đóng modal
      getEle("btnClose").click();
    }
  }
});

/* Lọc danh sách theo loại user */
getEle("Loai").addEventListener("change", () => {
  // lấy loại user từ giao diện
  const type = getEle("Loai").value;
  // lọc mảng filter
  const filterArr = listPerson.filterUser(type);
  // render UI
  if (type !== "all") {
    renderUI(filterArr);
  } else {
    renderUI(listPerson.arr);
  }
});

/* Sort tên từ A -> Z */
getEle("SapXepGiam").addEventListener("click", () => {
  renderUI(listPerson.sortName());
});

/* Sort tên từ Z -> A */
getEle("SapXepTang").addEventListener("click", () => {
  renderUI(listPerson.sortNameReverse());
});
