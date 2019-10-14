module.exports = {
  connection: require('../config/db'),
  otherItems: null,

  getOther() {
    let _this = this;
    let queryStr = `SELECT * FROM other`;
    this.connection.query(queryStr, function (error, results) {
      if (error) throw error;
      _this.otherItems = results;
    });
  },

  deleteOtherItem (id) {
    let _this = this;
    let queryStr = `DELETE FROM other WHERE id = "${id}"  ;`;
    this.connection.query(queryStr, function (error, results) {
      if (error) throw error;
      _this.getOther;
    });
  }
}