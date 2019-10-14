module.exports = {
  connection: require('../config/db'),
  cost: null,

  addCost (cost) {
    let _this = this;
    let queryStr = `INSERT INTO cost (user_id, change_cost, travel_code, other_id, other_cost) VALUES ('${cost.user_id}', '${cost.change_cost}', '${cost.travel_cost}', '${cost.other_id}', '${cost.other_cost}');`;
    this.connection.query(queryStr, function (error, results) {
    if (error) throw error;
      _this.cost = results;
    });
  }
}