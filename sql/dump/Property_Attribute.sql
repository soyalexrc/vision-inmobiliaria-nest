create table "Property_Attribute"
(
    id           serial
        primary key,
    property_id  integer,
    value        varchar(255),
    attribute_id integer
)
    using ???;

alter table "Property_Attribute"
    owner to postgres;

