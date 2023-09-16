alter table public."Client"
    alter column "requirementStatus" type varchar(255) using "requirementStatus"::varchar(255);

--

alter table public."Property"
    add "publicationTitle" varchar(255);

alter table public."Property"
    alter column "publicationTitle" set not null;


alter table public."GeneralInformation"
alter column "distributionComments" type text using "distributionComments"::text;

alter table public."GeneralInformation"
alter column description type text using description::text;


