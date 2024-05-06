#!/bin/bash

# this must be the same password as the one used in your .env file
DATABASE_PASSWORD=123456

docker network create galactic-app;
docker container run -d -p 3306:3306 --name mysql --network galactic-app --env MYSQL_ROOT_PASSWORD=$DATABASE_PASSWORD mysql;

read -p "Please execute the initialisation SQL on the MySQL container at localhost:3306 then press [Enter] to continue...";

docker run -d -p 3000:3000 --network galactic-app --name galactic-war-status --env-file ./.env sorann/galactic-war-status
docker logs -f galactic-war-status;
