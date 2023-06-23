import Person from "./Person.js";

export default class Employee extends Person {
  constructor(_id, _name, _address, _email, _type, _workingDay, _dailySalary) {
    super(_id, _name, _address, _email, _type);
    this.workingDay = _workingDay;
    this.dailySalary = _dailySalary;
    this.totalSalary = 0;
  }

  calcSalary() {
    this.totalSalary = (this.workingDay * this.dailySalary).toLocaleString();
  }
}
