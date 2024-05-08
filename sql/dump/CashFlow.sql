create table "CashFlow"
(
    id                      serial
        primary key,
    client_id               integer
        references "Client"
            on update cascade on delete cascade,
    user_id                 integer
        references "User"
            on update cascade on delete cascade,
    owner_id                integer
        references "Owner"
            on update cascade,
    location                varchar(255),
    person                  varchar(255),
    date                    timestamp with time zone,
    month                   varchar(255),
    "transactionType"       varchar(255),
    "wayToPay"              varchar(255),
    currency                varchar(255),
    entity                  varchar(255),
    observation             varchar(255),
    service                 varchar(255),
    "serviceType"           varchar(255),
    "taxPayer"              varchar(255),
    canon                   varchar(255),
    guarantee               varchar(255),
    contract                varchar(255),
    reason                  varchar(255),
    "createdBy"             varchar(255),
    "isTemporalTransaction" boolean,
    "temporalTransactionId" varchar(255),
    amount                  varchar(255),
    "totalDue"              varchar(255),
    "incomeByThird"         varchar(255),
    attachments             jsonb,
    "pendingToCollect"      varchar(255),
    "createdAt"             timestamp with time zone not null,
    "updatedAt"             timestamp with time zone not null,
    property_id             integer
                                                     references "CashFlowProperty"
                                                         on update cascade on delete set null
)
    using ???;

alter table "CashFlow"
    owner to postgres;

