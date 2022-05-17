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

export default Warehouse;