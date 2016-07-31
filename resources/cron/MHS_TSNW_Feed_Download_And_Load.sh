#!/bin/bash
# MHS - Transport feed download - use PID locking to prevent multiple instances from triggering
# Create Crontab as the application user - for the sake of the demo, run as Postgres

#Set lock file and error file locations

LOCKFILE=/tmp/mhs-feed-download-is-running.pid
ERRLOG=/tmp/msh-feed-download.errors

#Use lock file to confirm script has finished previous run - else quit

if [ ! -e $LOCKFILE ]
then
        echo $$ >"$LOCKFILE"
else
    PID=$(cat "$LOCKFILE")
    if kill -0 "$PID" >&/dev/null
    then
        logger -st mhs-feed "Warning: Process exit as previous rsync process is still running"
        exit 0
    else
        echo $$ >"$LOCKFILE"
        logger -st mhs-feed "Warning: previous archive appears to have not finished correctly"
		exit 0
    fi
fi


curl -LkSs -o test.zip -H "Authorization: Bearer REMOVED" https://api.transport.nsw.gov.au/v1/publictransport/facilitiesandoperators
#Get the Facilities Data
curl -X GET https://api.transport.nsw.gov.au/v1/publictransport/facilitiesandoperators -H "Authorization: Bearer REMOVED" > ../in/Location_Facilities_data.zip 
#Get the Trips and Routes Data
curl -X GET https://api.transport.nsw.gov.au/v1/publictransport/timetables/complete/gtfs -H "Authorization: Bearer REMOVED" > ../in/full_greater_sydney_gtfs_static.zip
#Decompress
unzip ../in/*.zip

#Call the load and transform scripts to load the data into hotspotDB

# database connection

export PGHOST=${PGHOST-localhost}
export PGPORT=${PGPORT-5432}
export PGDATABASE=${PGDATABASE-hotspotdb}

# Location of psql
PSQL=/usr/bin/psql

# Connect to the database and call sql file to create the table
psql -X -f ./TRR_MobileHS_Script_to_load_realtime_exports.sql --set ON_ERROR_STOP=on --echo-all

rm -f "$LOCKFILE" "$ERRLOG"