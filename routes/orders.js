const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT items.id, items.name, order_items.quantity,orders.order_total,order_items.order_items_total
      FROM order_items
      JOIN orders ON orders.id = order_items.order_id
      JOIN items ON items.id = order_items.item_id
      WHERE orders.id = 1;`)
    .then(data => {
      if (data.rows.length === 0) {
        return res.render('empty');
      }
      let b = [];
      const items = data.rows;

      for (let item of items) {
        b.push({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          orderTotal: item.order_total,
          orderItemTotal: item.order_items_total
        });
      }

      const templateVars = {
        summary : b,
        total : b[0].orderTotal
      }

      res.render("orders", templateVars);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  });

  router.post("/",(req, res) => {
    db.query("UPDATE ORDERS set order_total = (SELECT SUM(order_items_total) FROM order_items WHERE order_id = 1) where orders.id = 1;")
    .then(data => {
      res.redirect("orders");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};







