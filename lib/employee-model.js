const makeDb = require('../config/db');
module.exports = {
  
  employee: null,

  async getEmpByMonth(month) {
    let db = makeDb();
    try {
      let queryStr = `SELECT em.code,em.name,em.email, co.change_cost, co.travel_cost, ot.value as otherName, co.other_cost, em.attach_file,em.date
      FROM employees AS em
      LEFT JOIN cost AS co ON co.user_id = em.id
      LEFT JOIN other AS ot ON ot.id = co.other_id
      WHERE DATE_FORMAT(date, "%Y-%m") = "${month}"`;
      await db.beginTransaction();
      this.employee = await db.query(queryStr);
      await db.commit();
    } catch (error) {
      await db.rollback();
    } finally {
      await db.close();
    }
  },
  async getEmpByCurrentMonth() {
    let date = new Date();
    let currentMonth = date.yyyymm();
    let queryStr = `SELECT em.code,em.name,em.email, co.change_cost, co.travel_cost, ot.value as otherName, co.other_cost, em.attach_file,em.date
    FROM employees AS em
    LEFT JOIN cost AS co ON co.user_id = em.id
    LEFT JOIN other AS ot ON ot.id = co.other_id
    WHERE DATE_FORMAT(date, "%Y-%m") = "${currentMonth}"`;

    let db = makeDb();
    try {
      await db.beginTransaction();
      this.employee = await db.query(queryStr);
      await db.commit();
    } catch (error) {
      await db.rollback();
    } finally {
      await db.close();
    }
  },

  async deleteEmployee (employCode) {
    let queryStr = `DELETE FROM employees WHERE code = "${employCode}"  ;`;
    let db = makeDb();
    try {
      await db.beginTransaction();
      await db.query(queryStr);
      await this.getEmpByCurrentMonth();
      await db.commit();
    } catch (error) {
      await db.rollback();
    } finally {
      await db.close();
    }
  },

  async addEmployee (employee) {
    let queryStr = `INSERT INTO employees (code, name, name_jp, email, date) VALUES ('${employee.code}', '${employee.name}', '${employee.nameJapan}', '${employee.email}', '${employee.date}');`;
    let db = makeDb();
    let result;
    try {
      await db.beginTransaction();
      result = await db.query(queryStr);
      await this.getEmpByCurrentMonth();
      await db.commit();
    } catch (error) {
      await db.rollback();
    } finally {
      await db.close();
    }
    return result;
  }
}