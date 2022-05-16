class Title {
  constructor(title, artist, count) {
    this.title = title;
    this.artist = artist;
    this.count = count;
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
}

class RecordLabel {
  constructor(warehouse) {
    this.warehouse = warehouse;
  }

  send(cds) {
    this.warehouse.add(cds);
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
});