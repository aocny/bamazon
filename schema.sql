DROP DATABASE IF EXISTS bamazon_db;
create database bamazon_db;
use bamazon_db;
create table products (
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  price Decimal NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (department_name, product_name, price,  stock_quantity)
VALUES ("linens","pillow case", 10.00, 5), ("electronics","cell phones", 100.00, 20), ("apparel","jeans", 20.00, 25),
("food","apples", 1.00, 200), ("Entertainment","CDs", 15.00, 220);

select * from products