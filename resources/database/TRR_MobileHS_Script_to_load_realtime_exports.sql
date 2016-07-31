--SQL code for parsing Trips data


--<trip_name>.<timetable_id>.<timetable_version_id>.<dop_ref>.<set_type>.<number_of_cars>.<trip_instance>

COPY tnsw_Load_LocFacData from '/opt/TRR/mobilehotspot/files/in/LocationFacilitiesData.csv' WITH CSV HEADER;
COPY tnsw_calendar from '/opt/TRR/mobilehotspot/files/in/calendar.txt' WITH CSV HEADER;
COPY tnsw_calendar_dates from '/opt/TRR/mobilehotspot/files/in/calendar_dates.txt' WITH CSV HEADER;
COPY tnsw_stops  from '/opt/TRR/mobilehotspot/files/in/stops.txt' WITH CSV HEADER;
COPY tnsw_stop_times from '/opt/TRR/mobilehotspot/files/in/stop_times.txt'WITH CSV HEADER;
COPY tnsw_trips from '/opt/TRR/mobilehotspot/files/in/trips.txt' WITH CSV HEADER;


----transform to sample data for demo; stripping out non-train stops and facility information - will need to be expanded on as realtime trip calculations are created--

insert into tnsw_facilitiesdata (LOCATION_NAME, TSN, X_COORD, Y_COORD,	EFA_ID,	PHONE, ADDRESS, TRANSPORT)
	select LOCATION_NAME, TSN, X_COORD, Y_COORD,	EFA_ID,	PHONE, ADDRESS, '1001'
	from tnsw_load_locfacdata
	where TRANSPORT like '%1001%';