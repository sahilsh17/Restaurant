const express = require('express');
const router  = express.Router();

// VIEW MENU

module.exports = (db) => {
  router.post("/",(req, res) => {
    const price = req.body.price;
    const quantity = req.body.quantity;
    const id = req.body.itemID;
    const total = price * quantity;

    db.query(`SELECT item_id FROM order_items WHERE order_id = 1 and item_id = ${id};`)
    .then(data => {

      let b = [];
      for (let item of data.rows) {
        b.push({...item});
      }

      if(b.length === 0) {
        db.query(`INSERT INTO order_items (order_id,item_id, quantity,order_items_total) VALUES (1,${id},${quantity},${total});`)
        .then(data => {
          res.status(200);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {

        db.query(`UPDATE order_items SET quantity =${quantity},order_items_total=${total} WHERE item_id=${id} and order_id = 1;`)
        .then(data=>{
          res.status(200);
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.get("/", (req, res) => {
    db.query('SELECT * FROM items ORDER BY id;')
    .then(data => {
      let a = [];
      for (let item of data.rows)
      {
        a.push({
          id : item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          url: item.food_pic_url
        });
      }

    const templateVars = {
      imageURL : a
    }

    res.render("menu",templateVars);

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
