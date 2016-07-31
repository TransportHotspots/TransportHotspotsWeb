# TransportHotspots Webapp Repository
Part of 2016 GovHack projects
https://www.govhack.org/

For more information about our project, please visit our project page:
https://transporthotspots.github.io/

Folders:
- src:
Everything under this folder is our project prototype, a web application built with Angular on the front-end, utilize for viewing on mobile devices.

- resources:
Include our database scripts and cron job. The cron job is used to pull Transport NSW API data using CURL, then uses the Postgres COPY command to load the data into our postgres database.
The databae create script is a schema to hold the user rating data collected from our web application.
