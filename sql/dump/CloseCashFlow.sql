create table "CloseCashFlow"
(
    id          serial
        primary key,
    data        jsonb,
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null
)
    using ???;

alter table "CloseCashFlow"
    owner to postgres;

