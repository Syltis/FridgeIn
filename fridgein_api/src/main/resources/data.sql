/**
* Columns
* EXPIRATIONTYPE, ID, NAME, TYPE, EXPIRATIONDATE, BOUGHTAT
*/

INSERT INTO FOOD_ITEM
VALUES ('N', 1, 'Tomat', 'Frukt', null, '2019-03-03'),
       ('Y', 2, 'Melk', 'Meieri', '2019-03-21', GetDate()),
       ('Y', 3, 'Kjøttdeig', 'Kjøtt', '2019-03-16', GetDate());
