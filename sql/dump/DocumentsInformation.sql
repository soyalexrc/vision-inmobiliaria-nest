create table "DocumentsInformation"
(
    id                           serial
        primary key,
    property_id                  integer
        references "Property"
            on update cascade on delete cascade,
    "propertyDoc"                boolean,
    "CIorRIF"                    boolean,
    "ownerCIorRIF"               boolean,
    "spouseCIorRIF"              boolean,
    "isCadastralRecordSameOwner" boolean,
    "condominiumSolvency"        boolean,
    "mainProperty"               boolean,
    "mortgageRelease"            varchar(255),
    "condominiumSolvencyDetails" varchar(255),
    power                        varchar(255),
    "successionDeclaration"      varchar(255),
    "courtRulings"               varchar(255),
    "cadastralRecordYear"        varchar(255),
    "realStateTaxYear"           varchar(255),
    "attorneyEmail"              varchar(255),
    "attorneyPhone"              varchar(255),
    "attorneyFirstName"          varchar(255),
    "attorneyLastName"           varchar(255),
    "createdAt"                  timestamp with time zone not null,
    "updatedAt"                  timestamp with time zone not null
)
    using ???;

alter table "DocumentsInformation"
    owner to postgres;

