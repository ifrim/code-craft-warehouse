class Warehouse {
  constructor(titles = []) {
    this.titles = titles;
  }

  getByTitle(title) {
    return this.titles.find(cd => cd.title.title === title).title;
  }

  getStockByTitle(title) {
    return this.titles.find(cd => cd.title.title === title)?.count ?? 0;
  }

  setStockByTitle(title, count) {
    let t = this.titles.find(cd => cd.title.title === title);
    if (!t) return;
    t.count = count;
  }

  getByArtist(artist) {
    return this.titles.find(cd => cd.title.artist === artist) ?? { count: 0 };
  }

  add(titles) {
    this.titles = [...this.titles, ...titles];
  }
}

export default Warehouse;