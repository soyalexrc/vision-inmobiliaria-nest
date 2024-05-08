create table "Service"
(
    id          serial
        primary key,
    title       varchar(255),
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
)
    using ???;

alter table "Service"
    owner to postgres;

