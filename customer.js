class Customer {
  constructor(warehouse) {
    this.warehouse = warehouse;
  }

  buy(title, paymentValid) {
    let titleStock = this.warehouse.getStockByTitle(title);
    if (titleStock === 0 || !paymentValid) return false;
    this.warehouse.setStockByTitle(title, titleStock - 1);
    return true;
  }

  addReview(title, review) {
    this.warehouse.getByTitle(title).addReview(review);
  }
}

export default Customer;