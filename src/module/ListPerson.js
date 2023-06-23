export default class ListPerson {
  constructor() {
    this.arr = [];
  }

  /* Thêm user */
  addPerson = (person) => {
    const index = this.arr.findIndex((user) => user.id === person.id);
    if (index !== -1) {
      alert("ID đã tồn tại");
      return false;
    }
    this.arr.push(person);
    return true;
  };

  /* Xóa user */
  delPerson = (id) => {
    const index = this.arr.findIndex((user) => Number(user.id) === id);
    if (index !== -1) {
      if (confirm("Bạn chắc chắn muốn xóa?")) {
        this.arr.splice(index, 1);
        return;
      } else return;
    }
    alert("ID không tồn tại");
  };

  /* Lấy thông tin user bằng id */
  findUser = (id) => this.arr.find((person) => Number(person.id) === id);

  /* Cập nhật user */
  updatePerson = (user) => {
    const index = this.arr.findIndex(
      (person) => Number(person.id) === Number(user.id),
    );
    if (index !== -1) {
      if (confirm("Bạn có chắc chắn cập nhật?")) {
        this.arr[index] = user;
        return true;
      } else return false;
    }
    alert("ID không tồn tại");
  };

  /* Lọc user theo loại */
  filterUser = (type) =>
    this.arr.filter((user) => {
      console.log(type);
      return user.type === type;
    });
}
