create table "DeleteFileRequest"
(
    id          serial
        primary key,
    path        varchar(255),
    "user"      varchar(255),
    type        varchar(255),
    "createdAt" timestamp with time zone not null
)
    using ???;

alter table "DeleteFileRequest"
    owner to postgres;

