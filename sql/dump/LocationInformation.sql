create table "LocationInformation"
(
    id                       serial
        primary key,
    property_id              integer
        references "Property"
            on update cascade on delete cascade,
    location                 varchar(255),
    nomenclature             varchar(255),
    tower                    varchar(255),
    "amountOfFloors"         varchar(255),
    "isClosedStreet"         varchar(255),
    country                  varchar(255),
    state                    varchar(255),
    municipality             varchar(255),
    urbanization             varchar(255),
    avenue                   varchar(255),
    street                   varchar(255),
    "buildingShoppingCenter" varchar(255),
    "buildingNumber"         varchar(255),
    floor                    varchar(255),
    "referencePoint"         varchar(255),
    "howToGet"               varchar(255),
    "trunkNumber"            varchar(255),
    "trunkLevel"             varchar(255),
    "parkingNumber"          varchar(255),
    "parkingLevel"           varchar(255),
    city                     varchar(255),
    "createdAt"              timestamp with time zone not null,
    "updatedAt"              timestamp with time zone not null
)
    using ???;

alter table "LocationInformation"
    owner to postgres;

