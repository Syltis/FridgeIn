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
       (3, 'Eplejuice', 'Juice'),
       (4, 'Kjøttdeig', 'Kjøtt'),
       (10, 'Pære', 'Frukt'),
       (5, 'Kyllingfilet', 'Kjøtt'),
       (15, 'Eple', 'Frukt'),
       (6, 'Ris', 'Korn');


INSERT INTO STOCK_ITEM (ID, NAME, TYPE, BOUGHT_AT, EXPIRATION_DATE)
VALUES (1, 'Tomat', 'Frukt',  '2019-03-03', null),
       (2, 'Melk', 'Meieri', GetDate(), '2019-03-21'),
       (3, 'Kjøttdeig', 'Kjøtt', GetDate(), '2019-03-16'),
       (10, 'Pære', 'Frukt',  '2019-03-13', null),
       (4, 'Kyllingfilet', 'Kjøtt', GetDate(), '2019-03-24'),
       (15, 'Eple', 'Frukt', '2019-03-10', null),
       (5, 'Ris', 'Korn', GetDate(), '2019-08-19');
