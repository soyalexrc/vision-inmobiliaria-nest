create table "ExternalAdviser"
(
    id              serial
        primary key,
    "firstName"     varchar(255),
    "lastName"      varchar(255),
    phone           varchar(255),
    email           varchar(255),
    "realStateName" varchar(255),
    "createdAt"     timestamp with time zone not null,
    "updatedAt"     timestamp with time zone not null
)
    using ???;

alter table "ExternalAdviser"
    owner to postgres;

