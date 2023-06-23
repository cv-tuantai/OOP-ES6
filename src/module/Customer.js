import Person from "./Person.js";

export default class Customer extends Person {
  constructor(
    _id,
    _name,
    _address,
    _email,
    _type,
    _companyName,
    _billInvoice,
    _review,
  ) {
    super(_id, _name, _address, _email, _type);
    this.companyName = _companyName;
    this.billInvoice = _billInvoice;
    this.review = _review;
  }
}
