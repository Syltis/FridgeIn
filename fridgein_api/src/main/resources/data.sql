/**
* Tables
*
* FOOD_ITEM
* ID, NAME, TYPE
*
* STOCK_ITEM table
* ID, BOUGHT_AT, EXPIRATION_DATE, NAME, TYPE,
*/
INSERT INTO FOOD_ITEM (ID, NAME, TYPE)
VALUES (1, 'Tomat', 'Frukt'),
       (2, 'Melk', 'Meieri'),
       (3, 'Eplejuice', 'Juice');

INSERT INTO STOCK_ITEM (ID, NAME, TYPE, BOUGHT_AT, EXPIRATION_DATE)
VALUES (1, 'Tomat', 'Frukt',  '2019-03-03', null),
       (2, 'Melk', 'Meieri', GetDate(), '2019-03-21'),
       (3, 'Kjøttdeig', 'Kjøtt', GetDate(), '2019-03-16');
