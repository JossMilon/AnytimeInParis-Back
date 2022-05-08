# AnytimeInParis-Back

## Intro

The project AnytimeInParis consists in browsing various locations in Paris depending on the day and the time of the day. This is the backoffice version for Anytime In Paris. 

## Technos

Express for the server side, MongoDB for database, Heroku for hosting. 

## Models

Location is a model containing all relevant data to identify a specific location. 

## Route

### /add-location

A post route to create new location. 
If the location is missing a name or position, it will return an error. 
If a location with same name already exists, it will return an error. 

### /get-location

A get route to query all the existing locations. 
