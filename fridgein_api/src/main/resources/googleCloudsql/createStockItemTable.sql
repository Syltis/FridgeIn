create table fridgeindb.stock_item (
	id bigint not null,
    type varchar(50) not null,
    name varchar(50) not null,
    boughtat date not null,
    expirationdate date,
    primary key (id)
);