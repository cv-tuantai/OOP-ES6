import { getEle } from "../controller/controller.js";

export default class Validation {
  // kiểm tra rỗng
  checkEmpty = (value, errorID, mess) => {
    if (value === "") {
      getEle(errorID).innerHTML = mess;
      getEle(errorID).style.display = "block";
      return false;
    }
    getEle(errorID).innerHTML = "";
    getEle(errorID).style.display = "none";
    return true;
  };

  //   kiểm tra loại user
  checkType = (idSelect, errorID, mess) => {
    if (getEle(idSelect).selectedIndex !== 0) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  //   kiểm tra chuỗi
  checkString = (value, errorID, mess) => {
    var re =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    if (value.match(re)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  //   kiểm tra email
  checkEmail = (value, errorID, mess) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(re)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  //   kiểm tra giá trị nhập
  checkValue = (value, errorID, mess, min, max) => {
    if (value >= min && value <= max) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };
}
