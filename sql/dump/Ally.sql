create table "Ally"
(
    id          serial
        primary key,
    "firstName" varchar(255),
    "lastName"  varchar(255),
    phone       varchar(255),
    email       varchar(255),
    "birthDate" timestamp with time zone,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
)
    using ???;

alter table "Ally"
    owner to postgres;

