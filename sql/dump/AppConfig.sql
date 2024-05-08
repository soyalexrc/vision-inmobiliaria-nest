create table "AppConfig"
(
    id                  serial
        primary key,
    "configCode"        varchar(255),
    "configValue"       varchar(255),
    "configDescription" varchar(255),
    "createdAt"         timestamp with time zone not null,
    "updatedAt"         timestamp with time zone not null
)
    using ???;

alter table "AppConfig"
    owner to postgres;

