const makeDb = require('../config/db');
module.exports = {
  otherItems: null,

  async getOther() {
    let queryStr = `SELECT * FROM other`;
    let db = makeDb();
    try {
      await db.beginTransaction();
      this.otherItems = await db.query(queryStr);
    } catch (error) {
      await db.rollback();
    } finally {
      await db.close();
    }
  },

  async deleteOtherItem (id) {
    let _this = this;
    let queryStr = `DELETE FROM other WHERE id = "${id}"  ;`;
    let db = makeDb();
    try {
      await db.beginTransaction();
      await db.query(queryStr);
      await this.getOther();
    } catch (error) {
      await db.rollback();
    } finally {
      await db.close();
    }
  }
}