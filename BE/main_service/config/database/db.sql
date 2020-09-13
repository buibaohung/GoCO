CREATE OR REPLACE FUNCTION next_id(OUT result bigint, seq text) AS $$
DECLARE
    our_epoch bigint := 1570665600000;
    seq_id bigint;
    now_millis bigint;
    shard_id int := 5;
BEGIN
    SELECT nextval(seq) % 1024 INTO seq_id;
    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result := (now_millis - our_epoch) << 23;
    result := result | (shard_id <<10);
    result := result | (seq_id);
    
END;
    $$ LANGUAGE PLPGSQL;


CREATE OR REPLACE FUNCTION next_id_r(seq text)
RETURNS bigint AS $$
DECLARE
    result bigint;
    our_epoch bigint := 1570665600000;
    seq_id bigint;
    now_millis bigint;
    shard_id int := 5;
BEGIN
    SELECT nextval(seq) % 1024 INTO seq_id;
    SELECT FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000) INTO now_millis;
    result = (now_millis - our_epoch) << 23;
    result = result | (shard_id <<10);
    result = result | (seq_id);
    RETURN result;
END;
    $$ LANGUAGE PLPGSQL;

-- Table users (buyers)
drop table if exists users;
drop sequence if exists users_id_seq;
CREATE SEQUENCE users_id_seq;
create table users(
    id bigint NOT NULL DEFAULT next_id('users_id_seq') primary key,
    name text,
    phone_number text,
    password_hash text,
    eos_username text,
    private_key text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    deleted_at timestamptz
);

-- Table facilities
drop table if exists facilities;
drop sequence if exists facilities_id_seq;
CREATE SEQUENCE facilities_id_seq;
create table facilities(
    id bigint NOT NULL DEFAULT next_id('facilities_id_seq') primary key,
    name text,
    type text,
    eos_username text,
    public_key text,
    email text,
    phone_number text,
    location text,
    website text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    deleted_at timestamptz
);

-- Table facility_registrations
drop table if exists facility_registrations;
drop sequence if exists facility_registrations_id_seq;
CREATE SEQUENCE facility_registrations_id_seq;
create table facility_registrations(
    id bigint NOT NULL DEFAULT next_id('facility_registrations_id_seq') primary key,
    facility_name text,
    facility_type text,
    eos_username text,
    email text,
    phone_number text,
    location text,
    website text,
    status smallint,
    created_at timestamptz DEFAULT now(),
    deleted_at timestamptz
);

-- Table products
drop table if exists products;
drop sequence if exists products_id_seq;
CREATE SEQUENCE products_id_seq;
create table products(
    id bigint NOT NULL DEFAULT next_id('products_id_seq') primary key,
    name text,
    avatar text,
    facility_id bigint,
    description text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    deleted_at timestamptz,
    foreign key (facility_id) references facilities(id)
);

-- Table product_items
drop table if exists product_items;
drop sequence if exists product_items_id_seq;
CREATE SEQUENCE product_items_id_seq;
create table product_items(
    id bigint NOT NULL DEFAULT next_id('product_items_id_seq') primary key,
    product_id bigint,
    price numeric DEFAULT '0' NOT NULL,
    expiry_date timestamptz,
    owner_id bigint,
    from_product_item_id bigint,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    deleted_at timestamptz,
    foreign key (product_id) references products(id),
    foreign key (owner_id) references facilities(id),
    foreign key (from_product_item_id) references product_items(id)
);

-- Table events
drop table if exists events;
drop sequence if exists events_id_seq;
CREATE SEQUENCE events_id_seq;
create table events(
    id bigint NOT NULL DEFAULT next_id('events_id_seq') primary key,
    product_item_id bigint,
    name text,
    created_at timestamptz DEFAULT now(),
    from_facility_id bigint,
    to_facility_id bigint,
    delivered_by_facility_id bigint,
    sold_at timestamptz DEFAULT now(),
    from_product_item_id bigint,
    to_product_item_id bigint,
    updated_at timestamptz DEFAULT now(),
    deleted_at timestamptz,
    quality smallint,
    transaction_id text,
    foreign key (product_item_id) references product_items(id),
    foreign key (from_facility_id) references facilities(id),
    foreign key (to_facility_id) references facilities(id),
    foreign key (delivered_by_facility_id) references facilities(id),
    foreign key (from_product_item_id) references product_items(id),
    foreign key (to_product_item_id) references product_items(id)
);

-- Table event_aggregations
drop table if exists event_aggregations;
drop sequence if exists event_aggregations_id_seq;
CREATE SEQUENCE event_aggregations_id_seq;
create table event_aggregations(
    id bigint NOT NULL DEFAULT next_id('event_aggregations_id_seq') primary key,
    product_item_id bigint,
    event_id bigint,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    deleted_at timestamptz,
    foreign key (product_item_id) references product_items(id)
);

-- Table product_images
drop table if exists product_images;
drop sequence if exists product_images_id_seq;
CREATE SEQUENCE product_images_id_seq;
create table product_images(
    id bigint NOT NULL DEFAULT next_id('product_images_id_seq') primary key,
    product_id bigint,
    image_id text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    deleted_at timestamptz,
    foreign key (product_id) references products(id)
);

-- Table ratings
drop table if exists ratings;
drop sequence if exists ratings_id_seq;
CREATE SEQUENCE ratings_id_seq;
create table ratings(
    id bigint NOT NULL DEFAULT next_id('ratings_id_seq') primary key,
    user_id bigint,
    product_id bigint,
    star smallint,
    content text,
    stake int,
    transaction_id text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    deleted_at timestamptz,
    foreign key (product_id) references products(id)
);

-- Table vote_ratings
drop table if exists vote_ratings;
drop sequence if exists vote_ratings_id_seq;
CREATE SEQUENCE vote_ratings_id_seq;
create table vote_ratings(
    id bigint NOT NULL DEFAULT next_id('vote_ratings_id_seq') primary key,
    rating_id bigint,
    user_id bigint,
    "like" smallint,
    stake int,
    transaction_id text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    deleted_at timestamptz,
    foreign key (rating_id) references ratings(id)
);

drop table if exists interactions;
drop sequence if exists interactions_id_seq;
CREATE SEQUENCE interactions_id_seq;
create table interactions(
    id bigint NOT NULL DEFAULT next_id('interactions_id_seq') primary key,
    user_id bigint,
    product_id bigint,
    views int,
    time_view int, -- seconds
    foreign key (user_id) references users(id),
    foreign key (product_id) references products(id)
);