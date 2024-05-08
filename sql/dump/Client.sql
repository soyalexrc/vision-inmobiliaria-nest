create table "Client"
(
    id                     serial
        primary key,
    property_id            integer
        references "Property"
            on update cascade,
    name                   varchar(255),
    "usageProperty"        varchar(255),
    referrer               varchar(255),
    "contactFrom"          varchar(255),
    "requirementStatus"    varchar(255),
    user_id                integer
        references "User"
            on update cascade,
    phone                  varchar(255),
    "propertyOfInterest"   varchar(255),
    "propertyLocation"     varchar(255),
    "typeOfCapture"        varchar(255),
    "aspiredPrice"         varchar(255),
    "typeOfBusiness"       varchar(255),
    note                   varchar(255),
    "isPotentialInvestor"  boolean,
    "zonesOfInterest"      jsonb,
    "essentialFeatures"    jsonb,
    "amountOfPeople"       integer,
    "amountOfPets"         integer,
    "amountOfYounger"      integer,
    "arrivingDate"         timestamp with time zone,
    "checkoutDate"         timestamp with time zone,
    "amountOfNights"       integer,
    "reasonOfStay"         varchar(255),
    "usageOfProperty"      varchar(255),
    "typeOfPerson"         varchar(255),
    "personEntry"          varchar(255),
    "personHeadquarters"   varchar(255),
    "personLocation"       varchar(255),
    "specificRequirement"  varchar(255),
    location               varchar(255),
    company                varchar(255),
    "serviceName"          varchar(255),
    "remodeledAreas"       text,
    "propertyDistribution" text,
    m2                     varchar(255),
    "subServiceName"       varchar(255),
    occupation             varchar(255),
    "interestDate"         timestamp with time zone,
    "appointmentDate"      timestamp with time zone,
    "inspectionDate"       timestamp with time zone,
    service_id             integer
        references "Service"
            on update cascade,
    "subService_id"        integer
        references "SubService"
            on update cascade,
    "createdAt"            timestamp with time zone not null,
    "updatedAt"            timestamp with time zone not null
)
    using ???;

alter table "Client"
    owner to postgres;

