# SELECT statements
select * from stockitem;
select * from fooditem;

select foodItem_id from fooditem where type = 1;
delete from stockitem where type = 't';
delete from fooditem where type = 't';

# CONSTRAINT statements

alter table fooditem change foodItem_id id bigint;

SET SQL_SAFE_UPDATES = 0;