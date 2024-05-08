create table "SubService"
(
    id          serial
        primary key,
    title       varchar(255),
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null,
    service_id  integer
                                         references "Service"
                                             on update cascade on delete set null
)
    using ???;

alter table "SubService"
    owner to postgres;

