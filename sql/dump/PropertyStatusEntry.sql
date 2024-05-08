create table "PropertyStatusEntry"
(
    id          serial
        primary key,
    username    varchar(255),
    status      varchar(255),
    comments    varchar(255),
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null,
    property_id integer
                                         references "Property"
                                             on update cascade on delete set null
)
    using ???;

alter table "PropertyStatusEntry"
    owner to postgres;

