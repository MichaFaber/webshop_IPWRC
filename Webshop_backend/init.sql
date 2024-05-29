--
-- File generated with SQLiteStudio v3.3.3 on Wed May 8 16:22:34 2024
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: product
CREATE TABLE product (id INTEGER PRIMARY KEY, name VARCHAR NOT NULL, 
description VARCHAR, type VARCHAR NOT NULL, price INTEGER, stockcount 
INTEGER, imageUrl VARCHAR);
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (2, 'Call of duty WW2', NULL, 'game', 30, 8, 
'./assets/call-of-duty-WWII-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (3, 'Crash Bandicoot Trilogy', NULL, 'game', 40, 10, 
'./assets/crash-nsane-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (4, 'Crash Team Racing', NULL, 'game', 40, 3, 
'./assets/Ctr-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (5, 'Sniper elite 3', NULL, 'game', 30, 12, 
'./assets/Sniper-elite-3-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (6, 'Tekken 7', NULL, 'game', 50, 40, 
'./assets/Tekken7-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (7, 'Rocket League', NULL, 'game', 40, 9, 
'./assets/rocket-league-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (8, 'Overwatch', NULL, 'game', 40, 4, 
'./assets/Overwatch-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (9, 'Dragonball FighterZ', NULL, 'game', 60, 9001, 
'./assets/dragonball-fighterZ-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (10, 'Grand theft auto V', NULL, 'game', 60, 6, 
'./assets/GTA-V-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (11, 'Hitman', NULL, 'game', 40, 19, 
'./assets/hitman-full-season-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (12, 'Hitman 2', NULL, 'game', 60, 47, 
'./assets/Hitman-2-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (13, 'Mortal Kombat XL', NULL, 'game', 50, 15, 
'./assets/Mortal-Kombat-XL-ps4-box.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (14, 'Redbull', NULL, 'drink', 2.5, 11, 
'./assets/Redbull-single.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (15, 'Monster-energy', NULL, 'drink', 2.5, 77, 
'./assets/Monster-energy.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (16, 'Doritos bits red', NULL, 'snack', 1, 33, 
'./assets/doritos-bits-honey-bbq.png');
INSERT INTO product (id, name, description, type, price, stockcount, 
imageUrl) VALUES (17, 'Doritos bits blue', NULL, 'snack', 1, 44, 
'./assets/doritos-bits-sweet-paprika.png');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;


