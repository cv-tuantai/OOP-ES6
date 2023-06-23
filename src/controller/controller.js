import Student from "../module/Student.js";
import Employee from "../module/Employee.js";
import Customer from "../module/Customer.js";
import Validation from "../module/Validation.js";

const validate = new Validation();

/* Hàm DOM ID */
const getEle = (id) => document.getElementById(id);

/* Hàm lưu dữ liệu vào local storage */
const saveData = (data) =>
  localStorage.setItem("listPerson", JSON.stringify(data));

/* Hàm lấy dữ liệu từ local storage */
const getData = () => JSON.parse(localStorage.getItem("listPerson"));

/* Hàm Render UI */
const renderUI = (data) => {
  let content = "";
  data.forEach((user) => {
    content += `
      <tr>
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.address}</td>
        <td>${user.email}</td>
        <td>${
          user.type === "student"
            ? "Học sinh"
            : user.type === "employee"
            ? "Giảng viên"
            : "Khách hàng"
        }</td>
        <td>${
          user.type === "student"
            ? `Điểm trung bình: ${user.gpa}`
            : user.type === "employee"
            ? `Tổng lương: ${user.totalSalary}`
            : `Đánh giá: ${user.review}`
        }</td>
        <td>
          <button class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick="editPerson(${
            user.id
          })"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-danger" onclick="delPerson(${
            user.id
          })"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;
  });
  getEle("tableDanhSach").innerHTML = content;
};

/* Hàm validate Person */
const validatePerson = (id, name, add, email, typeID) => {
  let isValid = true;
  isValid &=
    validate.checkEmpty(id, "tbTKNV", "ID không được bỏ trống") &&
    validate.checkValue(id, "tbTKNV", "ID là số từ 1 đến 9999", 1, 9999);
  isValid &=
    validate.checkEmpty(name, "tbNameUser", "Họ tên không được bỏ trống") &&
    validate.checkString(name, "tbNameUser", "Họ tên phải là chữ");
  isValid &= validate.checkEmpty(
    add,
    "tbAddress",
    "Địa chỉ không được bỏ trống",
  );
  isValid &= validate.checkEmail(
    email,
    "tbEmail",
    "Vui lòng nhập đúng định dạng email",
  );
  isValid &= validate.checkType(typeID, "tbType", "Hãy chọn loại người dùng");
  return isValid;
};

/* Hàm validate Student */
const validateStudent = (math, physics, chemistry) => {
  let isValid = true;
  isValid &=
    validate.checkEmpty(math, "tbMath", "Điểm không được bỏ trống") &&
    validate.checkValue(math, "tbMath", "Điểm số từ 0 đến 10", 0, 10);
  isValid &=
    validate.checkEmpty(physics, "tbPhysics", "Điểm không được bỏ trống") &&
    validate.checkValue(physics, "tbPhysics", "Điểm số từ 0 đến 10", 0, 10);
  isValid &=
    validate.checkEmpty(chemistry, "tbChemistry", "Điểm không được bỏ trống") &&
    validate.checkValue(chemistry, "tbChemistry", "Điểm số từ 0 đến 10", 0, 10);
  return isValid;
};

/* Hàm validate Employee */
const validateEmployee = (dailySalary, workingDay) => {
  let isValid = true;
  isValid &= validate.checkEmpty(
    dailySalary,
    "tbDailySal",
    "Lương không được bỏ trống",
  );
  isValid &=
    validate.checkEmpty(
      workingDay,
      "tbWorkingDay",
      "Ngày làm không được bỏ trống",
    ) &&
    validate.checkValue(
      workingDay,
      "tbWorkingDay",
      "ngày làm từ 0 đến 31 ngày",
      0,
      31,
    );
  return isValid;
};

/* Hàm validate Customer */
const validateCustomer = (companyName, billInvoice, review) => {
  let isValid = true;
  isValid &= validate.checkEmpty(
    companyName,
    "tbCompanyName",
    "Tên công ty không được bỏ trống",
  );
  isValid &= validate.checkEmpty(
    billInvoice,
    "tbBillInvoice",
    "Trị giá hóa đơn không được bỏ trống",
  );
  isValid &= validate.checkEmpty(
    review,
    "tbReview",
    "Review không được bỏ trống",
  );
  return isValid;
};

/* Lấy thông tin từ user */
const getInfo = () => {
  const idUser = getEle("idUser").value;
  const nameUser = getEle("nameUser").value;
  const address = getEle("address").value;
  const email = getEle("email").value;
  const type = getEle("type").value;

  if (validatePerson(idUser, nameUser, address, email, "type")) {
    if (type === "student") {
      const math = getEle("math").value;
      const physics = getEle("physics").value;
      const chemistry = getEle("chemistry").value;

      console.log(validateStudent(math, physics, chemistry));
      if (validateStudent(math, physics, chemistry)) {
        const student = new Student(
          idUser,
          nameUser,
          address,
          email,
          type,
          math,
          physics,
          chemistry,
        );

        student.calcGPA();
        return student;
      }
    }

    if (type === "employee") {
      const dailySalary = getEle("dailySalary").value;
      const workingDay = getEle("workingDay").value;

      if (validateEmployee(dailySalary, workingDay)) {
        const employee = new Employee(
          idUser,
          nameUser,
          address,
          email,
          type,
          workingDay,
          dailySalary,
        );

        employee.calcSalary();
        return employee;
      }
    }

    if (type === "customer") {
      const companyName = getEle("companyName").value;
      const billInvoice = getEle("billInvoice").value;
      const review = getEle("review").value;

      if (validateCustomer(companyName, billInvoice, review)) {
        const customer = new Customer(
          idUser,
          nameUser,
          address,
          email,
          type,
          companyName,
          billInvoice,
          review,
        );

        return customer;
      }
    }
  } else return;
};

/* Hàm clear thông tin form */
const clearForm = () => {};

/* Hàm clear thông báo lỗi */
const clearErr = () => {};

export { getEle, saveData, getData, getInfo, renderUI };
