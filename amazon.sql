DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products
(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(10,2),
    stock_quantity INT(10),
    PRIMARY KEY(item_id)
);

INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Fidget Spinners", "Toys", 10.00, 20);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Boys 2T Blue Shirts", "Toddler Clothing", 4.99, 10);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Boys 2T Black Shirts", "Toddler Clothing", 4.99, 10);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Boys 4T Red Shirts", "Toddler Clothing", 7.99, 8);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Boys 4T Black Shirts", "Toddler Clothing", 7.99, 8);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Crock Pot", "Appliances", 59.99, 4);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Spiderman Figurine", "Toys", 9.99, 12);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Drone", "Toys", 179.99, 2);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Cool White LED Christmas Lights", "Seasonal", 12.99, 25);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("Warm White LED Christmas Lights", "Seasonal", 12.99, 25);

SELECT * FROM products;