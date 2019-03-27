# SELECT statements
select * from stockitem;
select * from fooditem;

select foodItem_id from fooditem where type = 1;

# DELETE
delete from fooditem;
delete from stockitem;

delete from stockitem where expiration_date = "2019-03-21";
delete from stockitem where fooditem_id = 3;
delete from fooditem where type = 't';

# CONSTRAINT statements

alter table fooditem add unique(name);
alter table fooditem change foodItem_id id bigint;

rename table `FoodItem` to `fooditem`;
rename table `StockItem` to `stockitem`;

alter table stockitem
drop index fk_stockitem_fooditem;

alter table fooditem 
add unique (name);

alter table stockitem
add constraint fk_stockitem_fooditem
foreign key (fooditem_id)
references fooditem(fooditem_id)
on delete cascade;

SET SQL_SAFE_UPDATES = 0;