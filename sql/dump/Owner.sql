create table "Owner"
(
    id           serial
        primary key,
    ci           varchar(255),
    "firstName"  varchar(255),
    "lastName"   varchar(255),
    email        varchar(255),
    phone        varchar(255),
    birthdate    timestamp with time zone,
    "isInvestor" boolean,
    "createdAt"  timestamp with time zone not null,
    "updatedAt"  timestamp with time zone not null
)
    using ???;

alter table "Owner"
    owner to postgres;

