DROP DATABASE IF EXISTS vacayhome;
CREATE DATABASE vacayhome;
USE vacayhome;

CREATE TABLE vacayhome.listing (
  id INT NOT NULL PRIMARY KEY
);

CREATE TABLE vacayhome.photo (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  url_path CHAR(255) NOT NULL,
  caption CHAR(255),
  space_type CHAR(40),
  sort_order INT,
  is_main BOOLEAN,
  listing_id INT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES listing (id)
    ON UPDATE RESTRICT
);

ALTER TABLE vacayhome.listing DISABLE KEYS;
ALTER TABLE vacayhome.photo DISABLE KEYS;
BEGIN;
LOAD DATA INFILE '/Users/gabrielsong/hrsf125/vr-carousel/CSVs/listings.csv' INTO TABLE vacayhome.listing 
  FIELDS TERMINATED BY ','
  LINES TERMINATED BY '\n'
  IGNORE 1 LINES (id);
COMMIT;
ALTER TABLE vacayhome.photo ENABLE KEYS;
ALTER TABLE vacayhome.listing ENABLE KEYS;

ALTER TABLE vacayhome.listing DISABLE KEYS;
ALTER TABLE vacayhome.photo DISABLE KEYS;
BEGIN;
LOAD DATA INFILE '/Users/gabrielsong/hrsf125/vr-carousel/CSVs/photos.part1.csv' INTO TABLE vacayhome.photo
  FIELDS
    OPTIONALLY ENCLOSED BY '"'
    TERMINATED BY ','
  LINES
    TERMINATED BY '\n'
  IGNORE 1 LINES (url_path,caption,space_type,@sort_order,is_main,listing_id);
COMMIT;
ALTER TABLE vacayhome.photo ENABLE KEYS;
ALTER TABLE vacayhome.listing ENABLE KEYS;