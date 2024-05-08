create table "TemporalId"
(
    id           serial
        primary key,
    "temporalId" varchar(255)
)
    using ???;

alter table "TemporalId"
    owner to postgres;

