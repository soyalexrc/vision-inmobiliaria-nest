create table "NegotiationInformation"
(
    id                      serial
        primary key,
    property_id             integer
        references "Property"
            on update cascade on delete cascade,
    price                   varchar(255),
    "minimumNegotiation"    varchar(255),
    client                  varchar(255),
    "reasonToSellOrRent"    varchar(255),
    "partOfPayment"         varchar(255),
    "mouthToMouth"          boolean,
    "realStateGroups"       boolean,
    "realStateWebPages"     boolean,
    "socialMedia"           boolean,
    "publicationOnBuilding" boolean,
    "operationType"         varchar(255),
    "propertyExclusivity"   varchar(255),
    "ownerPaysCommission"   varchar(255),
    "rentCommission"        varchar(255),
    "sellCommission"        varchar(255),
    "createdAt"             timestamp with time zone not null,
    "updatedAt"             timestamp with time zone not null
)
    using ???;

alter table "NegotiationInformation"
    owner to postgres;

