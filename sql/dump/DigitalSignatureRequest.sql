create table "DigitalSignatureRequest"
(
    id                   serial
        primary key,
    "filePath"           varchar(255),
    "signedDocumentPath" varchar(255),
    "expiresAt"          timestamp with time zone,
    "sendToEmail"        varchar(255),
    "requestedBy"        varchar(255),
    status               varchar(255),
    "sendToData"         jsonb,
    "clientId"           integer
        references "Client"
            on update cascade on delete cascade,
    "ownerId"            integer
        references "Owner"
            on update cascade,
    "allyId"             integer
        references "Ally"
            on update cascade on delete cascade,
    "externalAdviserId"  integer
        references "ExternalAdviser"
            on update cascade on delete cascade,
    "createdAt"          timestamp with time zone not null,
    "updatedAt"          timestamp with time zone not null
)
    using ???;

alter table "DigitalSignatureRequest"
    owner to postgres;

