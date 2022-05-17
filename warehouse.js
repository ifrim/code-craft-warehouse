import Chart from './chart';

class Warehouse {
  constructor(titles = []) {
    this.titles = titles;
    this.chart = new Chart();
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

  getPriceForTitle(title) {
    let price = this.titles.find(cd => cd.title.title === title).price;
    if (this.chart.isTop100(title)) {
      let competitorPrice = this.chart.getCompetitorPrice(title);
      return Math.min(price, competitorPrice - 1);
    }
    return price;
  }

  add(titles) {
    this.titles = [...this.titles, ...titles];
  }
}

export default Warehouse;