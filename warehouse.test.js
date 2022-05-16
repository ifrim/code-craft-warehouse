class Title {
  constructor(title, artist, count) {
    this.title = title;
    this.artist = artist;
    this.count = count;
    this.reviews = [];
  }
}

class Warehouse {
  constructor(titles = []) {
    this.titles = titles;
  }

  getByTitle(title) {
    return this.titles.find(cd => cd.title === title) ?? { count: 0 };
  }

  getByArtist(artist) {
    return this.titles.find(cd => cd.artist === artist) ?? { count: 0 };
  }

  add(titles) {
    this.titles = [...this.titles, ...titles];
  }

  updateStock(title, count) {
    this.getByTitle(title).count = count;
  }
}

class RecordLabel {
  constructor(warehouse) {
    this.warehouse = warehouse;
  }

  send(cds) {
    this.warehouse.add(cds);
  }
}

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
    this.warehouse.getByTitle(title).reviews.push(review);
  }
}

describe('warehouse tests', () => {
  it('add CD', () => {
    let warehouse = new Warehouse();
    let recordLabel = new RecordLabel(warehouse);

    let titleCount = warehouse.getByTitle('Thriller').count;
    let cdsList = [new Title('Thriller', 'MJ', 2)];
    recordLabel.send(cdsList);

    expect(warehouse.getByTitle('Thriller').count).toBe(titleCount + cdsList[0].count);
  });

  it('searching by artist in an empty warehouse should return an empty list', () => {
    let warehouse = new Warehouse();
    expect(warehouse.getByArtist('MJ').count).toBe(0);
  });

  it('searching by artist when there is 1 entry in the warehouse should return a list of one item', () => {
    let warehouse = new Warehouse();
    warehouse.add([new Title('Thriller', 'MJ', 1)]);
    expect(warehouse.getByArtist('MJ').count).toBe(1);
  });

  it('when you try to buy a title that is not in the warehouse the process fails', () => {
    let warehouse = new Warehouse();
    let customer = new Customer(warehouse);
    expect(customer.buy('Thriller', true)).toBe(false);
  });

  it('after a successfull buy the warehouse stock decreases by 1', () => {
    let warehouse = new Warehouse();
    let titleCount = 2
    warehouse.add([new Title('Thriller', 'MJ', titleCount)]);
    let customer = new Customer(warehouse);
    customer.buy('Thriller', true);
    expect(warehouse.getByTitle('Thriller').count).toBe(titleCount - 1);
  });

  it('a customer can review a title', () => {
    let warehouse = new Warehouse();
    warehouse.add([new Title('Thriller', 'MJ', 2)]);
    let customer = new Customer(warehouse);
    customer.addReview('Thriller', { rating: 10, content: 'The best' });
    expect(warehouse.getByTitle('Thriller').reviews.length).toBe(1);
  });
});