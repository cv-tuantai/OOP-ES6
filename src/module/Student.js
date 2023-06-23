import Person from "./Person.js";

export default class Student extends Person {
  constructor(
    _id,
    _name,
    _address,
    _email,
    _type,
    _math,
    _physics,
    _chemistry,
  ) {
    super(_id, _name, _address, _email, _type);
    this.math = _math;
    this.physics = _physics;
    this.chemistry = _chemistry;
    this.gpa = 0;
  }

  calcGPA() {
    this.gpa = (
      (Number(this.math) + Number(this.physics) + Number(this.chemistry)) /
      3
    ).toFixed(1);
  }
}
