class RecordLabel {
  constructor(warehouse) {
    this.warehouse = warehouse;
  }

  send(cds) {
    this.warehouse.add(cds);
  }
}

export default RecordLabel;