--Create Inital Database - Team Road Runner Project - Mobile Hotspot v0.1c

Create database hotspotdb;
\c hotspotdb
----- This section imports the Facilities datasources
-- Table for importing and transforming NSW Location data - for the scope of the demo, we will transform to remove un-needed vaules vs preserving for future use
Create table if not exists tnsw_Load_LocFacData
	(LOCATION_NAME varchar, TSN int, X_COORD numeric, Y_COORD numeric,	EFA_ID int,	PHONE varchar, ADDRESS varchar,	FACILITIES varchar,	"ACCESS" varchar, TRANSPORT varchar);
--Table for importing static values for lookups - not included in release
--Create table if not exists tnsw_Load_LocationFacititiesData
--	(FAC_ID int, FAC_DESC varchar, TYPE	varchar, ORDER int);
Create table if not exists tnsw_FacilitiesData
	(LOCATION_NAME varchar, TSN int, X_COORD int, Y_COORD int,	EFA_ID int,	PHONE varchar, ADDRESS varchar, TRANSPORT varchar);


----- This section imports the Travel Schedule datasources -- for the scope of this demo, we will not use shaping or fare data

-- Table for importing current route data
Create table if not exists tnsw_routes
	(route_id varchar,agency_id int,route_short_name varchar,route_long_name varchar,route_desc varchar,route_type numeric ,route_color VARCHAR,route_text_color VARCHAR);

-- Table for importing current trips data
Create table if not exists tnsw_trips
	(route_id varchar,service_id varchar, trip_id varchar,shape_id varchar ,trip_headsign varchar,direction_id int,block_id varchar ,wheelchair_accessible int);
	
-- Table for importing current trips data
Create table if not exists tnsw_stop_times
	(trip_id varchar,arrival_time varchar,departure_time varchar ,stop_id varchar,stop_sequence int,stop_headsign varchar,pickup_type int,drop_off_type int,shape_dist_traveled varchar);

-- Table for importing current stops data
Create table if not exists tnsw_stops
	(stop_id varchar,stop_code varchar,stop_name varchar,stop_lat numeric,stop_lon numeric,location_type varchar,parent_station varchar,wheelchair_boarding varchar,platform_code varchar);
	
-- Table for importing current calendar times data
Create table if not exists tnsw_calendar
	(service_id varchar,monday boolean ,tuesday boolean,wednesday boolean,thursday boolean,friday boolean,saturday boolean, sunday boolean,start_date date,end_date date);

-- Table for importing current calendar_dates times data
Create table if not exists tnsw_calendar_dates
	(service_id varchar,"date" date,exception_type int);
	
	
--------------------------Index Section--------------------------
-----------------------------------------------------------------
-----------------------------------------------------------------

--- Create indxes on columns that will be used for the demo
create index location_name_idx on tnsw_FacilitiesData (location_name);
create index tsn_idx on tnsw_FacilitiesData (tsn);
create index route_id_idx on tnsw_routes (route_id);
create index route_id_trips_idex on tnsw_trips (route_id);
create index trip_id_idx on tnsw_trips (trip_id);
create index stop_id_idx on tnsw_stops (stop_id);
create index service_id_idx on tnsw_calendar (service_id);
create index service_id_dates_idx on tnsw_calendar_dates (service_id);



--------------------------Create MSH Section--------------------
-----------------------------------------------------------------
-----------------------------------------------------------------


-- Create mhs_sources to show the different data inpoints
\c hotspotdb
create table if not exists mhs_sources
	(source_id int, source_type int, source_name varchar, source_weight int);

-- Create the crowd sourced ratings table - mhs_ratings for the demo, we will only use the congestion ratings can be expanded to include: dirty, missed transit due to congestion flag, dangerous, no seat, etc.
create table if not exists mhs_ratings
	(ratings_id serial primary key, rating_congestion int, station_id int, source_id int, rating_time timestamp);
	
-- Create the mhs_station_score table - this will be the query table for the application to report status to the commuter and will be used to evalutate station 'condition' - would would updated a backgroung process with an initial polling interval of 60 seconds - will  be used for the 'realtime' lookups from the application so that every query from a device doesn't require heavy sql analysis of the mhs_ratings table.  It will also be expanded to hold the rated details around the future data elements around cleanliness.
create table if not exists mhs_station_score
	(score_id serial primary key, station_id int, station_heat_score int, station_score_time timestamp);

	
