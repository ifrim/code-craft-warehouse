import Customer from './customer';
import Title from './title';
import Warehouse from './warehouse';
import RecordLabel from './record-label';
import Chart from './chart';

jest.mock('./chart');

describe('warehouse tests', () => {
  it('add CD', () => {
    let warehouse = new Warehouse();
    let recordLabel = new RecordLabel(warehouse);

    let titleCount = warehouse.getStockByTitle('Thriller');
    let cdsList = [{ title: new Title('Thriller', 'MJ'), count: 2 }];
    recordLabel.send(cdsList);

    expect(warehouse.getStockByTitle('Thriller')).toBe(titleCount + cdsList[0].count);
  });

  it('searching by artist in an empty warehouse should return an empty list', () => {
    let warehouse = new Warehouse();
    expect(warehouse.getByArtist('MJ').count).toBe(0);
  });

  it('searching by artist when there is 1 entry in the warehouse should return a list of one item', () => {
    let warehouse = new Warehouse();
    warehouse.add([{ title: new Title('Thriller', 'MJ'), count: 1 }]);
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
    warehouse.add([{ title: new Title('Thriller', 'MJ'), count: titleCount }]);
    let customer = new Customer(warehouse);
    customer.buy('Thriller', true);
    expect(warehouse.getStockByTitle('Thriller')).toBe(titleCount - 1);
  });

  it('a customer can review a title', () => {
    let warehouse = new Warehouse();
    warehouse.add([{ title: new Title('Thriller', 'MJ'), count: 2 }]);
    let customer = new Customer(warehouse);
    customer.addReview('Thriller', { rating: 10, content: 'The best' });
    expect(warehouse.getByTitle('Thriller').getTotalReviews()).toBe(1);
  });

  it('notify chart of a buy event', () => {
    const notifySaleMock = jest
      .spyOn(Chart.prototype, 'notifySale')
      .mockImplementation(() => console.log('MOCK notifySale'));
    let warehouse = new Warehouse();
    warehouse.add([{ title: new Title('Thriller', 'MJ'), count: 1 }]);
    let customer = new Customer(warehouse);
    customer.buy('Thriller');
    expect(notifySaleMock).toBeCalled();
  });

  it('if not in top 100 the price should be the fixed one', () => {
    jest
      .spyOn(Chart.prototype, 'isTop100')
      .mockImplementation(() => false);
    let price = 10;
    let warehouse = new Warehouse();
    warehouse.add([{ title: new Title('Thriller', 'MJ'), count: 1, price }]);
    expect(warehouse.getPriceForTitle('Thriller')).toBe(price);
  });

  it('if in top 100 the price should be lower than the competitors', () => {
    let competitorPrice = 7;
    jest
      .spyOn(Chart.prototype, 'isTop100')
      .mockImplementation(() => true);
    jest
      .spyOn(Chart.prototype, 'getCompetitorPrice')
      .mockImplementation(() => competitorPrice);
    let price = 10;
    let warehouse = new Warehouse();
    warehouse.add([{ title: new Title('Thriller', 'MJ'), count: 1, price }]);
    expect(warehouse.getPriceForTitle('Thriller')).toBe(competitorPrice - 1);
  });

  it('if in top 100 and competitor price is higher than ours we offer our price', () => {
    let price = 10;
    let competitorPrice = 12;
    jest
      .spyOn(Chart.prototype, 'isTop100')
      .mockImplementation(() => true);
    jest
      .spyOn(Chart.prototype, 'getCompetitorPrice')
      .mockImplementation(() => competitorPrice);
    let warehouse = new Warehouse();
    warehouse.add([{ title: new Title('Thriller', 'MJ'), count: 1, price }]);
    expect(warehouse.getPriceForTitle('Thriller')).toBe(price);
  });
});