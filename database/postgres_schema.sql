/*
// ==============================================
// Database creation
// ==============================================
*/
-- DROP DATABASE IF EXISTS sdc_db;
-- CREATE DATABASE sdc_db;
\c sdc_db;


CREATE TABLE products (
 id BIGSERIAL,
 name TEXT,
 slogan TEXT,
 description TEXT,
 category TEXT,
 default_price DECIMAL
);

ALTER TABLE products ADD CONSTRAINT products_pkey PRIMARY KEY (id);


CREATE TABLE styles (
 id BIGSERIAL,
 product_id INTEGER,
 name TEXT,
 sale_price TEXT,
 original_price TEXT,
 default_style BOOLEAN
);

ALTER TABLE styles ADD CONSTRAINT styles_pkey PRIMARY KEY (id);


CREATE TABLE features (
 id BIGSERIAL,
 product_id INTEGER,
 feature TEXT,
 value TEXT
);

ALTER TABLE features ADD CONSTRAINT features_pkey PRIMARY KEY (id);


CREATE TABLE photos (
 id BIGSERIAL,
 style_id INTEGER,
 url TEXT,
 thumbnail_url TEXT
);

ALTER TABLE photos ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


CREATE TABLE skus (
 id BIGSERIAL,
 style_id INTEGER,
 size TEXT,
 quantity INTEGER
);

ALTER TABLE skus ADD CONSTRAINT skus_pkey PRIMARY KEY (id);


CREATE TABLE related (
 id BIGSERIAL,
 current_product_id INTEGER,
 related_product_id INTEGER
);

ALTER TABLE related ADD CONSTRAINT related_pkey PRIMARY KEY (id);


-- add foreign key constraints to tables
ALTER TABLE styles ADD CONSTRAINT styles_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE features ADD CONSTRAINT features_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE photos ADD CONSTRAINT photos_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);
ALTER TABLE skus ADD CONSTRAINT skus_style_id_fkey FOREIGN KEY (style_id) REFERENCES styles(id);
ALTER TABLE related ADD CONSTRAINT related_current_product_id_fkey FOREIGN KEY (current_product_id) REFERENCES products(id);
ALTER TABLE related ADD CONSTRAINT related_related_product_id_fkey FOREIGN KEY (related_product_id) REFERENCES products(id);


-- add indexes to frequently queried columns
CREATE INDEX features_product_id_index ON features (product_id);
CREATE INDEX styles_product_id_index ON styles (product_id);
CREATE INDEX photos_style_id_index ON photos (style_id);
CREATE INDEX skus_style_id_index ON skus (style_id);
CREATE INDEX related_current_product_id_index ON related (current_product_id);




/*  Execute this file from the command line by typing:
 *    mysql -u <USER> < schema.sql
 *    OR
 *    mysql -u <USER> -p < schema.sql
 *
 *    NOTE: THIS IS FOR MYSQL. NEED TO FIND THE postgreSQL EQUIVALENT.
*/