DROP DATABASE IF EXISTS bamazon;

CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price INTEGER(10),
    stock_quantity INTEGER(10),
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mouse Pad", "Computer Accessories", 3, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone Case", "Phone Accessories", 10, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Phone Charger", "Phone Accessories", 10, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bag-O-Chips", "Food and Drinks", 3, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Buzz Light Beer", "Food and Drinks", 9, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Screwdriver Set", "Hardware", 5, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rubber Ducky", "Coder Accessories", 1, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Beef Jerkey", "Food and Drinks", 5, 0);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wrench Set", "Hardwares", 5, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Flying V", "Musical Instruments", 100, 3);