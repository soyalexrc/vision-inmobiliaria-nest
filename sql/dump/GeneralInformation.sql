create table "GeneralInformation"
(
    id                           serial
        primary key,
    property_id                  integer
        references "Property"
            on update cascade on delete cascade,
    status                       varchar(255),
    code                         varchar(255),
    "footageGround"              varchar(255),
    "footageBuilding"            varchar(255),
    description                  text,
    "propertyType"               varchar(255),
    "propertyCondition"          varchar(255),
    "handoverKeys"               boolean,
    "termsAndConditionsAccepted" boolean,
    antiquity                    varchar(255),
    zoning                       varchar(255),
    "amountOfFloors"             varchar(255),
    "propertiesPerFloor"         varchar(255),
    "typeOfWork"                 varchar(255),
    "isFurnished"                boolean,
    "isOccupiedByPeople"         boolean,
    "createdAt"                  timestamp with time zone not null,
    "updatedAt"                  timestamp with time zone not null
)
    using ???;

alter table "GeneralInformation"
    owner to postgres;

