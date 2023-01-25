BEGIN TRANSACTION;
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "food";
DROP TABLE IF EXISTS "times";
DROP TABLE IF EXISTS "order";
CREATE TABLE IF NOT EXISTS "users" (
	"name"	TEXT,
	"surname"	TEXT,
	"studentid"	TEXT,
	"order"	TEXT,
	"money"	TEXT,
	"phone"	TEXT,
	"id"	INTEGER,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "food" (
	"url"	TEXT,
	"title"	TEXT,
	"favorite"	INTEGER,
	"type"	INTEGER,
	"id"	INTEGER,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "times" (
	"time_slot"	TEXT,
	"type"	INTEGER,
	"order"	INTEGER,
	"id"	INTEGER,
	PRIMARY KEY("id")
);
CREATE TABLE IF NOT EXISTS "order" (
	"time"	INTEGER,
	"id"	INTEGER,
	"time_slot"	TEXT,
	"order_number"	INTEGER,
	"user_id"	INTEGER,
	PRIMARY KEY("id")
);
INSERT INTO "users" VALUES ('Ana de','Armas','s7001100',NULL,'30','+39 333 351 11 71',1);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2023/01/Red-Sauce-Pasta-008.jpg','red sauce pasta',1,1,1);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2022/11/Honey-Garlic-Salmon-012-1.jpg','honey garlic ',NULL,1,2);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2021/03/Cheese-Tortellini-011.jpg','cheese tortellini',NULL,1,3);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2022/11/Quesadilla-015.jpg','quesadilla',NULL,1,4);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2021/04/Salmon-and-Asparagus-009.jpg','Salmon',NULL,2,5);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2022/11/Honey-Garlic-Salmon-012-1.jpg','honey garlic salmon',1,2,6);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2019/11/Chickpea-Curry-007.jpg','chickpea curry',NULL,2,7);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2019/11/Chickpea-Curry-007.jpg','frittata',NULL,2,8);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2022/03/Quinoa-Salad-008.jpg','quinoa salad',1,3,9);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2017/04/Greek-Quinoa-Salad-001.jpg','greek quinoa salad',NULL,3,10);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2020/09/Veggie-Breakfast-Scramble-008.jpg','scramble eggs',NULL,3,11);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2022/01/Egg-Muffins-004.jpg','egg muffins',NULL,3,12);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2022/01/Kale-Soup-006.jpg','kale soup',NULL,1,13);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2022/10/Cabbage-Soup-002.jpg','cabbage soup',NULL,1,14);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2022/11/Potato-Leek-Soup-010.jpg','leek soup',NULL,1,15);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2021/09/White-Bean-Soup-050.jpg','been soup',NULL,1,16);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2021/03/Taco-Soup-016.jpg','taco soup',NULL,1,17);
INSERT INTO "food" VALUES ('https://www.acouplecooks.com/wp-content/uploads/2019/12/Loaded-Potato-Soup-013.jpg','potato soup',NULL,1,18);
INSERT INTO "times" VALUES ('11:00 - 11:30',1,1,1);
INSERT INTO "times" VALUES ('11:30 - 12:00',1,2,2);
INSERT INTO "times" VALUES ('12:00 - 12:30',1,3,3);
INSERT INTO "times" VALUES ('12:30 - 13:00',1,4,4);
INSERT INTO "times" VALUES ('13:00 - 13:30',1,5,5);
INSERT INTO "times" VALUES ('13:30 - 14:00',1,6,6);
INSERT INTO "times" VALUES ('14:00 - 14:30',1,7,7);
INSERT INTO "times" VALUES ('14:30 - 15:00',1,8,8);
INSERT INTO "times" VALUES ('19:00 - 19:30',2,1,9);
INSERT INTO "times" VALUES ('19:30 - 20:00',2,2,10);
INSERT INTO "times" VALUES ('20:00 - 20:30',2,3,11);
INSERT INTO "times" VALUES ('20:30 - 21:00',2,4,12);
INSERT INTO "order" VALUES (2,1,'12:30 - 13:00',1,1);
COMMIT;
