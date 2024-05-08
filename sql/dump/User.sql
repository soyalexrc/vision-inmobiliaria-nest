create table "User"
(
    id               serial
        primary key,
    "firstName"      varchar(255),
    "lastName"       varchar(255),
    "mainPhone"      varchar(255),
    "secondaryPhone" varchar(255),
    password         varchar(255),
    email            varchar(255),
    "corporateEmail" varchar(255),
    "birthDate"      timestamp with time zone,
    "joinDate"       timestamp with time zone,
    username         varchar(255),
    "userType"       varchar(255),
    "userLevel"      varchar(255),
    "userCommission" varchar(255),
    "isActive"       boolean,
    facebook         varchar(255),
    instagram        varchar(255),
    twitter          varchar(255),
    youtube          varchar(255),
    tiktok           varchar(255),
    city             varchar(255),
    state            varchar(255),
    address          text,
    image            varchar(255),
    profession       varchar(255),
    company          varchar(255),
    "createdAt"      timestamp with time zone not null,
    "updatedAt"      timestamp with time zone not null
)
    using ???;

alter table "User"
    owner to postgres;

INSERT INTO public."User" (id, "firstName", "lastName", "mainPhone", "secondaryPhone", password, email, "corporateEmail", "birthDate", "joinDate", username, "userType", "userLevel", "userCommission", "isActive", facebook, instagram, twitter, youtube, tiktok, city, state, address, image, profession, company, "createdAt", "updatedAt") VALUES (2, 'admin', 'admin', '2828282828', '28282288', 'admin@gmail.com', '1123123', 'admin', null, null, '$2b$10$PeDLj0zw1/dW4JV/EyZs5eBwfBVxF99glMUPgDfWh0fnDS3CsjIKS', 'admin@gmail.com', null, 'true', null, null, null, null, null, null, null, null, null, null, null, '0', '2024-03-29 23:53:22.741000 +00:00', '2024-03-29 23:53:24.551000 +00:00');
