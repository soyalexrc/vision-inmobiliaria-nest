create table "File"
(
    id          serial
        primary key,
    type        varchar(255),
    name        varchar(255),
    extension   varchar(255),
    "createdAt" timestamp with time zone not null,
    "updatedAt" timestamp with time zone not null,
    size        bigint,
    parent_id   integer
        constraint file_file_id_fk
            references "File",
    path        varchar
)
    using ???;

alter table "File"
    owner to postgres;

INSERT INTO public."File" (id, type, name, extension, "createdAt", "updatedAt", size, parent_id, path) VALUES (2, 'FOLDER', 'flujo de caja', null, '2024-04-01 00:05:32.644000 +00:00', '2024-04-01 00:05:32.644000 +00:00', null, null, null);
INSERT INTO public."File" (id, type, name, extension, "createdAt", "updatedAt", size, parent_id, path) VALUES (3, 'FOLDER', 'servicio contable', null, '2024-04-01 00:05:32.644000 +00:00', '2024-04-01 00:05:32.644000 +00:00', null, null, null);
INSERT INTO public."File" (id, type, name, extension, "createdAt", "updatedAt", size, parent_id, path) VALUES (5, 'FOLDER', 'servicio de remodelacion', null, '2024-04-01 00:05:32.644000 +00:00', '2024-04-01 00:05:32.644000 +00:00', null, null, null);
INSERT INTO public."File" (id, type, name, extension, "createdAt", "updatedAt", size, parent_id, path) VALUES (7, 'FOLDER', 'servicio legal', null, '2024-04-01 00:05:32.644000 +00:00', '2024-04-01 00:05:32.644000 +00:00', null, null, null);
INSERT INTO public."File" (id, type, name, extension, "createdAt", "updatedAt", size, parent_id, path) VALUES (4, 'FOLDER', 'servicio de mantenimiento', null, '2024-04-01 00:05:32.644000 +00:00', '2024-04-01 00:05:32.644000 +00:00', null, null, null);
INSERT INTO public."File" (id, type, name, extension, "createdAt", "updatedAt", size, parent_id, path) VALUES (6, 'FOLDER', 'servicio inmobiliario', null, '2024-04-01 00:05:32.644000 +00:00', '2024-04-01 00:05:32.644000 +00:00', null, null, null);
