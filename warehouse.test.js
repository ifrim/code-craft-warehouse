import Customer from './customer';
import Title from './title';
import Warehouse from './warehouse';
import RecordLabel from './record-label';

describe('warehouse tests', () => {
  it('add CD', () => {
    let warehouse = new Warehouse();
    let recordLabel = new RecordLabel(warehouse);

    let titleCount = warehouse.getByTitle('Thriller').count;
    let cdsList = [{ title: new Title('Thriller', 'MJ'), count: 2 }];
    recordLabel.send(cdsList);

    expect(warehouse.getByTitle('Thriller').count).toBe(titleCount + cdsList[0].count);
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
    expect(warehouse.getByTitle('Thriller').count).toBe(titleCount - 1);
  });

  it('a customer can review a title', () => {
    let warehouse = new Warehouse();
    warehouse.add([{ title: new Title('Thriller', 'MJ'), count: 2 }]);
    let customer = new Customer(warehouse);
    customer.addReview('Thriller', { rating: 10, content: 'The best' });
    expect(warehouse.getByTitle('Thriller').title.reviews.length).toBe(1);
  });
});