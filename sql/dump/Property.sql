create table "Property"
(
    id                  serial
        primary key,
    user_id             integer
        references "User"
            on update cascade on delete cascade,
    ally_id             integer,
    owner_id            integer
        references "Owner"
            on update cascade,
    external_adviser_id integer
        references "ExternalAdviser"
            on update cascade on delete cascade,
    files               varchar(255)[],
    "publicationTitle"  varchar(255),
    images              varchar(255)[],
    attributes          jsonb,
    distribution        jsonb,
    services            jsonb,
    adjacencies         jsonb,
    equipment           jsonb,
    "furnishedAreas"    jsonb,
    "createdAt"         timestamp with time zone not null,
    "updatedAt"         timestamp with time zone not null
)
    using ???;

alter table "Property"
    owner to postgres;

