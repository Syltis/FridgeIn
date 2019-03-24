# SELECT statements
select * from stockitem;
select * from fooditem;

select foodItem_id from fooditem where type = 1;
delete from fooditem where type = 't';
delete from stockitem where purchase_date = '2019-03-21';

# CONSTRAINT statements

alter table fooditem change foodItem_id id bigint;

rename table `FoodItem` to `fooditem`;
rename table `StockItem` to `stockitem`;


SET SQL_SAFE_UPDATES = 0;