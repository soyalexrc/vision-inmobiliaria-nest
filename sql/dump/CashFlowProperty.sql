create table "CashFlowProperty"
(
    id          serial
        primary key,
    name        varchar(255),
    location    varchar(255),
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
)
    using ???;

alter table "CashFlowProperty"
    owner to postgres;

