module.exports = {
  connection: require('../config/db'),
  employee: null,

  getEmpByMonth() {
    let _this = this;
    let date = new Date();
    let currentMonth = date.yyyymm();
    let queryStr = `SELECT em.code,em.name,em.email, co.change_cost, co.travel_cost, ot.value as otherName, co.other_cost, em.attach_file,em.date
    FROM employees AS em
    LEFT JOIN cost AS co ON co.user_id = em.id
    LEFT JOIN other AS ot ON ot.id = co.other_id
    WHERE DATE_FORMAT(date, "%Y-%m") = "${currentMonth}"`;
    this.connection.query(queryStr, function (error, results) {
      if (error) throw error;
      _this.employee = results;
    });
  },

  deleteEmployee (employCode) {
    let _this = this;
    let queryStr = `DELETE FROM employees WHERE code = "${employCode}"  ;`;
    this.connection.query(queryStr, function (error, results) {
      if (error) throw error;
      _this.getEmpByMonth;
    });
  }
}