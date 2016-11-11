CREATE TABLE db_subject (
    subject_id serial PRIMARY KEY,
    subject_name varchar (128) NOT NULL
);

CREATE TABLE db_user (
    user_id serial PRIMARY KEY,
    user_name varchar (64),
    user_authsch_id varchar (36),
    user_avatar varchar (64)
);

CREATE TABLE db_group (
    group_id serial PRIMARY KEY,
    group_name varchar (128),
    group_description varchar (256),
    group_start_date timestamp NOT NULL,
    group_end_date timestamp NOT NULL,
    subject_id integer NOT NULL
);

CREATE TABLE db_group_user (
    group_id integer NOT NULL,
    user_id integer NOT NULL,
    description varchar (256),
    join_time timestamp NOT NULL,
    PRIMARY KEY (group_id, user_id)
);
