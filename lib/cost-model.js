const makeDb = require('../config/db');
module.exports = {
  connection: require('../config/db'),
  cost: null,

  async addCost (cost) {
    let queryStr = `INSERT INTO cost (user_id, change_cost, travel_cost, other_id, other_cost) VALUES ('${cost.user_id}', '${cost.change_cost}', '${cost.travel_cost}', '${cost.other_id}', '${cost.other_cost}');`;
    console.log(queryStr);
    let db = makeDb();
    let result;
    try {
      await db.beginTransaction();
      console.log('result')
      result = await db.query(queryStr);
      console.log(result)
      await db.commit();
      console.log('commit already')
    } catch (error) {
      console.log('rollback')
      await db.rollback();
    } finally {
      console.log('close')
      await db.close();
    }
    return result;
  }
}