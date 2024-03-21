DROP TABLE IF EXISTS order_items CASCADE;
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 0,
  order_items_total INTEGER DEFAULT 0
);

-- Create new order when user clickes CREATE ORDER button on home page (order_id, user_id, total(0))

-- Add to Order button will take the food_id and requested quantity of food item and insert into food_orders table with associated order_id (POST REQUEST)

-- Button at bottom of menu page SUBMIT ORDER that will get/route to orders page, and display all food_orders of that particular order (Select * FROM food_orders WHERE order_id = n) (GET REQUEST)

--Find a way to get total cost (get price from food_id * quantity for each food_orders row = food_orders total => then update orders table with sum of each food_orders total to update orders_total)

-- UPDATE ORDERS set orders_total = (SELECT SUM(food_orders_total) FROM food_orders WHERE order_id = 'id') where orders.id = 'id';
