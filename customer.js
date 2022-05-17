class Customer {
  constructor(warehouse) {
    this.warehouse = warehouse;
  }

  buy(title, paymentValid) {
    let titleObj = this.warehouse.getByTitle(title);
    if (titleObj.count === 0 || !paymentValid) return false;
    this.warehouse.updateStock(title, titleObj.count - 1);
    return true;
  }

  addReview(title, review) {
    this.warehouse.getByTitle(title).title.addReview(review);
  }
}

export default Customer;